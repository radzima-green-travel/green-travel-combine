import React from 'react';
import {useTranslation} from 'core/hooks';
import {FormInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useNewPassword} from './hooks';

export const NewPassword = () => {
  const {t} = useTranslation('authentification');
  const {
    onConfirmNewPassword,
    newPassword,
    loading,
    setNewPassword,
    buttonText,
    rightIcon,
    passwordVisibility,
    handlePasswordVisibility,
  } = useNewPassword();

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
