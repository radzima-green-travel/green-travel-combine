import React, { memo, forwardRef, useMemo } from 'react';
import { View, Text } from 'react-native';

import { themeStyles } from './styles';
import { SnackBarContainer, SnackBarContainerRef } from './SnackBarContainer';

import { useThemeStyles } from 'core/hooks';
import { Button } from 'atoms/Button';
import { Icon, IconsNames } from 'atoms/Icon';
import { composeTestID } from 'core/helpers';

export interface SnackBarProps {
  isOnTop?: boolean;
  title?: string;
  type?: 'success' | 'error' | 'neutral' | 'notification';
  timeoutMs?: number;
  leadIcon?: IconsNames;
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
        leadIcon,
      },
      ref,
    ) => {
      const styles = useThemeStyles(themeStyles);

      const typeSpecificStyles = useMemo(() => {
        return {
          container: styles[`${type}Container`],
          text: styles[`${type}Text`],
          leadIcon: styles[`${type}LeadIcon`],
          leadIconContainer: styles[`${type}LeadIconContainer`],
        };
      }, [styles, type]);

      const renderLeftIcon = () => {
        if (leadIcon) {
          return (
            <View
              style={[
                styles.defaultLeadIconContainer,
                typeSpecificStyles.leadIconContainer,
              ]}>
              <Icon
                name={leadIcon}
                size={24}
                style={[styles.defaultLeadIcon, typeSpecificStyles.leadIcon]}
                testID={composeTestID(testID, 'leadIcon')}
              />
            </View>
          );
        }
        return null;
      };

      return (
        <SnackBarContainer
          offset={offset}
          isOnTop={isOnTop}
          ref={ref}
          timeoutMs={timeoutMs}>
          <View
            style={[
              styles.container,
              typeSpecificStyles.container,
              leadIcon && styles.containerWithLeadIcon,
            ]}>
            <View>{renderLeftIcon()}</View>
            <Text style={[styles.text, typeSpecificStyles.text]}>{title}</Text>
            {withCloseButton ? (
              <Button
                testID={composeTestID(testID, 'closeButton')}
                style={styles.icon}
                onPress={hide}
                isIconOnlyButton
                renderIcon={() => (
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
