import React from 'react';
import {View} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {Card} from '../../atoms/Card';

export const ObjectDetailsMapCallout = ({title, imageUri}) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <View pointerEvents="box-none" style={styles.container}>
      <View style={styles.content}>
        <Card title={title} imageUri={imageUri} width={300} />
      </View>
      <View style={styles.sBubble} />
    </View>
  );
};
