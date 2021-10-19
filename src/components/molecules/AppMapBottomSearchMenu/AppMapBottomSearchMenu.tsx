import React, {memo, useCallback} from 'react';
import {Keyboard, Pressable, View} from 'react-native';
import {themeStyles} from './styles';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useThemeStyles, useColorScheme} from 'core/hooks';
import {IObject} from 'core/types';
import {SearchList} from 'organisms';
import {HeaderSearchbar, Icon} from 'atoms';
import {COLORS} from 'assets';

interface IProps {
  data: IObject[];
  bottomInset: number;
  isHistoryVisible: boolean;
  onItemPress: (object: IObject) => void;
  onTextChange: (value: string) => void;
  inputValue: string;
  onBackPress: () => void;
}

export const AppMapBottomSearchMenu = memo(
  ({
    data,
    inputValue,
    bottomInset,
    isHistoryVisible,
    onItemPress,
    onTextChange,
    onBackPress,
  }: IProps) => {
    const styles = useThemeStyles(themeStyles);
    const theme = useColorScheme();

    const onItemPressHandler = useCallback(
      async (object: IObject) => {
        Keyboard.dismiss();
        setTimeout(() => {
          onItemPress(object);
        }, 0);
      },
      [onItemPress],
    );

    return (
      <View style={[styles.container, {paddingBottom: bottomInset}]}>
        <View style={styles.searchBarContatiner}>
          <Pressable
            hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}
            onPress={() => {
              onTextChange('');
              onBackPress();
            }}>
            <Icon
              style={styles.icon}
              name="chevron"
              color={COLORS.logCabin}
              size={24}
            />
          </Pressable>
          <HeaderSearchbar
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
        <View style={styles.searchListConttainer}>
          <SearchList
            FlatListComponent={BottomSheetFlatList}
            onItemPress={onItemPressHandler}
            isHistoryVisible={isHistoryVisible}
            data={data}
          />
        </View>
      </View>
    );
  },
);
