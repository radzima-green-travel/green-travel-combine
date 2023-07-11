import {FlatList} from 'react-native';
import {ObjectCard} from 'molecules';
import {styles} from './styles';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useObjectsList} from './hooks';
import {TestIDs} from 'core/types';
import {composeTestID} from 'core/helpers';

const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;
export const ObjectsList = () => {
  const {
    sortedListData,
    navigateToObjectDetailsDebounced,
    sendIsFavoriteChangedEvent,
  } = useObjectsList();

  return (
    <FlatList
      data={sortedListData}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => {
        const testID = composeTestID(TestIDs.SubObject, index);

        return (
          <ObjectCard
            onPress={navigateToObjectDetailsDebounced}
            containerStyle={styles.cardContainer}
            data={item}
            width={cardWidth}
            onFavoriteChanged={sendIsFavoriteChangedEvent}
            testID={testID}
          />
        );
      }}
    />
  );
};
