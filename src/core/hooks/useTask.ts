import { useCallback, useMemo } from 'react';

class RemotePromise {
  resolveCallbacks: ((value?: unknown) => void)[] = [];

  pending() {
    return new Promise(res => {
      this.resolveCallbacks.push(res);
    });
  }

  resolve(...args) {
    this.resolveCallbacks = this.resolveCallbacks.filter(res => {
      res(...args);
      return true;
    });
  }
}

export function useTask() {
  const task = useMemo(() => {
    return new RemotePromise();
  }, []);

  const start = useCallback(() => {
    return task.pending();
  }, [task]);

  const end = useCallback(
    (...args) => {
      task.resolve(...args);
    },
    [task],
  );

  return [start, end];
}
