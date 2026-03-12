import React, { useEffect, useState, useCallback } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import styles from './styles.module.css';

export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
  const isBrowser = useIsBrowser();
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offline, setOffline] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  const updateServiceWorker = useCallback(() => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }, [registration]);

  const handleRefresh = useCallback(async () => {
    updateServiceWorker();
    window.location.reload();
  }, [updateServiceWorker]);

  useEffect(() => {
    if (!isBrowser || !('serviceWorker' in navigator)) {
      return;
    }

    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setOffline(!navigator.onLine);

    navigator.serviceWorker.ready.then((reg) => {
      setRegistration(reg);
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser || !('serviceWorker' in navigator)) {
      return;
    }

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return;

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setNeedRefresh(true);
            }
          });
        }
      });
    });
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

  const handleReload = useCallback(() => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  }, [registration]);

  const handleDismiss = useCallback(() => {
    setNeedRefresh(false);
  }, []);

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
          {pullDistance >= 80 ? 'Release to refresh' : 'Pull to refresh'}
        </div>
      )}
      {offline && (
        <div className={styles['offline-banner']}>
          You are offline - showing cached content
        </div>
      )}
      {needRefresh && (
        <div className={styles['reload-prompt']}>
          <span>New content available!</span>
          <button onClick={handleReload}>Reload</button>
          <button onClick={handleDismiss}>Later</button>
        </div>
      )}
      {children}
    </>
  );
}