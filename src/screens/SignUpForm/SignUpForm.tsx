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

const HandleKeyboardScrollView =
  createHandleKeyboardScrollComponent(ScrollView);

export const SignUpForm = () => {
  const {t} = useTranslation('authentification');
  const {
    loading,
    email,
    submitForm,
    isSubmitButtonDisabled,
    passwordHidden,
    rightIcon,
    handlePasswordHidden,
    formik,
    snackBarProps,
  } = useSignUpForm();

  return (
    <HandleKeyboardScrollView>
      <FormikProvider value={formik}>
        <HandleContainer>
          <AuthForm
            testID="authForm"
            title={t('inputPassword')}
            text={t('createPasswordFor', {email})}
            onSubmitPress={submitForm}
            submitButtonText={t('send')}
            isSubmitButtonDisabled={isSubmitButtonDisabled}
            submitButtonLoading={loading}>
            <WithFormikInput<string> name="password">
              {({messageText, ...inputProps}) => (
                <FormInput
                  testID={'passwordFormInput'}
                  autoFocus
                  iconRight={{
                    name: rightIcon,
                    checked: !passwordHidden,
                  }}
                  label={t('password')}
                  secureTextEntry={passwordHidden}
                  onRightIconPress={handlePasswordHidden}
                  messageText={messageText ? t(messageText) : undefined}
                  helperText={
                    <PasswordHint
                      testID="passwordFormInputHint"
                      passwordValue={inputProps.value}
                    />
                  }
                  maxLength={99}
                  {...inputProps}
                  error={false}
                />
              )}
            </WithFormikInput>
          </AuthForm>
        </HandleContainer>
        <SnackBar testID="snackBar" isOnTop {...snackBarProps} />
      </FormikProvider>
    </HandleKeyboardScrollView>
  );
};
