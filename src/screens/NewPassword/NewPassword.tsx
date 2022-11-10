import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {confirmNewPasswordRequest} from 'core/reducers';
import {
  useOnRequestSuccess,
  useRequestLoading,
  useTogglePasswordVisibility,
  useTranslation,
} from 'core/hooks';
import {FormInput} from 'atoms';
import {AuthForm} from 'organisms';
import {IProps} from './types';

export const NewPassword = ({navigation, route}: IProps) => {
  const [newPassword, setNewPassword] = useState('');
  const {t} = useTranslation('authentification');
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');
  const buttonText = t('save').toUpperCase();
  const dispatch = useDispatch();

  const {
    params: {email, code},
  } = route;

  const onConfirmNewPassword = useCallback(() => {
    dispatch(confirmNewPasswordRequest({email, code, newPassword}));
  }, [code, dispatch, email, newPassword]);

  const {loading} = useRequestLoading(confirmNewPasswordRequest);
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
