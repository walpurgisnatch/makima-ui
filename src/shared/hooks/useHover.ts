import { useState, useRef, MutableRefObject, useCallback } from 'react';
import useEventListener from './useEventListener';

export function useHover<T>(): [MutableRefObject<T>, boolean] {
  const [value, setValue] = useState(false);
  const ref = useRef<any>(null);
  // Store timer id between hook calls
  const timerRef = useRef<any>(null);

  const handleMouseOver = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setValue(true);
    }, 0);
  }, []);
  const handleMouseOut = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setValue(false);
    }, 0);
  }, []);

  useEventListener('mouseover', () => handleMouseOver(), ref.current);
  useEventListener('mouseout', () => handleMouseOut(), ref.current);
  return [ref, value];
}

export default useHover;
