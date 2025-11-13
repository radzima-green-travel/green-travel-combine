import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { useTranslation } from 'core/hooks';

interface IProps {
  text: string;
  marginVertical: number;
}

export const Divider = ({ text, marginVertical }: IProps) => {
  const { t } = useTranslation('authentification');

  return (
    <View style={[styles.textContainer, { marginVertical: marginVertical }]}>
      <View style={styles.lineAround} />
      <Text style={styles.text}>{t(text)}</Text>
      <View style={styles.lineAround} />
    </View>
  );
};
