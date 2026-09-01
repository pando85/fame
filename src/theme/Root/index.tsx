import React, { useEffect, useState, useCallback } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import styles from './styles.module.css';

const REMOTE_APP_ORIGIN = 'https://fame.grigri.cloud';

export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
  const isBrowser = useIsBrowser();
  const [offline, setOffline] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    const setupNativeUi = async () => {
      if (Capacitor.getPlatform() === 'android') {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setOverlaysWebView({ overlay: false });
      }
    };

    setupNativeUi();
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const isAndroidFallback = () =>
      Capacitor.getPlatform() === 'android' && window.location.origin !== REMOTE_APP_ORIGIN;

    const switchToRemote = () => {
      if (navigator.onLine && isAndroidFallback()) {
        window.location.replace(`${REMOTE_APP_ORIGIN}/`);
        return true;
      }
      return false;
    };

    const handleOnline = () => {
      setOffline(false);
      switchToRemote();
    };
    const handleOffline = () => setOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setOffline(!navigator.onLine);

    // capacitor.config.json points Android at the canonical web origin. If that
    // initial navigation fails, Capacitor serves the bundled index.html as an
    // error fallback. Return to the canonical origin as soon as the network is
    // available so updates are again managed by the website's service worker.
    if (switchToRemote()) {
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }

    // The bundled fallback is deliberately self-contained. Its service worker
    // can only see Capacitor's local origin and therefore cannot update content
    // from fame.grigri.cloud.
    if (isAndroidFallback() || !('serviceWorker' in navigator)) {
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }

    const handleControllerChange = () => {
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    navigator.serviceWorker.ready.then((reg) => {
      if (!navigator.onLine) return;

      // Check the canonical site's generated service worker immediately. A new
      // Docusaurus build changes its precache manifest, so installing it also
      // downloads the latest recipe pages and versioned assets before activation.
      void reg.update().catch(() => {
        // A transient update failure must never make the already-cached app unusable.
      });

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        }
      });

      if (reg.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
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
        setIsPulling(true);
        setPullDistance(Math.min(diff, 120));
      }
    };

    const handleTouchEnd = () => {
      if (!isPullingActive) return;

      isPullingActive = false;
      setIsPulling(false);

      if (pullDistance >= 80) {
        handleRefresh();
      }

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
  }, [isBrowser, pullDistance, handleRefresh]);

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
