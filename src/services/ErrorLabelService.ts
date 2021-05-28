import {Middleware} from 'redux';
import {ILabelError} from 'core/types';

type ErrorOptions = {
  status?: number;
  message: string;
};
export const getErrorLabel = (error: ErrorOptions): ILabelError => {
  const {status, message} = error;
  const defaultErrorLabelPath = 'common:errors.default';

  const titlePaths = [`${defaultErrorLabelPath}.title`];
  const textPaths = [`${defaultErrorLabelPath}.text`];

  const errorLabelPath = `errors.${status}`;
  const commonErrorLabelPath = `common:errors.${status}`;

  if (status) {
    titlePaths.unshift(
      `${errorLabelPath}.title`,
      `${commonErrorLabelPath}.title`,
    );
    textPaths.unshift(`${errorLabelPath}.text`, `${commonErrorLabelPath}.text`);
  }

  return {
    message: {
      titlePaths,
      textPaths,
    },
    status,
    originalMessage: message,
  };
};

export const errorLabelMiddliware: Middleware = () => next => action => {
  if (action.payload instanceof Error) {
    action.payload = getErrorLabel(action.payload);
  }
  next(action);
};
