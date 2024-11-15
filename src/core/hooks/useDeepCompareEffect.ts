import {useEffect, useRef, useLayoutEffect} from 'react';
import {isEqual} from 'lodash';

/**
 * A custom hook that deep-compares dependencies and triggers useEffect
 * when the dependencies change.
 * @param {Function} effect - The effect callback.
 * @param {Array} dependencies - The dependency array for deep comparison.
 */
export function useDeepCompareEffect(effect: () => void, dependencies: any[]) {
  const dependenciesRef = useRef<any[]>(dependencies);

  // Compare the new dependencies with the previous ones
  if (!isEqual(dependencies, dependenciesRef.current)) {
    dependenciesRef.current = dependencies;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, dependenciesRef.current);
}

/**
 * A custom hook that deep-compares dependencies and triggers useLayoutEffect
 * when the dependencies change.
 * @param {Function} effect - The effect callback.
 * @param {Array} dependencies - The dependency array for deep comparison.
 */
export function useDeepCompareLayoutEffect(
  effect: () => void,
  dependencies: any[],
) {
  const dependenciesRef = useRef<any[]>(dependencies);

  // Compare the new dependencies with the previous ones
  if (!isEqual(dependencies, dependenciesRef.current)) {
    dependenciesRef.current = dependencies;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(effect, [dependenciesRef.current]);
}
