import React, {
  memo,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {View, Text} from 'react-native';
import {themeStyles} from './styles';

import {Button, Icon} from 'atoms';
import {FavoriteButtonContainer} from 'containers';
import {useThemeStyles} from 'core/hooks';
import {COLORS} from 'assets';
import {MENU_HEIGHT} from './styles';
import {IObjectWithIcon} from 'core/types';
export type AppMapBottomMenuRef = {
  show: () => void;
  hide: () => void;
};

interface IProps {
  data: IObjectWithIcon | null;
  onHideEnd: () => void;
  bottomInset: number;
  onGetMorePress: (data: IObjectWithIcon) => void;
}

export const AppMapBottomMenu = memo(
  forwardRef<AppMapBottomMenuRef, IProps>(
    ({data, onHideEnd, bottomInset, onGetMorePress}, ref) => {
      const styles = useThemeStyles(themeStyles);
      const bs = useRef<BottomSheet>(null);

      const snapPoint = useMemo(() => MENU_HEIGHT + bottomInset, [bottomInset]);
      useImperativeHandle(ref, () => ({
        show: () => {
          bs.current?.snapTo(1);
        },
        hide: () => {
          bs.current?.snapTo(0);
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
          borderRadius={15}
          ref={bs}
          snapPoints={[0, snapPoint]}
          renderContent={rendnerInner}
          initialSnap={0}
          enabledGestureInteraction={false}
          onCloseEnd={onHideEnd}
        />
      );
    },
  ),
);
