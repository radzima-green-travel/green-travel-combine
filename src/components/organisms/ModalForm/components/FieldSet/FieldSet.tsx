import {map} from 'lodash';
import React, {memo} from 'react';
import {TFunction} from 'react-i18next';
import {ScrollView} from 'react-native';
import {composeTestID} from 'core/helpers';
import {useThemeStyles} from 'core/hooks';
import {ListItem} from 'molecules';
import {themeStyles} from '../../styles';
import {AnyForm} from '../../types';

const FieldSetComponent = <T extends AnyForm>({
  testID,
  onFieldPress,
  form,
  t,
}: {
  testID: string;
  onFieldPress?: (key: Extract<keyof T['state']['values'], string>) => void;
  form: T;
  t: TFunction;
}) => {
  const styles = useThemeStyles(themeStyles);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      contentContainerStyle={styles.list}>
      {map(Object.keys(form.state.values), key => {
        const valueSelector = (state: typeof form.state) => state.values[key];

        return (
          <form.Subscribe key={key} selector={valueSelector}>
            {fieldValue => {
              return (
                <ListItem
                  type="primary"
                  testID={composeTestID(testID, 'field')}
                  subtitle={fieldValue}
                  title={t(`fieldTitles.${key}`)}
                  onPress={() => onFieldPress?.(key as any)}
                />
              );
            }}
          </form.Subscribe>
        );
      })}
    </ScrollView>
  );
};

export const FieldSet = memo(FieldSetComponent) as typeof FieldSetComponent;
