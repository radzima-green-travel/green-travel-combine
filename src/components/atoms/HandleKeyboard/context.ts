import React, {createContext} from 'react';
import {TextInput} from 'react-native';

type HandleKeyboardContextType = {
  handleNode: (node: any) => void;
  registerInputNode: (inputNode: TextInput) => void;
  focusNextInput: () => void;
  focusInputByRef: (ref: TextInput) => void;
};

export const HandleKeyboardContext = createContext<HandleKeyboardContextType>({
  handleNode: () => {},
  registerInputNode: () => {},
  focusNextInput: () => {},
  focusInputByRef: () => {},
});

export const HandlerContainerContext = createContext<
  React.MutableRefObject<null>
>({
  current: null,
});
