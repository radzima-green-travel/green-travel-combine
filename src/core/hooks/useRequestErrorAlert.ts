import {useEffect} from 'react';
import {Alert} from 'react-native';
import {EmptyActionCreator, PayloadAction} from 'typesafe-actions';
import {useTranslation} from 'react-i18next';
import {useRequestError} from './useRequestError';

type ActionCreator = (payload: any) => PayloadAction<string, any>;
export function useRequestErrorAlert(
  action: EmptyActionCreator<string> | ActionCreator,
  translationRooKeyt: string,
) {
  const {error} = useRequestError(action);
  const {t} = useTranslation(translationRooKeyt);
  useEffect(() => {
    if (error) {
      const {
        message: {titlePaths, textPaths},
      } = error;
      Alert.alert(t(titlePaths), t(textPaths));
    }
  }, [error, t]);
}
