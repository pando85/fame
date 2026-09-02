import React, { useEffect, useState, useCallback, useRef } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import styles from './styles.module.css';

const REMOTE_APP_ORIGIN = 'https://fame.grigri.cloud';
const CAPACITOR_FALLBACK_ORIGIN = 'https://localhost';
const LAZY_UPDATE_DELAY_MS = 1500;
const REMOTE_PROBE_TIMEOUT_MS = 5000;
const WORKER_INSTALLATION_TIMEOUT_MS = 15000;
const WORKER_ACTIVATION_TIMEOUT_MS = 3000;
const SERVICE_WORKER_URL = `/sw.js?params=${encodeURIComponent(
  JSON.stringify({ offlineMode: true, debug: false }),
)}`;

const isBundledFallback = () =>
  window.location.origin === CAPACITOR_FALLBACK_ORIGIN &&
  window.location.pathname === '/index.html';

const probeRemoteOrigin = (): Promise<void> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    let settled = false;

    const cleanup = () => {
      image.onload = null;
      image.onerror = null;
      window.clearTimeout(timeout);
    };
    const succeed = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    };
    const fail = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('Production origin is unavailable'));
    };

    const timeout = window.setTimeout(fail, REMOTE_PROBE_TIMEOUT_MS);
    image.onload = succeed;
    image.onerror = fail;
    image.src = `${REMOTE_APP_ORIGIN}/img/logo.png?probe=${Date.now()}`;
  });

const ensureProductionServiceWorker = async (): Promise<{
  registration: ServiceWorkerRegistration;
  newlyRegistered: boolean;
}> => {
  const existing = await navigator.serviceWorker.getRegistration();
  if (existing) {
    return { registration: existing, newlyRegistered: false };
  }

  const registration = await navigator.serviceWorker.register(SERVICE_WORKER_URL);
  return { registration, newlyRegistered: true };
};

const waitForWorkerInstallation = (worker: ServiceWorker): Promise<void> => {
  if (worker.state === 'installed' || worker.state === 'activated' || worker.state === 'redundant') {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      window.clearTimeout(timeout);
      worker.removeEventListener('statechange', handleStateChange);
    };
    const handleStateChange = () => {
      if (
        worker.state === 'installed' ||
        worker.state === 'activated' ||
        worker.state === 'redundant'
      ) {
        cleanup();
        resolve();
      }
    };
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error('Timed out waiting for service worker installation'));
    }, WORKER_INSTALLATION_TIMEOUT_MS);

    worker.addEventListener('statechange', handleStateChange);
  });
};

