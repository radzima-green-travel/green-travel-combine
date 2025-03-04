import React, {memo} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {styles} from './styles';
import {Chip, ChipProps} from 'atoms';

type ChipsHorisontalListProps = {
  items: ChipProps[];
  numberOfRows?: number;
  title?: string;
};

export const ChipsHorisontalList: React.FC<ChipsHorisontalListProps> = memo(
  ({items = [], numberOfRows = 1, title = ''}) => {
    const itemsPerRow = Math.ceil(items.length / numberOfRows);
    const rows = Array.from({length: numberOfRows}, (_, rowIndex) =>
      items.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow),
    );

    return (
      <View style={styles.container}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
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
