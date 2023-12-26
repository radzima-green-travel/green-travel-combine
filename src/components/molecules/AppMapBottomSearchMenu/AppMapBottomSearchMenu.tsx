import React, {memo, useCallback} from 'react';
import {Keyboard, Pressable, View} from 'react-native';
import {themeStyles} from './styles';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useThemeStyles, useColorScheme} from 'core/hooks';
import {IObject, TestIDs} from 'core/types';
import {SearchList} from 'organisms';
import {HeaderSearchbar, Icon} from 'atoms';
import {COLORS} from 'assets';
import {getPlatformsTestID} from 'core/helpers';

interface IProps {
  data: IObject[];
  bottomInset: number;
  isHistoryVisible: boolean;
  onItemPress: (object: IObject) => void;
  onDeletePress?: (object: IObject) => void;
  onDeleteAllPress: () => void;
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
    onDeleteAllPress,
    onDeletePress,
    onTextChange,
    onBackPress,
  }: IProps) => {
    const styles = useThemeStyles(themeStyles);
    const theme = useColorScheme();

    const onItemPressHandler = useCallback(
      (object: IObject) => {
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
            }}
            {...getPlatformsTestID(TestIDs.MapSearchBackButton)}>
            <Icon
              style={styles.icon}
              name="chevronMediumLeft"
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
            onDeleteAllPress={onDeleteAllPress}
            onDeletePress={onDeletePress}
            isHistoryVisible={isHistoryVisible}
            data={data}
            isSearchQueryEmpty={!inputValue}
          />
        </View>
      </View>
    );
  },
);
