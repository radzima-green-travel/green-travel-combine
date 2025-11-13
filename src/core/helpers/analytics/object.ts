import { AnalyticsAllowedEditFields, ObjectField } from 'core/constants';
import {
  AnalyticsAddInfoFieldsNames,
  IObjectIncompleteField,
} from 'core/types';
import { map } from 'lodash';

export function getObjectDetailsAnalyticsIncompleteFieldsNames(
  incompleteFields: IObjectIncompleteField[],
): AnalyticsAddInfoFieldsNames[] {
  return map(incompleteFields, ({ id }) =>
    getObjectDetailsAnalyticsIncompleteFieldName(id),
  );
}

export function getObjectDetailsAnalyticsIncompleteFieldName(
  incompleteField: ObjectField,
): AnalyticsAddInfoFieldsNames {
  return AnalyticsAllowedEditFields[incompleteField];
}
