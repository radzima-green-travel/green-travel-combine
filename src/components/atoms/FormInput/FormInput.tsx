import React, {Dispatch, SetStateAction} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';
import {Icon} from 'atoms';
import {IconsNames} from 'atoms/Icon/IconsNames';

interface IProps {
  iconLeftName?: IconsNames;
  iconRightName?: IconsNames;
  size: number;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  secureTextEntry?: boolean;
  onRightIconPress?: () => void;
}

export const FormInput = ({
  iconLeftName,
  iconRightName,
  size,
  placeholder,
  secureTextEntry = false,
  value,
  setValue,
  onRightIconPress,
}: IProps) => {
  const {t} = useTranslation('authentification');

  return (
    <View style={styles.inputFieldContainer}>
      {iconLeftName ? (
        <Icon name={iconLeftName} size={size} style={styles.icon} />
      ) : null}
      <TextInput
        style={styles.inputField}
        placeholder={t(placeholder)}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={setValue}
      />
      {iconRightName ? (
        <Pressable style={styles.iconContainer} onPress={onRightIconPress}>
          <Icon name={iconRightName} size={16} />
        </Pressable>
      ) : null}
    </View>
  );
};
