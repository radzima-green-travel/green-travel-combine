import React from 'react';
import {confirmNewPasswordRequest} from 'core/reducers';
import {useOnRequestSuccess} from 'core/hooks';
import {FormInput} from 'atoms';
import {AuthForm} from 'organisms';
import {useNewPassword} from './hooks';

export const NewPassword = () => {
  const {
    t,
    navigation,
    buttonText,
    onConfirmNewPassword,
    newPassword,
    loading,
    rightIcon,
    passwordVisibility,
    handlePasswordVisibility,
    setNewPassword,
  } = useNewPassword();

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
