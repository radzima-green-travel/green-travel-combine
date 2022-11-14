import React, {Dispatch, SetStateAction} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {themeStyles} from './styles';
import {useColorScheme, useThemeStyles, useTranslation} from 'core/hooks';
import {Icon} from 'atoms';
import {IconsNames} from 'atoms/Icon/IconsNames';
import {COLORS} from 'assets';

interface IProps {
  iconLeftName?: IconsNames;
  iconRightName?: IconsNames;
  size: number;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  secureTextEntry?: boolean;
  dangerBorder?: boolean;
  onRightIconPress?: () => void;
  autoFocus?: boolean;
}

export const FormInput = ({
  iconLeftName,
  iconRightName,
  size,
  placeholder,
  secureTextEntry = false,
  dangerBorder = false,
  value,
  setValue,
  onRightIconPress,
  autoFocus,
}: IProps) => {
  const {t} = useTranslation('authentification');
  const styles = useThemeStyles(themeStyles);
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.inputFieldContainer,
        dangerBorder ? styles.dangerBorder : null,
      ]}>
      {iconLeftName ? (
        <Icon
          name={iconLeftName}
          size={size}
          color={colorScheme === 'light' ? COLORS.logCabin : COLORS.white}
          style={styles.icon}
        />
      ) : null}
      <TextInput
        style={styles.inputField}
        placeholder={t(placeholder)}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={setValue}
        autoFocus={autoFocus}
        placeholderTextColor={colorScheme === 'light' ? COLORS.logCabin : COLORS.cullGrey}
      />
      {iconRightName ? (
        <Pressable
          style={[
            styles.iconContainer,
            dangerBorder ? styles.dangerBorder : null,
          ]}
          onPress={onRightIconPress}>
          <Icon
            name={iconRightName}
            size={16}
            color={colorScheme === 'light' ? COLORS.logCabin : COLORS.white}
          />
        </Pressable>
      ) : null}
    </View>
  );
};
