import React, {memo, useMemo} from 'react';
import {View, Text, TextStyle} from 'react-native';
import {themeStyles} from './styles';

import {Button, Icon} from 'atoms';
import {FavoriteButtonContainer} from 'containers';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {COLORS} from 'assets';
import {IObject} from 'core/types';
import {composeTestID} from 'core/helpers';

export type ObjectDetailsMapBottomMenuRef = {
  show: () => void;
  hide: () => void;
};

interface IProps {
  data: IObject | null;
  onHideEnd: () => void;
  bottomInset: number;
  onButtonPress: (data: IObject) => void;
  loading: boolean;
  isDirectionShowed: boolean;
  belongsToSubtitle: string | null;
  testID: string;
}

export const ObjectDetailsMapBottomMenu = memo(
  ({
    data,
    bottomInset,
    onButtonPress,
    loading,
    isDirectionShowed,
    belongsToSubtitle,
    testID,
  }: IProps) => {
    const {t} = useTranslation('objectDetails');
    const styles = useThemeStyles(themeStyles);

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

    if (!data) {
      return null;
    }
    const {id, name} = data;
    return (
      <View style={[styles.container, {paddingBottom: bottomInset}]}>
        <View style={[styles.contentContainer]}>
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{name}</Text>

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
              <Text style={styles.subtitle}>{subtitleText}</Text>
            ) : null}
          </View>

          <Button
            testID={composeTestID(testID, 'showDirectionButton')}
            style={[styles.button, !bottomInset && styles.noBottomInset]}
            loading={loading}
            onPress={() => {
              onButtonPress(data);
            }}
            text={t(isDirectionShowed ? 'go' : 'show direction')}
          />
        </View>
      </View>
    );
  },
);
