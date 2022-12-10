import React from 'react';
import {useTranslation} from 'core/hooks';
import {FormInput, SnackBar, WithFormikInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useCheckEmail} from './hooks';
import {FormikProvider} from 'formik';

export const CheckEmail = () => {
  const {t} = useTranslation('authentification');
  const {loading, formik, snackBarProps, isSubmitButtonDisabled, submitForm} =
    useCheckEmail();
  return (
    <FormikProvider value={formik}>
      <AuthForm
        title={t('enterEmailAddress')}
        text={t('checkAccount')}
        onSubmitPress={submitForm}
        submitButtonText={t('check')}
        isSubmitButtonDisabled={isSubmitButtonDisabled}
        submitButtonLoading={loading}>
        <WithFormikInput<string> name="email">
          {({messageText, ...inputProps}) => (
            <FormInput
              iconLeftName={'email'}
              size={16}
              placeholder={'email'}
              messageText={messageText ? t(messageText) : undefined}
              {...inputProps}
            />
          )}
        </WithFormikInput>
      </AuthForm>
      <SnackBar {...snackBarProps} />
    </FormikProvider>
  );
};
