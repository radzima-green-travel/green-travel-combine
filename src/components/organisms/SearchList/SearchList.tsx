import React, {memo} from 'react';
import {
  Keyboard,
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {SearchListItem} from 'molecules';
import {SwipeToDeleteContainer} from '../../containers';
import {Icon} from 'atoms';
import {COLORS} from 'assets';
import {themeStyles} from './styles';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {IObject} from 'core/types';

import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
interface IProps {
  data: IObject[];
  onItemPress: (object: IObject) => void;
  onDeletePress?: (object: IObject) => void;
  isHistoryVisible: boolean;
  FlatListComponent?: typeof FlatList | typeof BottomSheetFlatList;
}

export const SearchList = memo(
  ({
    data,
    onItemPress,
    onDeletePress,
    isHistoryVisible,
    FlatListComponent = FlatList,
  }: IProps) => {
    const {t} = useTranslation('search');

    const styles = useThemeStyles(themeStyles);

    return (
      <>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.emptyListContainer}>
          <View style={styles.emptyListContent}>
            <Icon name="search" color={COLORS.silver} height={48} width={48} />
            <Text style={styles.emptyListText}>{t('notFound')}</Text>
          </View>
        </KeyboardAvoidingView>

        {data.length ? (
          <FlatListComponent
            style={styles.listContainer}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.contentContainer}
            onScrollBeginDrag={Keyboard.dismiss}
            keyExtractor={item => item.id}
            data={data}
            ListHeaderComponent={() =>
              isHistoryVisible ? (
                <Text style={styles.listTitle}>{t('searchTitle')}</Text>
              ) : null
            }
            renderItem={({item}) => {
              return isHistoryVisible && onDeletePress ? (
                <SwipeToDeleteContainer
                  data={item}
                  onDeletePress={onDeletePress}>
                  <SearchListItem onPress={onItemPress} data={item} />
                </SwipeToDeleteContainer>
              ) : (
                <SearchListItem onPress={onItemPress} data={item} />
              );
            }}
          />
        ) : null}
      </>
    );
  },
);
