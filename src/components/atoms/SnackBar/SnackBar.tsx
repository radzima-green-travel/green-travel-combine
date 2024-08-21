/* eslint-disable react/no-unstable-nested-components */
import React, {memo, forwardRef, useMemo} from 'react';
import {View, Text} from 'react-native';

import {themeStyles} from './styles';
import {SnackBarContainer, SnackBarContainerRef} from './SnackBarContainer';

import {useThemeStyles} from 'core/hooks';
import {Button} from 'atoms/Button';
import {Icon} from 'atoms/Icon';
import {isEqual} from 'lodash';
import {composeTestID} from 'core/helpers';

export interface SnackBarProps {
  isOnTop?: boolean;
  title?: string;
  type?: 'success' | 'error' | 'neutral';
  timeoutMs?: number;
  offset?: number;
  withCloseButton?: boolean;
  hide?: () => void;
  testID: string;
}

export const SnackBar = memo(
  forwardRef<SnackBarContainerRef, SnackBarProps>(
    (
      {
        title = '',
        isOnTop = false,
        type = 'error',
        timeoutMs,
        offset,
        withCloseButton = false,
        hide,
        testID,
      },
      ref,
    ) => {
      const styles = useThemeStyles(themeStyles);

      const typeSpecificStyles = useMemo(() => {
        return {
          container: styles[`${type}Container`],
          text: styles[`${type}Text`],
        };
      }, [styles, type]);

      return (
        <SnackBarContainer
          offset={offset}
          isOnTop={isOnTop}
          ref={ref}
          timeoutMs={timeoutMs}>
          <View style={[styles.container, typeSpecificStyles.container]}>
            <Text
              style={[
                styles.text,
                isEqual(type, 'neutral') && styles.neutralText,
              ]}>
              {title}
            </Text>
            {withCloseButton ? (
              <Button
                testID={composeTestID(testID, 'closeButton')}
                style={styles.icon}
                onPress={hide}
                isIconOnlyButton
                icon={() => (
                  <Icon
                    testID={composeTestID(testID, 'closeIcon')}
                    name={'close'}
                    size={24}
                    style={styles.closeIcon}
                  />
                )}
              />
            ) : null}
          </View>
        </SnackBarContainer>
      );
    },
  ),
);
