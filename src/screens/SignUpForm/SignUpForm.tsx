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
import {noSpaceChars} from 'core/validation';
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
                    iconRightName={rightIcon}
                    iconLeftName={'lock'}
                    size={16}
                    placeholder={t('password')}
                    secureTextEntry={passwordVisibility}
                    onRightIconPress={handlePasswordVisibility}
                    messageText={messageText ? t(messageText) : undefined}
                    helperText={
                      <PasswordHint passwordValue={inputProps.value} />
                    }
                    maxLength={99}
                    allowedChars={noSpaceChars}
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
