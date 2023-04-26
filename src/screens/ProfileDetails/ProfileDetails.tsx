import React from 'react';
import {Text, View} from 'react-native';
import {GeneralListItem} from 'molecules';
import {screenOptions} from './screenOptions';
import {useProfileDetails} from './hooks';
import {useTranslation} from 'react-i18next';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

export const ProfileDetails = () => {
  const {t} = useTranslation('profile');
  const styles = useThemeStyles(themeStyles);
  const {
    loading,
    onSignOutPress,
    deleting,
    onDeleteUserPress,
    isAuthorized,
    userName,
    onChangePasswordPress,
    isChangePasswordAvailable,
  } = useProfileDetails();

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <GeneralListItem
          position="single"
          onPress={() => {}}
          title={
            isAuthorized ? t('authorized.email') : t('notAuthorrized.subtitle')
          }
          renderRightElement={isAuthorized && <Text>{userName}</Text>}
        />
      </View>
      {isChangePasswordAvailable ? (
        <View style={styles.itemContainer}>
          <GeneralListItem
            position="single"
            onPress={onChangePasswordPress}
            title={t('changePassword')}
          />
        </View>
      ) : null}
      <GeneralListItem
        loading={deleting}
        position="top"
        onPress={onDeleteUserPress}
        title={t('delete')}
        red
      />
      <GeneralListItem
        loading={loading}
        position="bottom"
        onPress={onSignOutPress}
        title={t('goOut')}
      />
    </View>
  );
};

ProfileDetails.screenOptions = screenOptions;
