import AsyncStorage from '@react-native-async-storage/async-storage';

import {Alert} from 'react-native';
import config from './config';
import {StorageOptions, StorageResponse} from './types';

const {
  operations: {get, set, remove, merge, multiRemove},
  paramsOrderPattern,
} = config;

class Storage {
  get(options: StorageOptions) {
    return this.process(get, options);
  }

  set(options: StorageOptions) {
    return this.process(set, options);
  }

  remove(options: StorageOptions) {
    return this.process(remove, options);
  }

  merge(options: StorageOptions) {
    return this.process(merge, options);
  }

  multiRemove(options: StorageOptions) {
    return this.process(multiRemove, options);
  }

  async process(operation: string, options: StorageOptions) {
    try {
      if (options.value === null) {
        throw new Error("Couldn't set 'null' to AsyncStorage");
      }
      const adaptedOptions = {
        ...options,
        ...(options.value ? {value: JSON.stringify(options.value)} : {}),
      };
      const response = await AsyncStorage[operation](
        ...this.getParams(adaptedOptions),
      );
      return this.parseResponse(response);
    } catch (e) {
      if (
        ['development', 'staging'].indexOf(
          process.env.EXPO_PUBLIC_ENVIRONMENT as string,
        ) !== -1
      ) {
        Alert.alert('', (e as Error)?.message || 'Storage process error');
      }
    }
  }

  getParams(options: StorageOptions): Array<any> {
    return Object.entries(options)
      .sort((x, y) => paramsOrderPattern[x[0]] - paramsOrderPattern[y[0]])
      .map(itm => itm[1]);
  }

  parseResponse(response: StorageResponse) {
    return typeof response === 'string' && response.length > 0
      ? JSON.parse(response)
      : response;
  }
}

export const storage = new Storage();
