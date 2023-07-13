import React, {useMemo, memo} from 'react';
import {View, Text, TextStyle} from 'react-native';
import {themeStyles} from './styles';

import {Button, Icon} from 'atoms';
import {FavoriteButtonContainer} from 'containers';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {COLORS} from 'assets';
import {IObject, TestIDs} from 'core/types';
import {getPlatformsTestID} from 'core/helpers';

interface IProps {
  data: IObject | null;
  bottomInset: number;
  onGetMorePress: (data: IObject) => void;
}

export const AppMapBottomMenu = memo(
  ({data, bottomInset, onGetMorePress}: IProps) => {
    const {t} = useTranslation('map');
    const styles = useThemeStyles(themeStyles);

    const subtitleText = useMemo(() => {
      if (!data) {
        return null;
      }

      const {address, length, category} = data;

      let result = address || '';

      if (length) {
        result = `${result}\n${t('routeLength', {
          km: Number(length.toFixed(2)),
        })}${category.singularName.toLowerCase()}`;
      }

      return result;
    }, [data, t]);

    if (!data) {
      return null;
    }
    const {id, name} = data;
    return (
      <View style={[styles.container, {paddingBottom: bottomInset}]}>
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.textContainer}>
              <Text allowFontScaling={false} style={styles.text}>
                {name}
              </Text>

              <FavoriteButtonContainer
                loadingIndicatorColor={
                  (styles.icon as TextStyle).color as string
                }
                objectId={id}>
                {isFavorite => (
                  <Icon
                    name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
                    width={24}
                    height={24}
                    color={COLORS.logCabin}
                    style={styles.icon}
                  />
                )}
              </FavoriteButtonContainer>
            </View>
            {subtitleText ? (
              <Text
                allowFontScaling={false}
                style={styles.subtitle}
                {...getPlatformsTestID(TestIDs.MapItemDetailsSubtitle)}>
                {subtitleText}
              </Text>
            ) : null}
          </View>
          <Button
            style={[styles.button, !bottomInset && {marginBottom: 16}]}
            onPress={() => {
              onGetMorePress(data);
            }}
            text={t('getMore')}
          />
        </View>
      </View>
    );
  },
);
