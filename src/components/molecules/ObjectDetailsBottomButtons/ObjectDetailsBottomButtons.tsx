import React, {memo} from 'react';
import {View} from 'react-native';
import {Button, Icon} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {themeStyles} from './styles';
import {isIOS} from 'services/PlatformService';
import {TestIDs} from 'core/types';

interface IProps {
  onShowOnMapPress: () => void;
  onBookmarkPress: () => void;
  onSharePress: () => void;
  isFavorite: boolean;
  isFavoriteLoading: boolean;
  showOnMapButtonEnabled: boolean;
}

export const ObjectDetailsBottomButtons = memo(
  ({
    onSharePress,
    onBookmarkPress,
    onShowOnMapPress,
    isFavorite,
    isFavoriteLoading,
    showOnMapButtonEnabled,
  }: IProps) => {
    const styles = useThemeStyles(themeStyles);
    const {t} = useTranslation('objectDetails');
    return (
      <View style={styles.container}>
        <Button
          style={[styles.showOnMapButton, styles.button]}
          onPress={onShowOnMapPress}
          theme="primary"
          testID={TestIDs.SeeOnTheMapButton}
          text={t('seeOnTheMap')}
          disabled={!showOnMapButtonEnabled}
        />
        <Button
          style={styles.button}
          onPress={onBookmarkPress}
          theme="secondary"
          isIconOnlyButton
          loading={isFavoriteLoading}
          icon={textStyle => (
            <Icon
              name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
              size={24}
              style={textStyle}
            />
          )}
        />
        <Button
          style={styles.button}
          theme="secondary"
          onPress={onSharePress}
          isIconOnlyButton
          icon={textStyle => (
            <Icon
              name={isIOS ? 'shareIos' : 'shareAndroid'}
              size={24}
              style={textStyle}
            />
          )}
        />
      </View>
    );
  },
);
