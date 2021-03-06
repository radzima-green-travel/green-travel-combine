import {useEffect, useRef} from 'react';

function useFirstMountState(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstCall = useFirstMountState();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isFirstCall) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateEffect;
