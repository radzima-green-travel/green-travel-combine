import {createAction} from '@reduxjs/toolkit';
import {RequestError} from 'core/errors';

export function createAsyncAction<
  RequestPayload = void,
  SuccessPayload = void,
  FailurePayload = RequestError,
  T extends string = string,
>(type: T) {
  const meta = {
    successAction: createAction<SuccessPayload>(type + '_SUCCESS'),
    failureAction: createAction<FailurePayload>(type + '_FAILURE'),
  };
  const asyncAction = createAction(
    type + '_REQUEST',
    (payload: RequestPayload) => ({
      payload,
      meta,
    }),
  );

  function asyncActionWithStaticMeta(
    ...args: Parameters<typeof asyncAction>
  ): ReturnType<typeof asyncAction> {
    return asyncAction(...args);
  }
  asyncActionWithStaticMeta.toString = asyncAction.toString;
  asyncActionWithStaticMeta.type = asyncAction.type;
  asyncActionWithStaticMeta.meta = meta;

  return asyncActionWithStaticMeta;
}
