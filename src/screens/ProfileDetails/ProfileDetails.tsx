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
        size="M"
        loading={loading}
        position="single"
        onPress={() => {}}
        title={'example@example.com'}
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
