import { useEffect, useRef, useState } from 'react';

export const usePolling = (callback: () => void, delayProp = 10000) => {
  const savedCallback = useRef<() => void>();
  const [delay, setDelay] = useState<number | null>(delayProp);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => setDelay(null);
  }, []);

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
