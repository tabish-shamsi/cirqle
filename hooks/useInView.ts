"use client";

import { useEffect, useRef, useState, RefObject } from "react";

function useInView<T extends Element>(
  target: RefObject<T>,
  options?: IntersectionObserverInit,
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = target.current;
    if (!element) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [target, options?.root, options?.rootMargin, options?.threshold]);

  return isIntersecting;
}

export default useInView;
