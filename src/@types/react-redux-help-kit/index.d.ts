import {ILabelError} from 'core/types';
import 'react-redux-help-kit';
import {Action} from 'react-redux-help-kit';

declare module 'react-redux-help-kit' {
  export function useRequestError<T extends ILabelError>(
    action: Action,
  ): {
    error: T | null;
    clearError: () => void;
  };
}
