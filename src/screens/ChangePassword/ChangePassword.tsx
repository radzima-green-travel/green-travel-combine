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
import {useChangePassword} from './hooks';
import {FormikProvider} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from './styles';
import {View} from 'react-native';
import {screenOptions} from './screenOptions';

const HandleKeyboardScrollView =
  createHandleKeyboardScrollComponent(ScrollView);

export const ChangePassword = () => {
  const {t} = useTranslation('authentification');
  const {
    loading,
    submitForm,
    isSubmitButtonDisabled,
    oldPasswordHidden,
    newPasswordHidden,
    formik,
    snackBarProps,
  } = useChangePassword();

  return (
    <HandleKeyboardScrollView>
      <FormikProvider value={formik}>
        <HandleContainer>
          <AuthForm
            title={t('title')}
            onSubmitPress={submitForm}
            submitButtonText={t('updatePassword')}
            isSubmitButtonDisabled={isSubmitButtonDisabled}
            testID="authForm"
            submitButtonLoading={loading}>
            <WithFormikInput<string> name="oldPassword">
              {({messageText, ...inputProps}) => (
                <FormInput
                  testID={'oldPasswordInput'}
                  autoFocus
                  iconRight={{
                    name: oldPasswordHidden.rightIcon,
                    checked: !oldPasswordHidden.passwordHidden,
                  }}
                  label={t('oldPasswordPlaceholder')}
                  secureTextEntry={oldPasswordHidden.passwordHidden}
                  onRightIconPress={oldPasswordHidden.handlePasswordHidden}
                  messageText={messageText ? t(messageText) : undefined}
                  maxLength={99}
                  focusNextFieldOnSubmit
                  returnKeyType="next"
                  {...inputProps}
                />
              )}
            </WithFormikInput>
            <View style={styles.newPasswordContainer}>
              <WithFormikInput<string> name="newPassword">
                {({messageText, ...inputProps}) => (
                  <FormInput
                    testID={'newPasswordInput'}
                    iconRight={{
                      name: newPasswordHidden.rightIcon,
                      checked: !newPasswordHidden.passwordHidden,
                    }}
                    label={t('newPasswordPlaceholder')}
                    secureTextEntry={newPasswordHidden.passwordHidden}
                    onRightIconPress={newPasswordHidden.handlePasswordHidden}
                    messageText={messageText ? t(messageText) : undefined}
                    helperText={
                      <PasswordHint
                        testID="nesPasswordInputHint"
                        passwordValue={inputProps.value}
                      />
                    }
                    returnKeyType="done"
                    maxLength={99}
                    {...inputProps}
                    error={false}
                  />
                )}
              </WithFormikInput>
            </View>
          </AuthForm>
        </HandleContainer>
        <SnackBar testID="snackBar" isOnTop {...snackBarProps} />
      </FormikProvider>
    </HandleKeyboardScrollView>
  );
};

ChangePassword.screenOptions = screenOptions;
