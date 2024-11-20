import {Alert} from 'react-native';
import {Action} from 'react-redux-help-kit';

import {useOnRequestError} from './useOnRequestError';

export function useRequestErrorAlert(
  action: Action,
  translationRooKeyt: string,
) {
  useOnRequestError(action, translationRooKeyt, ({text, title}) => {
    Alert.alert(title, text);
  });
}
