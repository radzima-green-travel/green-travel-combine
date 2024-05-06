import {useColorScheme, useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {themeStyles} from './styles';
import {composeTestID} from 'core/helpers';
import {Card} from 'molecules';
import {IObjectAddititonalInfoItem} from 'core/types';
import {images} from 'assets/images';
import {capitalize, map} from 'lodash';
export type CardType = 'accommodation' | 'placeToEat' | 'event';
interface IProps {
  items: IObjectAddititonalInfoItem[];
  title: string;
  testID: string;
  type: CardType;
  onLinkPress: (url: string, type: CardType) => void;
  onRightButtonPress: (url: string, type: CardType) => void;
}

export const ObjectInfoCardItemsSection = memo(
  ({items, testID, type, title, onRightButtonPress, onLinkPress}: IProps) => {
    const styles = useThemeStyles(themeStyles);
    const scheme = useColorScheme();

    const colorThemeSufix = capitalize(scheme) as 'Light' | 'Dark';

    const onLinkPressHandler = (url: string) => {
      onLinkPress(url, type);
    };

    const onRightButtonPressHandler = (url: string) => {
      onRightButtonPress(url, type);
    };

    const renderCards = () =>
      map(items, (item, index) => {
        const {name, date, link, googleLink} = item;
        return (
          <Card
            containerStyle={styles.item}
            key={index}
            title={name}
            subtitle={date}
            link={link}
            rightButtonIcon="location"
            onLinkPress={onLinkPressHandler}
            onRightButtonPress={
              googleLink
                ? () => onRightButtonPressHandler(googleLink)
                : undefined
            }
            leftImageAsset={images[type + colorThemeSufix]}
            testID={composeTestID(testID, 'item')}
          />
        );
      });

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {renderCards()}
      </View>
    );
  },
);
