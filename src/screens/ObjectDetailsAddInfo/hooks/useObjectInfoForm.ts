import {ObjectField, TIME_PICKER_FIELDS} from 'core/constants';
import {useTranslation} from 'core/hooks';
import {IObjectIncompleteField} from 'core/types';
import {merge, reduce, some} from 'lodash';
import {useCallback, useReducer} from 'react';

type FormValue = string | number;

type Form = {
  [key in ObjectField]: FormValue;
};

interface IAction {
  type: typeof CHANGE_FIELD;
  payload: {[key in ObjectField]?: FormValue};
}

const CHANGE_FIELD = 'CHANGE_FIELD';

const initialValues = {
  [ObjectField.attendanceTime]: 0,
};

const formReducer = (state: Form, action: IAction) => {
  switch (action.type) {
    case CHANGE_FIELD:
      return merge({}, state, action.payload);
    default:
      return state;
  }
};

export const useObjectInfoForm = (
  incompleteFields: IObjectIncompleteField[],
) => {
  const [form, dispatch] = useReducer(
    formReducer,
    reduce(
      incompleteFields,
      (f, field) => ({...f, [field.id]: initialValues[field.id] ?? ''}),
      {} as Form,
    ),
  );
  const {t} = useTranslation('common');
  const isFormValid = some(form, Boolean);

  const onChangeField = useCallback((field: ObjectField, value: FormValue) => {
    dispatch({type: CHANGE_FIELD, payload: {[field]: value}});
  }, []);

  const getDisplayValue = useCallback(
    (id: ObjectField) => {
      let value = form[id];

      if (value) {
        if (typeof value === 'string') {
          return value.trim().replace(/[\n\t\s]+/gm, ' ');
        } else if (TIME_PICKER_FIELDS.has(id)) {
          const hours = Math.floor(value);
          const minutes = Math.ceil((value - hours) * 60);
          return `${hours} ${t('hours')} ${minutes} ${t('minutes')}`;
        }
      }

      return value;
    },
    [form, t],
  );

  return {form, onChangeField, isFormValid, getDisplayValue};
};
