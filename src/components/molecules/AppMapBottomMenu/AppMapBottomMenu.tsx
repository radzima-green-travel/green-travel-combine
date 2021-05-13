import React, {
  memo,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {View, Text} from 'react-native';
import {themeStyles} from './styles';

import {Button, Icon} from 'atoms';
import {FavoriteButtonContainer} from 'containers';
import {useThemeStyles} from 'core/hooks';
import {COLORS} from 'assets';
import {MENU_HEIGHT} from './styles';
import {IObject} from 'core/types';
export type AppMapBottomMenuRef = {
  show: () => void;
  hide: () => void;
  isOpened: () => boolean;
};

interface IProps {
  data: IObject | null;
  onHideEnd: () => void;
  bottomInset: number;
  onGetMorePress: (data: IObject) => void;
  animatedPosition: Animated.Value<number>;
}

export const AppMapBottomMenu = memo(
  forwardRef<AppMapBottomMenuRef, IProps>(
    ({data, onHideEnd, bottomInset, onGetMorePress, animatedPosition}, ref) => {
      const styles = useThemeStyles(themeStyles);
      const bs = useRef<BottomSheet>(null);
      const isOpened = useRef(false);

      const snapPoint = useMemo(() => MENU_HEIGHT + bottomInset, [bottomInset]);

      const show = () => {
        bs.current?.snapTo(1);
      };

      const hide = () => {
        bs.current?.snapTo(0);
      };

      useImperativeHandle(ref, () => ({
        show: show,
        hide: hide,
        isOpened: () => {
          return isOpened.current;
        },
      }));

      const rendnerInner = () => {
        if (!data) {
          return null;
        }
        const {id, name} = data;
        return (
          <View style={[styles.container, {paddingBottom: bottomInset}]}>
            <View style={[styles.contentContainer, {height: MENU_HEIGHT}]}>
              <View style={styles.touchIndicator} />

              <View style={styles.textContainer}>
                <Text numberOfLines={2} style={styles.text}>
                  {name}
                </Text>
                <FavoriteButtonContainer objectId={id}>
                  {isFavorite => (
                    <Icon
                      name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
                      width={20}
                      height={20}
                      color={COLORS.logCabin}
                      style={styles.icon}
                    />
                  )}
                </FavoriteButtonContainer>
              </View>
              <Button
                onPress={() => {
                  onGetMorePress(data);
                }}>
                Узнать больше
              </Button>
            </View>
          </View>
        );
      };

      return (
        <BottomSheet
          callbackNode={animatedPosition}
          borderRadius={15}
          ref={bs}
          snapPoints={[0, snapPoint]}
          renderContent={rendnerInner}
          initialSnap={0}
          enabledInnerScrolling={false}
          onCloseEnd={onHideEnd}
          onOpenStart={() => (isOpened.current = true)}
          onCloseStart={() => {
            isOpened.current = false;
          }}
        />
      );
    },
  ),
);
