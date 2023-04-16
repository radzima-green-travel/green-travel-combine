import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  forwardRef,
  ComponentProps,
  ComponentType,
  PropsWithChildren,
} from 'react';
import {debounce} from 'lodash';
import {
  Keyboard,
  LayoutAnimation,
  TextInput,
  ScrollView,
  KeyboardEvent,
} from 'react-native';
import {useInputsRefs} from './hooks';

import {HandleKeyboardContext} from './context';
import {calculateAndAdjustKeyboard} from './service';
import {KEYBOARD_SHOW_EVENT, KEYBOARD_HIDE_EVENT} from 'core/constants';
import {isIOS} from 'services/PlatformService';
import {useStaticCallback} from 'core/hooks';

interface HandleKeyboardProps {
  handleKeyboardAdditionalOffset?: number;
}

export function createHandleKeyboardScrollComponent<T, P>(
  ScrollableComponent: ComponentType<P>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.PropsWithChildren<P & HandleKeyboardProps>> &
    React.RefAttributes<T>
>;

export function createHandleKeyboardScrollComponent(
  WrappedComponent: any,
): any {
  const ScrollComponent = WrappedComponent as typeof ScrollView;

  return forwardRef((props, ref) => {
    const {
      children,
      handleKeyboardAdditionalOffset = 0,
      ...scrollComponentProps
    } = props as PropsWithChildren<
      ComponentProps<typeof ScrollComponent> & HandleKeyboardProps
    >;

    const scrollRef = useRef<ScrollView>(null);

    const regulatedNode = useRef(null);

    const [bottom, setBottom] = useState(0);
    const keyboardData = useRef<KeyboardEvent | null>(null);

    const scrollHeight = useRef(0);

    const changeListBottomOffset = useCallback(toValue => {
      if (keyboardData.current) {
        const {duration, easing} = keyboardData.current;
        setBottom(prevValue => {
          if (prevValue !== toValue) {
            LayoutAnimation.configureNext({
              duration: duration > 10 ? duration : 10,
              update: {
                duration: duration > 10 ? duration : 10,
                type: isIOS
                  ? LayoutAnimation.Types[easing] || 'keyboard'
                  : 'linear',
              },
            });
          }
          return toValue;
        });
      }
    }, []);

    const scrollToNode = useCallback(
      node => {
        if (
          !node ||
          !keyboardData.current ||
          !TextInput.State.currentlyFocusedInput()
        ) {
          return;
        }

        const {endCoordinates} = keyboardData.current;

        calculateAndAdjustKeyboard({
          scrollNode: scrollRef.current,
          keyboardY: endCoordinates.screenY,
          nodeToHandle: node,
          scrollHeight: scrollHeight.current,
          changeListBottomOffset,
          listBottomOffset: bottom,
          additionalNodeOffset: handleKeyboardAdditionalOffset,
        });
      },
      [handleKeyboardAdditionalOffset, bottom, changeListBottomOffset],
    );

    const onKeyBoardShow = useStaticCallback(
      (e: KeyboardEvent = keyboardData.current as KeyboardEvent) => {
        keyboardData.current = e;
        scrollToNode(regulatedNode.current);
      },
      [scrollToNode],
    );

    const debounceKeyboardShow = useMemo(
      () => debounce(onKeyBoardShow, 10, {trailing: true}),
      [onKeyBoardShow],
    );

    const onKeyBoardShowHandler = useMemo(
      () => (isIOS ? onKeyBoardShow : debounceKeyboardShow),
      [debounceKeyboardShow, onKeyBoardShow],
    );

    const onKeyBoardHide = useCallback(() => {
      changeListBottomOffset(0);
    }, [changeListBottomOffset]);

    useEffect(() => {
      const listener = Keyboard.addListener(
        KEYBOARD_SHOW_EVENT,
        onKeyBoardShowHandler,
      );
      return () => {
        listener.remove();
      };
    }, [onKeyBoardShowHandler]);

    useEffect(() => {
      const listener = Keyboard.addListener(
        KEYBOARD_HIDE_EVENT,
        onKeyBoardHide,
      );
      return () => {
        listener.remove();
      };
    }, [onKeyBoardHide]);

    const handleNode = useStaticCallback(
      node => {
        regulatedNode.current = node;
        onKeyBoardShowHandler();
      },
      [onKeyBoardShowHandler],
    );

    function setScrollHeight(scrollContentHeight?: number) {
      if (scrollContentHeight) {
        scrollHeight.current = scrollContentHeight;
      }
    }

    const {registerInputNode, focusNextInput, focusInputByRef} =
      useInputsRefs();
    const [value] = useState(() => ({
      handleNode,
      registerInputNode,
      focusNextInput,
      focusInputByRef,
    }));

    const {
      contentContainerStyle,
      onContentSizeChange,
      ...restScrollComponentProps
    } = scrollComponentProps as ComponentProps<typeof WrappedComponent>;

    return (
      <HandleKeyboardContext.Provider value={value}>
        <ScrollComponent
          ref={node => {
            if (node) {
              // @ts-ignore
              scrollRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              }
            }
          }}
          onContentSizeChange={(width, scrollContentHeight) => {
            setScrollHeight(scrollContentHeight);
            if (typeof onContentSizeChange === 'function') {
              onContentSizeChange(width, scrollContentHeight);
            }
          }}
          contentContainerStyle={[
            contentContainerStyle,
            {
              bottom,
            },
          ]}
          {...restScrollComponentProps}>
          {children}
        </ScrollComponent>
      </HandleKeyboardContext.Provider>
    );
  });
}
