import React, { useEffect, useState, useCallback, useRef } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import styles from './styles.module.css';

const REMOTE_APP_ORIGIN = 'https://fame.grigri.cloud';
const LAZY_UPDATE_DELAY_MS = 1500;
const REMOTE_PROBE_TIMEOUT_MS = 5000;
const WORKER_ACTIVATION_TIMEOUT_MS = 3000;

const isAndroidFallback = () =>
  Capacitor.getPlatform() === 'android' && window.location.origin !== REMOTE_APP_ORIGIN;

const waitForWorkerInstallation = (worker: ServiceWorker): Promise<void> => {
  if (worker.state === 'installed' || worker.state === 'activated' || worker.state === 'redundant') {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const handleStateChange = () => {
      if (
        worker.state === 'installed' ||
        worker.state === 'activated' ||
        worker.state === 'redundant'
      ) {
        worker.removeEventListener('statechange', handleStateChange);
        resolve();
      }
    };

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
    // The bundled Capacitor fallback has no access to the production origin's
    // service-worker registration. Reloading it is still useful while offline.
    if (
      !('serviceWorker' in navigator) ||
      window.location.origin !== REMOTE_APP_ORIGIN
    ) {
      window.location.reload();
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      // Pull-to-refresh is the explicit "apply now" path. Check production for
      // a newer service worker, but keep the existing cached snapshot if that
      // check fails.
      if (navigator.onLine) {
        try {
          await registration.update();
        } catch {
          // Network/update failure must not prevent the cached app from reloading.
        }
      }

      let worker = registration.waiting ?? registration.installing;
      if (worker) {
        await waitForWorkerInstallation(worker);
        worker = registration.waiting ?? worker;
      }

      if (worker && worker.state !== 'redundant') {
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
    let remoteProbe: AbortController | undefined;
    let disposed = false;

    const clearScheduledWork = () => {
      if (updateTimer !== undefined) {
        window.clearTimeout(updateTimer);
        updateTimer = undefined;
      }
      remoteProbe?.abort();
      remoteProbe = undefined;
    };

    const updateProductionSnapshot = async () => {
      if (disposed || !navigator.onLine) {
        return;
      }

      if (isAndroidFallback()) {
        // errorPath is a bundled, always-available bootstrap. Do not trust
        // navigator.onLine alone: Android can report "online" while DNS, the
        // route, or the server is unavailable, which would otherwise create a
        // redirect/fallback loop. Probe the canonical origin first and only
        // leave the visible local recipes after an actual request succeeds.
        remoteProbe = new AbortController();
        const timeout = window.setTimeout(
          () => remoteProbe?.abort(),
          REMOTE_PROBE_TIMEOUT_MS,
        );

        try {
          await fetch(`${REMOTE_APP_ORIGIN}/`, {
            cache: 'no-store',
            mode: 'no-cors',
            signal: remoteProbe.signal,
          });
          if (!disposed) {
            window.location.replace(`${REMOTE_APP_ORIGIN}/`);
          }
        } catch {
          // Keep rendering the local fallback. Another check is scheduled when
          // Android reports that connectivity has returned.
        } finally {
          window.clearTimeout(timeout);
          remoteProbe = undefined;
        }
        return;
      }

      if (!('serviceWorker' in navigator)) {
        return;
      }

      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.update();

        // Deliberately do not call SKIP_WAITING here. Docusaurus/Workbox has
        // already downloaded the complete new precache atomically while the
        // currently rendered recipes remain untouched. The new snapshot becomes
        // active naturally after this app client ends, so the next launch starts
        // immediately on the new local version. Pull-to-refresh is the opt-in
        // path for activating it during the current session.
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
      remoteProbe?.abort();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setOffline(!navigator.onLine);

    // Rendering has already happened by the time this effect runs. Delay all
    // update I/O a little further so startup is local-first: recipes first,
    // production synchronization second.
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
