import {useNavigation} from '@react-navigation/native';
import {ModalForm} from 'components/organisms/ModalForm';
import {submitNewPlaceFormRequest} from 'core/actions';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
} from 'core/hooks';
import {NewPlaceForm} from 'core/types/addNewPlace';
import React, {useCallback, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/atoms';

export const AddNewPlaceScreen = () => {
  const navigation = useNavigation();

  const {t} = useTranslation('addNewPlaceForm');

  const dispatch = useDispatch();

  const {loading: submitting} = useRequestLoading(submitNewPlaceFormRequest);

  const snackBarProps = useSnackbar();

  useOnRequestSuccess(submitNewPlaceFormRequest, navigation.goBack);

  useOnRequestError(submitNewPlaceFormRequest, '', errorLabel => {
    snackBarProps.show({
      type: 'error',
      title: errorLabel.text,
    });
  });

  const defaultValues = useRef(NewPlaceForm.empty()).current;

  const handleSubmit = useCallback(
    (values: NewPlaceForm.Schema) => {
      console.log('handleSubmit', values);
      dispatch(submitNewPlaceFormRequest(values));
    },
    [dispatch],
  );

  return (
    <ModalForm
      testID="addNewPlaceForm"
      schema={NewPlaceForm.Schema}
      defaultValues={defaultValues}
      t={t}
      onBackPress={navigation.goBack}
      fieldConfigs={NewPlaceForm.fieldConfigs}
      submitting={submitting}
      onSubmit={handleSubmit}
      snackBarProps={snackBarProps}
    />
  );
};
