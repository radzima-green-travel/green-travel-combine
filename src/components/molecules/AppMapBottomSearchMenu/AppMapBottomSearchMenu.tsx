import React, {
  memo,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {Keyboard, Pressable, View} from 'react-native';
import {themeStyles} from './styles';

import {useThemeStyles, useTask} from 'core/hooks';
import {IObject} from 'core/types';
import {SearchList} from 'organisms';
import {HeaderSearchbar, Icon} from 'atoms';
import {WINDOW_HEIGHT} from 'services/PlatformService';
import {COLORS} from 'assets';
export type AppMapBottomSearchMenuRef = {
  show: () => void;
  hide: () => void;
  isOpened: () => void;
};

interface IProps {
  data: IObject[];
  bottomInset: number;
  isHistoryVisible: boolean;
  onItemPress: (object: IObject) => void;
  onTextChange: (value: string) => void;
  inputValue: string;
}

export const AppMapBottomSearchMenu = memo(
  forwardRef<AppMapBottomSearchMenuRef, IProps>(
    (
      {
        data,
        inputValue,
        bottomInset,
        isHistoryVisible,
        onItemPress,
        onTextChange,
      },
      ref,
    ) => {
      const styles = useThemeStyles(themeStyles);
      const bs = useRef<BottomSheet>(null);
      const [startTransitionTask, endTransitionTask] = useTask();
      const snapPoint = useMemo(() => WINDOW_HEIGHT * 0.95, []);
      const isOpened = useRef(false);

      const hide = useCallback(() => {
        bs.current?.snapTo(0);
      }, []);

      const show = useCallback(() => {
        bs.current?.snapTo(1);
      }, []);

      const onItemPressHandler = useCallback(
        async (object: IObject) => {
          hide();
          await startTransitionTask();
          onItemPress(object);
        },
        [startTransitionTask, onItemPress, hide],
      );

      const rendnerInner = () => {
        return (
          <View
            style={[
              styles.container,
              {height: snapPoint, paddingBottom: bottomInset},
            ]}>
            <View style={styles.searchBarContatiner}>
              <Pressable
                hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}
                onPress={() => {
                  hide();
                  onTextChange('');
                }}>
                <Icon name="chevron" color={COLORS.logCabin} size={24} />
              </Pressable>
              <HeaderSearchbar
                value={inputValue}
                inputStyle={styles.inputStyles}
                containerStyle={styles.searchBar}
                autoFocus={false}
                onChange={onTextChange}
                selectionColor={COLORS.boulder}
              />
            </View>
            <SearchList
              onItemPress={onItemPressHandler}
              isHistoryVisible={isHistoryVisible}
              data={data}
            />
          </View>
        );
      };

      useImperativeHandle(ref, () => ({
        show: show,
        hide: hide,
        isOpened: () => {
          return isOpened.current;
        },
      }));

      return (
        <BottomSheet
          borderRadius={15}
          ref={bs}
          snapPoints={[0, snapPoint]}
          renderContent={rendnerInner}
          initialSnap={0}
          enabledGestureInteraction={false}
          onCloseStart={() => {
            isOpened.current = false;
            Keyboard.dismiss();
          }}
          onCloseEnd={() => {
            endTransitionTask();
          }}
          onOpenStart={() => {
            isOpened.current = true;
          }}
        />
      );
    },
  ),
);
