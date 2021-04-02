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
import {ISearchItem} from 'core/types';
import {SearchList} from 'organisms';
import {HeaderSearchbar, Icon} from 'atoms';
import {WINDOW_HEIGHT} from 'services/PlatformService';
import {COLORS} from 'assets';
export type AppMapBottomSearchMenuRef = {
  show: () => void;
  hide: () => void;
};

interface IProps {
  data: ISearchItem[];
  bottomInset: number;
  isHistoryVisible: boolean;
  onItemPress: (object: ISearchItem) => void;
  onTextChange: (value: string) => void;
}

export const AppMapBottomSearchMenu = memo(
  forwardRef<AppMapBottomSearchMenuRef, IProps>(
    (
      {
        data,

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

      const hide = useCallback(() => {
        bs.current?.snapTo(0);
      }, []);

      const show = useCallback(() => {
        bs.current?.snapTo(1);
      }, []);

      const onItemPressHandler = useCallback(
        async (object: ISearchItem) => {
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
                onPress={hide}>
                <Icon name="chevron" color={COLORS.logCabin} size={24} />
              </Pressable>
              <HeaderSearchbar
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
      }));

      return (
        <BottomSheet
          borderRadius={15}
          ref={bs}
          snapPoints={[0, snapPoint]}
          renderContent={rendnerInner}
          initialSnap={0}
          enabledGestureInteraction={false}
          onCloseStart={Keyboard.dismiss}
          onCloseEnd={() => {
            endTransitionTask();
          }}
        />
      );
    },
  ),
);
