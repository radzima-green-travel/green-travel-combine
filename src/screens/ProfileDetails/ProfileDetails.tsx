import React from 'react';
import {View} from 'react-native';
import {GeneralListItem} from 'molecules';
import {Icon} from 'atoms';
import {screenOptions} from './screenOptions';
import {useProfileDetails} from './hooks';

export const ProfileDetails = () => {
  const {t, styles, loading, onSignOutPress, deleting, onDeleteUserPress} =
    useProfileDetails();

  return (
    <View style={styles.container}>
      <GeneralListItem
        loading={loading}
        position="single"
        onPress={onSignOutPress}
        title={t('goOut')}
        renderLeftElement={<Icon name="theme" size={30} />}
      />
      <GeneralListItem
        loading={deleting}
        position="single"
        onPress={onDeleteUserPress}
        title={t('delete')}
        renderLeftElement={<Icon name="theme" size={30} />}
      />
    </View>
  );
};

ProfileDetails.screenOptions = screenOptions;
