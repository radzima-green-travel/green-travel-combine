import { createAction } from '@reduxjs/toolkit';
import { RequestError } from 'core/errors';

interface Meta {
  reducerId?: string;
  entityId?: string;
}

export function createAsyncAction<
  RequestPayload = void,
  SuccessPayload = void,
  FailurePayload = RequestError,
  T extends string = string,
>(type: T) {
  const metaData = {
    successAction: createAction(
      type + '_SUCCESS',
      (payload: SuccessPayload, meta?: Pick<Meta, 'entityId'>) => ({
        payload,
        meta,
      }),
    ),
    failureAction: createAction(
      type + '_FAILURE',
      (payload: FailurePayload, meta?: Pick<Meta, 'entityId'>) => ({
        payload,
        meta,
      }),
    ),
  };

  const asyncAction = createAction(
    type + '_REQUEST',
    (payload: RequestPayload, meta?: Meta) => ({
      payload,
      meta: { ...metaData, ...meta },
    }),
  );

  function asyncActionWithStaticMeta(
    ...args: Parameters<typeof asyncAction>
  ): ReturnType<typeof asyncAction> {
    return asyncAction(...args);
  }
  asyncActionWithStaticMeta.toString = asyncAction.toString;
  asyncActionWithStaticMeta.type = asyncAction.type;
  asyncActionWithStaticMeta.meta = metaData;

  return asyncActionWithStaticMeta;
}
