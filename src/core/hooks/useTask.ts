import {useCallback, useMemo} from 'react';

class RemotePromise {
  resolveCallbacks: Array<(value?: unknown) => void> = [];

  pending() {
    return new Promise((res) => {
      this.resolveCallbacks.push(res);
    });
  }

  resolve() {
    this.resolveCallbacks = this.resolveCallbacks.filter((res) => {
      res();
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

  const end = useCallback(() => {
    task.resolve();
  }, [task]);

  return [start, end];
}
