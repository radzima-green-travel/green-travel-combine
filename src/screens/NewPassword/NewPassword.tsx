import React from 'react';
import {confirmNewPasswordRequest} from 'core/reducers';
import {
  useOnRequestSuccess,
  useTogglePasswordVisibility,
  useTranslation,
} from 'core/hooks';
import {FormInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useNewPassword} from './hooks';

export const NewPassword = () => {
  const {t} = useTranslation('authentification');
  const {
    navigation,
    onConfirmNewPassword,
    newPassword,
    loading,
    setNewPassword,
  } = useNewPassword();

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');
  const buttonText = t('save').toUpperCase();

  useOnRequestSuccess(confirmNewPasswordRequest, () => {
    navigation.getParent()?.goBack();
  });

  return (
    <AuthForm
      title={t('newPassword')}
      text={t('passwordWarning')}
      onSubmitPress={onConfirmNewPassword}
      submitButtonText={buttonText}
      isSubmitButtonDisabled={!newPassword}
      submitButtonLoading={loading}>
      <FormInput
        iconRightName={rightIcon}
        iconLeftName={'lock'}
        size={16}
        placeholder={'password'}
        secureTextEntry={passwordVisibility}
        onRightIconPress={handlePasswordVisibility}
        value={newPassword}
        setValue={setNewPassword}
      />
    </AuthForm>
  );
};