export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
  const isBrowser = useIsBrowser();
  const [offline, setOffline] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const pullDistanceRef = useRef(0);

  const handleRefresh = useCallback(async () => {
    // The bundled Capacitor fallback cannot register a worker for the production
    // origin. Reload the local snapshot there and only manage workers on the
    // canonical origin.
    if (
      !('serviceWorker' in navigator) ||
      window.location.origin !== REMOTE_APP_ORIGIN
    ) {
      window.location.reload();
      return;
    }

    try {
      const { registration, newlyRegistered } = await ensureProductionServiceWorker();

      // Pull-to-refresh is the explicit "apply now" path. A fresh registration
      // already performs its initial install, while an existing one must check
      // production for a newer worker.
      if (navigator.onLine && !newlyRegistered) {
        try {
          await registration.update();
        } catch {
          // Network/update failure must not prevent the cached app from reloading.
        }
      }

      let worker = registration.waiting ?? registration.installing;
      if (worker) {
        try {
          await waitForWorkerInstallation(worker);
        } catch {
          return;
        }
        worker = registration.waiting ?? worker;
      }

      // Only a newly installed/waiting worker needs activation. An already
      // activated first worker can be used directly after the reload.
      if (worker?.state === 'installed') {
        const controllerChanged = new Promise<void>((resolve) => {
          navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), {
            once: true,
          });
        });
        const activationTimeout = new Promise<void>((resolve) => {
          window.setTimeout(resolve, WORKER_ACTIVATION_TIMEOUT_MS);
        });

        worker.postMessage({ type: 'SKIP_WAITING' });
        await Promise.race([controllerChanged, activationTimeout]);
      }
    } catch {
      // Keep/reload the previous known-good snapshot on any registration error.
    } finally {
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    const setupNativeUi = async () => {
      if (Capacitor.getPlatform() === 'android') {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setOverlaysWebView({ overlay: false });
      }
    };

    void setupNativeUi();
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    let updateTimer: number | undefined;
    let disposed = false;

    const clearScheduledWork = () => {
      if (updateTimer !== undefined) {
        window.clearTimeout(updateTimer);
        updateTimer = undefined;
      }
    };

    const updateProductionSnapshot = async () => {
      if (disposed || !navigator.onLine) {
        return;
      }

      if (isBundledFallback()) {
        // Capacitor's Android errorPath intentionally has no native bridge, so
        // detect this bootstrap by its local origin instead of getPlatform().
        // Probe a known image with a unique URL: unlike no-cors fetch(), onload
        // proves the server returned an actually usable production asset.
        try {
          await probeRemoteOrigin();
          if (!disposed) {
            window.location.replace(`${REMOTE_APP_ORIGIN}/`);
          }
        } catch {
          // Keep rendering the bundled recipes. Another check is scheduled when
          // connectivity changes or on the next launch.
        }
        return;
      }

      if (
        window.location.origin !== REMOTE_APP_ORIGIN ||
        !('serviceWorker' in navigator)
      ) {
        return;
      }

      try {
        const { registration, newlyRegistered } = await ensureProductionServiceWorker();
        if (!newlyRegistered) {
          await registration.update();
        }

        // Deliberately do not call SKIP_WAITING here. Docusaurus/Workbox installs
        // the complete revisioned precache while the current worker keeps serving
        // the previous coherent snapshot. The waiting snapshot becomes active on
        // the next launch; pull-to-refresh is the opt-in apply-now path.
      } catch {
        // The current precached production snapshot remains authoritative.
      }
    };

    const scheduleLazyUpdate = () => {
      if (updateTimer !== undefined) {
        window.clearTimeout(updateTimer);
      }
      updateTimer = window.setTimeout(() => {
        updateTimer = undefined;
        void updateProductionSnapshot();
      }, LAZY_UPDATE_DELAY_MS);
    };

    const handleOnline = () => {
      setOffline(false);
      scheduleLazyUpdate();
    };
    const handleOffline = () => {
      setOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setOffline(!navigator.onLine);

    // Docusaurus automatic registration is disabled. Rendering happens first;
    // only then do we register/update the production worker and start precaching.
    scheduleLazyUpdate();

    return () => {
      disposed = true;
      clearScheduledWork();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;

    let startY = 0;
    let isPullingActive = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isPullingActive = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPullingActive) return;

      const currentY = e.touches[0].clientY;
      const diff = currentY - startY;

      if (diff > 0 && window.scrollY === 0) {
        const distance = Math.min(diff, 120);
        pullDistanceRef.current = distance;
        setIsPulling(true);
        setPullDistance(distance);
      }
    };

    const handleTouchEnd = () => {
      if (!isPullingActive) return;

      isPullingActive = false;
      setIsPulling(false);

      if (pullDistanceRef.current >= 80) {
        void handleRefresh();
      }

      pullDistanceRef.current = 0;
      setPullDistance(0);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isBrowser, handleRefresh]);

  return (
    <>
      {isPulling && pullDistance > 0 && (
        <div
          className={styles['pull-indicator']}
          style={{
            transform: `translateY(${Math.min(pullDistance - 60, 0)}px)`,
            opacity: Math.min(pullDistance / 80, 1),
          }}
        >
          {pullDistance >= 80 ? 'Soltar para actualizar' : 'Desliza para actualizar'}
        </div>
      )}
      {offline && (
        <div className={styles['offline-banner']}>
          Sin conexión - mostrando contenido en caché
        </div>
      )}
      {children}
    </>
  );
}
