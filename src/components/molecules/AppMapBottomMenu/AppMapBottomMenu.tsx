import React, {useMemo, memo} from 'react';
import {View, Text, TextStyle} from 'react-native';
import {themeStyles} from './styles';

import {Button, Icon} from 'atoms';
import {FavoriteButtonContainer} from 'containers';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {COLORS} from 'assets';
import {ObjectMap} from 'core/types';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface IProps {
  data: ObjectMap | null;
  bottomInset: number;
  onGetMorePress: (data: ObjectMap) => void;
  testID: string;
}

export const AppMapBottomMenu = memo(
  ({data, bottomInset, onGetMorePress, testID}: IProps) => {
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
                testID={composeTestID(testID, 'favoriteButton')}
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
                {...getPlatformsTestID(composeTestID(testID, 'subitile'))}>
                {subtitleText}
              </Text>
            ) : null}
          </View>
          <Button
            testID={composeTestID(testID, 'getMoreButton')}
            style={[styles.button, !bottomInset && styles.noBottomInset]}
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
