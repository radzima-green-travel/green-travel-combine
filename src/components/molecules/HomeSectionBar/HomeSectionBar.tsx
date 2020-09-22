import React, {memo, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ObjectCard} from 'atoms';
import {styles} from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {IObject} from 'core/types';
interface Props {
  title: string;
  content: IObject[];
  onAllPress: (options: {data: IObject[]; title: string}) => void;
  onItemPress: () => void;
}

export const HomeSectionBar = memo(
  ({title: sectionTitle, content, onAllPress, onItemPress}: Props) => {
    const keyExtractor = useCallback(({title}) => title, []);
    const {t} = useTranslation('home');

    const onAllPressHandler = useCallback(() => {
      onAllPress({data: content, title: sectionTitle});
    }, [onAllPress, content, sectionTitle]);

    const renderItem = ({item}: {item: IObject}) => (
      <ObjectCard
        containerStyle={styles.cardContainer}
        onPress={onItemPress}
        data={item}
      />
    );

    return (
      <View>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={onAllPressHandler}>
            <Text style={styles.all}>{t('all')}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={keyExtractor}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={content}
          horizontal
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  },
);
