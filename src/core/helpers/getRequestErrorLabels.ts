import {RequestError} from 'core/errors';

export function getRequestErrorLabels(
  error: RequestError,
  translationsNameSpace: string,
) {
  const {error_code, status} = error;
  const defaultErrorLabelPath = 'common:errors.default';

  const titleLabels = [`${defaultErrorLabelPath}.title`];
  const textLabels = [`${defaultErrorLabelPath}.text`];

  if (status) {
    let errorLabelPath = `${translationsNameSpace}:errors.${status}`;
    let commonErrorLabelPath = `common:errors.${status}`;

    titleLabels.unshift(
      `${errorLabelPath}.title`,
      `${commonErrorLabelPath}.title`,
    );
    textLabels.unshift(
      `${errorLabelPath}.text`,
      `${commonErrorLabelPath}.text`,
    );

    if (error_code) {
      let errorCode = error_code;
      errorLabelPath = `${errorLabelPath}.${errorCode}`;
      commonErrorLabelPath = `${commonErrorLabelPath}.${errorCode}`;

      titleLabels.unshift(
        `${errorLabelPath}.title`,
        `${commonErrorLabelPath}.title`,
      );
      textLabels.unshift(
        `${errorLabelPath}.text`,
        `${commonErrorLabelPath}.text`,
      );
    }
  }

  return {
    titleLabels,
    textLabels,
  };
}
