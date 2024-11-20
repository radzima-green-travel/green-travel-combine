import {useThemeStyles, useTranslation} from 'core/hooks';
import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {themeStyles} from './styles';
import {CompletnessIndicator} from './components';
import {chunk} from 'lodash';
import {Button, Icon} from 'atoms';
import {composeTestID} from 'core/helpers';

interface IProps {
  incompleteFields: Array<{id: string; label: string}>;
  percentage: number;
  onAddInformationPress: () => void;
  testID: string;
}

export const ObjectDetailsCompletenessBlock = memo(
  ({incompleteFields, percentage, onAddInformationPress, testID}: IProps) => {
    const {t} = useTranslation('objectDetails');
    const styles = useThemeStyles(themeStyles);

    const chunkedIncompleteFields = chunk(incompleteFields, 2);

    const renderListItems = (chunkedItem, index) => {
      const [leftItem, rightItem] = chunkedItem;

      return (
        <View style={styles.listRow} key={index}>
          <View style={styles.listRowCell}>
            <Text
              testID={composeTestID(testID, 'listItemTextLeft')}
              style={styles.listItem}>
              {'  •  '}
            </Text>
            <Text
              testID={composeTestID(testID, 'listItemTextLeft')}
              style={[styles.listItem, styles.listItemText]}>
              {leftItem.label}
            </Text>
          </View>
          <View style={styles.listRowCell}>
            {rightItem ? (
              <>
                <Text
                  testID={composeTestID(testID, 'listItemTextRight')}
                  style={styles.listItem}>
                  {'  •  '}
                </Text>
                <Text
                  testID={composeTestID(testID, 'listItemTextRight')}
                  style={[styles.listItem, styles.listItemText]}>
                  {rightItem.label}
                </Text>
              </>
            ) : null}
          </View>
        </View>
      );
    };

    return (
      <View style={styles.container} testID={testID}>
        <Text testID={composeTestID(testID, 'title')} style={styles.title}>
          {t('helpUsToComplete')}
        </Text>
        <CompletnessIndicator
          testID={composeTestID(testID, 'completenessIndicator')}
          percentage={percentage}
        />
        <View testID={composeTestID(testID, 'list')} style={styles.list}>
          {chunkedIncompleteFields.map(renderListItems)}
        </View>
        <Button
          testID={composeTestID(testID, 'addInformationButton')}
          style={styles.button}
          renderIcon={textStyle => (
            <Icon name="pen" size={24} style={textStyle} />
          )}
          theme="secondary"
          text={t('addInformation')}
          onPress={onAddInformationPress}
        />
      </View>
    );
  },
);
