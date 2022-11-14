import {useState} from 'react';
import {useRequestLoading, useTranslation} from 'core/hooks';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {checkUserEmailRequest} from 'core/reducers';
import {CheckEmailScreenNavigationProps} from '../types';

export const useCheckEmail = () => {
  const {t} = useTranslation('authentification');
  const navigation = useNavigation<CheckEmailScreenNavigationProps>();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);

  const {loading} = useRequestLoading(checkUserEmailRequest);

  return {
    t,
    navigation,
    email,
    setIsEmailCorrect,
    dispatch,
    isEmailCorrect,
    loading,
    setEmail,
  };
};
