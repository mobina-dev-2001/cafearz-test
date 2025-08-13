import { useRef, useEffect } from 'react';

export const useAutoScroll = (deps: any[]) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, deps);
  return ref;
};
