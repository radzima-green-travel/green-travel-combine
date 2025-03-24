import React, {memo} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {themeStyles} from './styles';
import {Chip, ChipProps} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {composeTestID} from 'core/helpers';

type ChipsHorisontalListProps = {
  items: Omit<ChipProps, 'testID'>[];
  numberOfRows?: number;
  title?: string;
  testID: string;
};

export const ChipsHorisontalList: React.FC<ChipsHorisontalListProps> = memo(
  ({items = [], numberOfRows = 1, title = '', testID}) => {
    const itemsPerRow = Math.ceil(items.length / numberOfRows);
    const rows = Array.from({length: numberOfRows}, (_, rowIndex) =>
      items.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow),
    );
    const styles = useThemeStyles(themeStyles);
    return (
      <View testID={testID} style={styles.container}>
        {title ? (
          <Text testID={composeTestID(testID, 'title')} style={styles.title}>
            {title}
          </Text>
        ) : null}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.listContainer}>
            {rows.map((row, rowIndex) => {
              return (
                <View key={rowIndex.toString()} style={styles.row}>
                  {row.map((item, index) => {
                    const isLastInRow = index === row.length - 1;
                    return (
                      <View
                        key={item.item || index.toString()}
                        style={[
                          styles.chipWrapper,
                          isLastInRow && styles.lastChipWrapper,
                        ]}>
                        <Chip
                          style={styles.itemContainer}
                          textStyle={styles.itemTextStyle}
                          iconSize={24}
                          theme="large"
                          testID={composeTestID(testID, 'chip')}
                          {...item}
                        />
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  },
);
