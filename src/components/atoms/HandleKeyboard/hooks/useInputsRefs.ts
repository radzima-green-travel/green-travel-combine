import {useRef, useCallback} from 'react';
import {TextInput} from 'react-native';
import {pull, findIndex} from 'lodash';

export function useInputsRefs() {
  const store = useRef<TextInput[]>([]);

  const registerInputNode = useCallback((ref: TextInput) => {
    store.current.push(ref);

    return () => {
      pull(store.current, ref);
    };
  }, []);

  const focusInputByRef = useCallback((ref: TextInput) => {
    if (ref && ref.focus) {
      ref.focus();
    }
  }, []);

  const focusNextInput = useCallback(() => {
    const focusedInputIndex = findIndex(store.current, input =>
      input.isFocused(),
    );

    if (focusedInputIndex !== -1) {
      const nextInput = store.current[focusedInputIndex + 1];
      if (nextInput && nextInput.focus) {
        nextInput.focus();
      }
    }
  }, []);

  return {
    registerInputNode,
    focusNextInput,
    focusInputByRef,
  };
}
