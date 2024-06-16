import {HeaderSearchbar} from 'atoms';
import {setSearchInputValue} from 'core/reducers';
import {selectSearchInputValue} from 'core/selectors';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IProps, ScreenOptions} from './types';
import {styles, themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'atoms';
import {TestIDs} from 'core/types';

const HeaderTitle = () => {
  const dispatch = useDispatch();
  const inputValue = useSelector(selectSearchInputValue);

  const setInputValue = useCallback(
    (text: string) => {
      dispatch(setSearchInputValue(text));
    },
    [dispatch],
  );

  return (
    <HeaderSearchbar
      containerStyle={styles.headerTitleContainer}
      value={inputValue}
      onChange={setInputValue}
    />
  );
};

const HeaderRight = ({navigation}: IProps) => {
  const themesStyle = useThemeStyles(themeStyles);

  return (
    <TouchableOpacity
      hitSlop={{top: 15, left: 15, right: 15, bottom: 10}}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Filter')}>
      <Icon
        name="tune"
        style={themesStyle.icon}
        size={24}
        testID={TestIDs.FilterButton}
      />
    </TouchableOpacity>
  );
};

export const screenOptions: ScreenOptions = props => ({
  headerTitle: () => <HeaderTitle />,
  headerRight: () => <HeaderRight {...props} />,
});
