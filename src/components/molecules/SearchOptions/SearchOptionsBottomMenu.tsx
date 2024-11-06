import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {ListItem} from '../ListItem';
import {useTranslation} from 'react-i18next';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {SearchOptions} from 'core/types';

interface IProps {
  value: SearchOptions;
  onChange: (value: SearchOptions) => void;
  bottomInset: number;
}

export const SearchOptionsBottomMenu = memo(
  ({value, onChange, bottomInset}: IProps) => {
    const {t} = useTranslation('search');
    const styles = useThemeStyles(themeStyles);

    return (
      <View style={[styles.container, {paddingBottom: bottomInset}]}>
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{t('options.title')}</Text>
            </View>
          </View>
          <View>
            <ListItem
              titleContainerStyle={styles.searchOption}
              type="switch"
              boldTitle={false}
              title={t('options.byDescription')}
              testID={'searchByDescriptionOption'}
              switchProps={{
                value: value.byDescription,
                onValueChange: byDescription =>
                  onChange({
                    ...value,
                    byDescription: byDescription,
                  }),
              }}
            />
            <ListItem
              titleContainerStyle={styles.searchOption}
              type="switch"
              boldTitle={false}
              title={t('options.byAddress')}
              testID={'searchByAddressOption'}
              switchProps={{
                value: value.byAddress,
                onValueChange: byAddress =>
                  onChange({
                    ...value,
                    byAddress: byAddress,
                  }),
              }}
            />
          </View>
        </View>
      </View>
    );
  },
);
