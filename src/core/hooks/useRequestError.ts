import {EmptyActionCreator, PayloadAction} from 'typesafe-actions';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useCallback, useMemo} from 'react';

import {ILabelError} from '../types';
import {IState} from '../store';
import {clearErrorByActionType} from '../reducers';

type ActionCreator = (payload: any) => PayloadAction<string, any>;

export function useRequestError(
  action: EmptyActionCreator<string> | ActionCreator,
): {error: ILabelError | null; clearError: () => void} {
  const key = String(action).replace('_REQUEST', '');
  const dispatch = useDispatch();

  const clearError = useCallback(() => {
    dispatch(clearErrorByActionType(key));
  }, [dispatch, key]);

  useEffect(() => {
    return clearError;
  }, [clearError]);

  const error = useSelector((state: IState) => state.error[key] || null);

  return useMemo(
    () => ({
      error,
      clearError,
    }),
    [clearError, error],
  );
}
