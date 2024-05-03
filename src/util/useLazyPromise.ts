import { useRef } from 'react';

import { useStableCallback } from './useStableCallback';

export function useLazyPromise<T>() {
  const resolve = useRef<((value: T) => void) | undefined>();
  const reject = useRef<Function | undefined>();
  const resetPromise = useStableCallback(() => {
    if (resolve.current) {
      resolve.current(undefined as T);
    }

    resolve.current = undefined;
    reject.current = undefined;

    return new Promise<T>((r1, r2) => {
      resolve.current = r1;
      reject.current = r2;
    });
  });

  return { resolve, reject, resetPromise };
}
