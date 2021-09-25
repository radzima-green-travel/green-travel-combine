import {useCallback, useRef, useEffect} from 'react';

export function useStaticCallback(callback, deps?) {
  const simpleCallback = useCallback(callback, deps);
  const staticCallback = useRef(simpleCallback);

  useEffect(() => {
    staticCallback.current = simpleCallback;
  }, [simpleCallback]);

  const memoizedCallback = useCallback((...args) => {
    return staticCallback.current(...args);
  }, []);

  return memoizedCallback;
}
