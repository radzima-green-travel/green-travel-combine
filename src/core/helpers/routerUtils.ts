import {base64} from 'core/helpers/encodingUtils';
import {isArray, isObject, join, mapValues} from 'lodash';

export const serializeRouteParams = <T extends Record<string, any>>(
  paramsObject: T,
): Record<keyof T, string> =>
  mapValues(paramsObject, value => {
    switch (true) {
      case isArray(value):
        return join(value, ',');
      case isObject(value):
        return base64().from(value);
      default:
        return String(value);
    }
  });
