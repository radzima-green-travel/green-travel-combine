import { useNavigation } from '@react-navigation/native';
import { ModalForm } from 'components/organisms/ModalForm';
import { submitNewPlaceFormRequest } from 'core/actions';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
} from 'core/hooks';
import { NewPlaceForm } from 'core/types/addNewPlace';
import React, { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'components/atoms';
import { useAddNewPlaceAnalytics } from './hooks';
import { Header } from '../../components/containers';
import { isIOS } from '../../services/PlatformService';

export const AddNewPlaceScreen = () => {
  const navigation = useNavigation();
  const {
    sendAddNewPlaceViewEvent,
    sendAddAnyFieldViewEvent,
    sendAddAnyFieldInputSubmitEvent,
    sendAddNewPlaceSendAllEvent,
  } = useAddNewPlaceAnalytics();

  const { t } = useTranslation('addNewPlaceForm');

  const dispatch = useDispatch();

  const { loading: submitting } = useRequestLoading(submitNewPlaceFormRequest);

  const snackBarProps = useSnackbar();

  useEffect(() => {
    sendAddNewPlaceViewEvent();
  }, [sendAddNewPlaceViewEvent]);

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
      dispatch(submitNewPlaceFormRequest(values));
      sendAddNewPlaceSendAllEvent(values);
    },
    [dispatch, sendAddNewPlaceSendAllEvent],
  );

  return (
    <>
      <Header style={{ gap: 8 }} statusbarStyle={isIOS ? 'light' : 'auto'}>
        <Header.TopBlock>
          <Header.BackButton onPress={navigation.goBack} />
        </Header.TopBlock>
        <Header.ContentBlock>
          <Header.Title>{t('title')}</Header.Title>
        </Header.ContentBlock>
      </Header>
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
        onSelectedField={sendAddAnyFieldViewEvent}
        onSelectedFieldChange={sendAddAnyFieldInputSubmitEvent}
      />
    </>
  );
};
