import React from 'react';
import {useTranslation} from 'core/hooks';
import {
  FormInput,
  SnackBar,
  WithFormikInput,
  PasswordHint,
  createHandleKeyboardScrollComponent,
  HandleContainer,
} from 'atoms';
import {AuthForm} from 'organisms';
import {useSignUpForm} from './hooks';
import {FormikProvider} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import {TestIDs} from 'core/types';

const HandleKeyboardScrollView =
  createHandleKeyboardScrollComponent(ScrollView);

export const SignUpForm = () => {
  const {t} = useTranslation('authentification');
  const {
    loading,
    email,
    submitForm,
    isSubmitButtonDisabled,
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
    formik,
    snackBarProps,
  } = useSignUpForm();

  return (
    <HandleKeyboardScrollView>
      <FormikProvider value={formik}>
        <HandleContainer>
          <AuthForm
            title={t('inputPassword')}
            text={t('createPasswordFor', {email})}
            onSubmitPress={submitForm}
            submitButtonText={t('send')}
            isSubmitButtonDisabled={isSubmitButtonDisabled}
            submitButtonLoading={loading}>
            <WithFormikInput<string> name="password">
              {({messageText, ...inputProps}) => (
                <>
                  <FormInput
                    testID={TestIDs.PasswordInput}
                    autoFocus
                    iconRight={{
                      name: rightIcon,
                    }}
                    label={t('password')}
                    secureTextEntry={passwordVisibility}
                    onRightIconPress={handlePasswordVisibility}
                    messageText={messageText ? t(messageText) : undefined}
                    helperText={
                      <PasswordHint passwordValue={inputProps.value} />
                    }
                    maxLength={99}
                    {...inputProps}
                    error={false}
                  />
                </>
              )}
            </WithFormikInput>
          </AuthForm>
        </HandleContainer>
        <SnackBar isOnTop {...snackBarProps} />
      </FormikProvider>
    </HandleKeyboardScrollView>
  );
};
