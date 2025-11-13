import {
  ForwardedRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { TextInput } from 'react-native';
import { HandleKeyboardContext, HandlerContainerContext } from '../context';

export function useHandleKeyboardInput(
  forwardedRef?: ForwardedRef<TextInput | null>,
) {
  const { handleNode, focusNextInput, registerInputNode, focusInputByRef } =
    useContext(HandleKeyboardContext);
  const parentContainer = useContext(HandlerContainerContext);
  const containerToHandleRef = useRef(null);

  const input = useRef<TextInput>(null);

  useImperativeHandle(forwardedRef, () => {
    return input.current as TextInput;
  });

  useEffect(() => {
    if (registerInputNode && input.current) {
      return registerInputNode(input.current);
    }
  }, [registerInputNode, forwardedRef]);

  const handleContainerNode = useCallback(() => {
    if (parentContainer.current) {
      handleNode(parentContainer.current);
    } else if (containerToHandleRef.current) {
      handleNode(containerToHandleRef.current);
    }
  }, [handleNode, parentContainer]);

  return {
    inputRef: input,
    handleContainerNode,
    focusNextInput,
    containerToHandleRef,
    focusInputByRef,
  };
}
