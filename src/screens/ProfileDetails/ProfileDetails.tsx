import React from 'react';
import {View} from 'react-native';
import {GeneralListItem} from 'molecules';
import {Icon} from 'atoms';
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
    userEmail,
  } = useProfileDetails();

  return (
    <View style={styles.container}>
      <GeneralListItem
        size="M"
        position="single"
        onPress={() => {}}
        title={isAuthorized ? userEmail : t('notAuthorrized.subtitle')}
        renderLeftElement={<Icon name="defaultAcc" size={50} />}
      />
      <View>
        <View style={styles.itemContainer}>
          <GeneralListItem
            loading={loading}
            position="single"
            onPress={onSignOutPress}
            title={t('goOut')}
            red
          />
        </View>
        <GeneralListItem
          loading={deleting}
          position="single"
          onPress={onDeleteUserPress}
          title={t('delete')}
          red
        />
      </View>
    </View>
  );
};

ProfileDetails.screenOptions = screenOptions;
