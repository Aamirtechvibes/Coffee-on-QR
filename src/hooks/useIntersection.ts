import { useEffect, useRef, useState } from 'react';

export function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const shouldReduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (shouldReduceMotion) {
      setIsVisible(true);
      return;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: isMobile ? Math.min(threshold, 0.08) : threshold,
        rootMargin: isMobile ? '0px 0px -10% 0px' : '0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
