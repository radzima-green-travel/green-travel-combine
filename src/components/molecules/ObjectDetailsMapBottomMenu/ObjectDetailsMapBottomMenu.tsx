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
import Animated from 'react-native-reanimated';

import {Button, Icon} from 'atoms';
import {FavoriteButtonContainer} from 'containers';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {COLORS} from 'assets';
import {MENU_HEIGHT} from './styles';
import {IObject} from 'core/types';

export type ObjectDetailsMapBottomMenuRef = {
  show: () => void;
  hide: () => void;
};

interface IProps {
  data: IObject | null;
  onHideEnd: () => void;
  bottomInset: number;
  onButtonPress: (data: IObject) => void;
  animatedPosition: Animated.Value<number>;
  loading: boolean;
  isDirectionShowed: boolean;
  belongsToSubtitle: string | null;
}

export const ObjectDetailsMapBottomMenu = memo(
  forwardRef<ObjectDetailsMapBottomMenuRef, IProps>(
    (
      {
        data,
        onHideEnd,
        bottomInset,
        onButtonPress,
        animatedPosition,
        loading,
        isDirectionShowed,
        belongsToSubtitle,
      },
      ref,
    ) => {
      const {t} = useTranslation('objectDetails');
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

      const subtitleText = useMemo(() => {
        if (!data) {
          return null;
        }

        const {address, length, category} = data;

        let result = address || '';

        if (belongsToSubtitle) {
          result = `${belongsToSubtitle}`;
        }

        if (length) {
          result = `${result}\n${t('routeLength', {
            km: Number(length.toFixed(2)),
          })}${category.singularName.toLowerCase()}`;
        }

        return result;
      }, [belongsToSubtitle, data, t]);

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
              {subtitleText ? (
                <Text numberOfLines={2} style={styles.subtitle}>
                  {subtitleText}
                </Text>
              ) : null}
              <Button
                style={styles.button}
                loading={loading}
                onPress={() => {
                  onButtonPress(data);
                }}>
                {t(isDirectionShowed ? 'go' : 'show direction')}
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
          onCloseEnd={onHideEnd}
        />
      );
    },
  ),
);
