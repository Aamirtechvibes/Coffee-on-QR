import { useEffect } from 'react';

let activeLocks = 0;
let originalBodyOverflow = '';

function applyScrollState() {
  const body = document.body;
  const shouldLock = activeLocks > 0;

  body.style.overflow = shouldLock ? 'hidden' : originalBodyOverflow;
}

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (typeof document === 'undefined' || !locked) {
      return;
    }

    if (activeLocks === 0) {
      originalBodyOverflow = document.body.style.overflow || 'auto';
    }

    activeLocks += 1;
    applyScrollState();

    return () => {
      activeLocks = Math.max(0, activeLocks - 1);

      if (activeLocks === 0) {
        document.body.style.overflow = originalBodyOverflow;
      }

      applyScrollState();
    };
  }, [locked]);
}
