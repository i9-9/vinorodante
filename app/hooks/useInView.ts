'use client';
import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement = HTMLDivElement>(options = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Una vez que el elemento es visible, dejamos de observarlo
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, { 
      threshold: 0.1,
      rootMargin: '50px',
      ...options 
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isInView };
} 