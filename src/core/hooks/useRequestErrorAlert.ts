import {Alert} from 'react-native';
import {EmptyActionCreator, PayloadAction} from 'typesafe-actions';

import {useOnRequestError} from './useOnRequestError';

type ActionCreator = (payload: any) => PayloadAction<string, any>;
export function useRequestErrorAlert(
  action: EmptyActionCreator<string> | ActionCreator,
  translationRooKeyt: string,
) {
  useOnRequestError(action, translationRooKeyt, ({text, title}) => {
    Alert.alert(title, text);
  });
}
