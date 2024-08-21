import React, {memo, PropsWithChildren} from 'react';
import {Pressable, View} from 'react-native';
import {themeStyles} from './styles';
import {useThemeStyles, useColorScheme} from 'core/hooks';
import {HeaderSearchbar, Icon} from 'atoms';
import {COLORS} from 'assets';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface IProps {
  bottomInset: number;
  onTextChange: (value: string) => void;
  inputValue: string;
  onBackPress: () => void;
  testID: string;
}

export const AppMapBottomSearchMenu = memo(
  ({
    inputValue,
    bottomInset,
    onTextChange,
    onBackPress,
    children,
    testID,
  }: PropsWithChildren<IProps>) => {
    const styles = useThemeStyles(themeStyles);
    const theme = useColorScheme();

    return (
      <View style={[styles.container, {paddingBottom: bottomInset}]}>
        <View style={styles.searchBarContatiner}>
          <Pressable
            hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}
            onPress={() => {
              onTextChange('');
              onBackPress();
            }}
            {...getPlatformsTestID(composeTestID(testID, 'backButton'))}>
            <Icon
              style={styles.icon}
              name="chevronMediumLeft"
              color={COLORS.logCabin}
              size={24}
            />
          </Pressable>
          <HeaderSearchbar
            testID={composeTestID(testID, 'searchBar')}
            value={inputValue}
            inputStyle={styles.inputStyles}
            containerStyle={styles.searchBar}
            autoFocus={false}
            onChange={onTextChange}
            selectionColor={
              theme === 'light' ? COLORS.boulder : COLORS.altoForDark
            }
          />
        </View>
        <View style={styles.searchListConttainer}>{children}</View>
      </View>
    );
  },
);
