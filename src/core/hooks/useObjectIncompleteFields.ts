import {OBJECT_ALLOWED_EDIT_FIELDS, ObjectField} from 'core/constants';
import {IObjectIncompleteField} from 'core/types';
import reduce from 'lodash/reduce';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

export const useObjectIncompleteFields = (
  categoryIncompleteFields: ObjectField[],
) => {
  const {t} = useTranslation('common');

  return useMemo(
    () =>
      reduce(
        categoryIncompleteFields,
        (fields, fieldName) => [
          ...fields,
          ...(OBJECT_ALLOWED_EDIT_FIELDS.includes(
            fieldName as (typeof OBJECT_ALLOWED_EDIT_FIELDS)[number],
          )
            ? [{id: fieldName, label: t(`objectFieldsLabels.${fieldName}`)}]
            : []),
        ],
        [] as Array<IObjectIncompleteField>,
      ),
    [categoryIncompleteFields, t],
  );
};
