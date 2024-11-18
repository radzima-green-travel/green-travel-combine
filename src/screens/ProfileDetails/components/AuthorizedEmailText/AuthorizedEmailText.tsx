import React from 'react';
import {Text, View} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from '../../styles';
import {map} from 'lodash';

export const AuthorizedEmailText = ({userName}: {userName: string}) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <View style={styles.emailTextContainer}>
      {map(userName, letter => (
        <View>
          <Text style={styles?.email}>{letter}</Text>
        </View>
      ))}
    </View>
  );
};
