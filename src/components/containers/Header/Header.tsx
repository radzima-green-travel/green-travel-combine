import {
  NavigationProp,
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import React, { type FC, type ReactElement, useLayoutEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Icon } from 'atoms';
import { useStatusBar, useThemeStyles } from 'core/hooks';
import { AnimatedCircleButton } from 'molecules';
import { useHeaderWithOverlayLayout } from './hooks';
import { themeStyles } from './styles';
import type {
  HeaderActionButtonProps,
  HeaderBackButtonProps,
  HeaderContextValue,
  HeaderProps,
  HeaderTitleProps,
  PageContentWrapperProps,
} from './types';
import { isElementOfType, resolveChildrenWithProps } from 'core/utils/react';

const HeaderComponent: FC<HeaderProps> = ({
  overlaysContent = true,
  replacesDefaultHeader = true,
  statusbarStyle = 'auto',
  backButtonIcon = 'chevronMediumLeft',
  backButtonPosition = 'left',
  backButtonAction,
  backButtonHidden,
  title,
  titleAlign = 'left',
  titleSize = 'large',
  style,
  titleStyle,
  rightActions,
  leftSlot,
  rightSlot,
  topSlot,
  titleSlot,
  bottomSlot,
  topAlign = 'left',
  bottomAlign = 'left',
  testID,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { key } = useRoute();
  const canGoBack = useNavigationState(state => state.routes[0].key !== key);
  const styles = useThemeStyles(themeStyles);

  useLayoutEffect(() => {
    if (replacesDefaultHeader) {
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [replacesDefaultHeader, navigation]);

  useStatusBar({ style: statusbarStyle });

  const renderProps: HeaderContextValue = { navigation, canGoBack };

  const resolvedTopSlot = resolveChildrenWithProps(topSlot, renderProps);
  const resolvedBottomSlot = resolveChildrenWithProps(bottomSlot, renderProps);
  const resolvedLeftSlot = resolveChildrenWithProps(leftSlot, renderProps);
  const resolvedRightSlot = resolveChildrenWithProps(rightSlot, renderProps);
  const resolvedTitleSlot = resolveChildrenWithProps(titleSlot, renderProps);

  const showBackButton = !backButtonHidden && canGoBack;
  const backButtonOnLeft = backButtonPosition === 'left';
  const backButtonOnRight = backButtonPosition === 'right';
  const backButtonOnTopLeft = backButtonPosition === 'topLeft';
  const backButtonOnTopRight = backButtonPosition === 'topRight';
  const backButtonInTopRow = backButtonOnTopLeft || backButtonOnTopRight;

  const renderBackButton = () => (
    <HeaderBackButton
      icon={backButtonIcon}
      onPress={backButtonAction}
      testID="backButton"
    />
  );

  const renderRightActions = () => {
    if (!rightActions?.length) return null;
    return (
      <View style={styles.contentRow}>
        {rightActions.map(action => (
          <HeaderActionButton
            key={action.icon ?? action.label}
            testID="actionButton"
            {...action}
            onPress={action.action}
          />
        ))}
      </View>
    );
  };

  const leftContent = (
    <>
      {resolvedLeftSlot
        ?? (showBackButton && backButtonOnLeft && renderBackButton())}
    </>
  );

  const rightContent = (
    <>
      {resolvedRightSlot}
      {renderRightActions()}
      {showBackButton && backButtonOnRight && renderBackButton()}
    </>
  );

  const titleContent =
    resolvedTitleSlot
    ?? (title ? (
      <HeaderTitle size={titleSize} style={titleStyle}>
        {title}
      </HeaderTitle>
    ) : null);

  const hasLeftContent =
    (showBackButton && backButtonOnLeft) || resolvedLeftSlot;
  const hasRightContent =
    resolvedRightSlot
    || (rightActions?.length ?? 0) > 0
    || (showBackButton && backButtonOnRight);
  const hasTitleContent = !!titleContent;
  const isCentered = titleAlign === 'center';

  return (
    <SafeAreaView
      testID={testID}
      edges={['top']}
      style={[styles.container, overlaysContent && styles.overlay, style]}>
      {/* Top Slot */}
      {resolvedTopSlot || (showBackButton && backButtonInTopRow) ? (
        <View
          style={[
            styles.contentRow,
            styles[
              `contentAlign_${backButtonOnTopRight ? 'right' : backButtonOnTopLeft ? 'left' : topAlign}`
            ],
          ]}>
          {showBackButton && backButtonOnTopLeft && renderBackButton()}
          {resolvedTopSlot}
          {showBackButton && backButtonOnTopRight && renderBackButton()}
        </View>
      ) : null}

      {/* Main Row */}
      <View style={styles.contentRow}>
        {/* Left Slot */}
        {hasLeftContent || isCentered ? (
          <View>
            <View style={styles.contentRow}>{leftContent}</View>
            {/* TODO: Use left/right block measurements after migration to new architecture */}
            {isCentered ? (
              <View {...hiddenElementProps}>{rightContent}</View>
            ) : null}
          </View>
        ) : null}

        {/* Title Slot */}
        {hasTitleContent ? (
          <View
            style={[
              styles.contentRow,
              styles.expanded,
              styles[`contentAlign_${titleAlign}`],
            ]}>
            {titleContent}
          </View>
        ) : null}

        {/* Right Slot */}
        {hasRightContent || isCentered ? (
          <View style={styles.rightBlock}>
            <View style={[styles.contentRow, styles.contentAlign_right]}>
              {rightContent}
            </View>
            {isCentered ? (
              <View {...hiddenElementProps}>{leftContent}</View>
            ) : null}
          </View>
        ) : null}
      </View>

      {/* Bottom Slot */}
      {resolvedBottomSlot ? (
        <View
          style={[styles.contentRow, styles[`contentAlign_${bottomAlign}`]]}>
          {resolvedBottomSlot}
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const hiddenElementProps = {
  pointerEvents: 'none',
  accessibilityElementsHidden: true,
  importantForAccessibility: 'no-hide-descendants',
  style: { opacity: 0, height: 0 },
} as const;

const HeaderBackButton: FC<HeaderBackButtonProps> = ({
  icon = 'chevronMediumLeft',
  onPress,
  style,
  testID = 'backButton',
}) => {
  const navigation = useNavigation();

  return (
    <AnimatedCircleButton
      icon={{ name: icon }}
      onPress={onPress ?? navigation.goBack}
      testID={testID}
      containerStyle={style}
    />
  );
};

const HeaderActionButton: FC<HeaderActionButtonProps> = ({
  label,
  icon,
  onPress,
  style,
  testID = 'actionButton',
}) => {
  const styles = useThemeStyles(themeStyles);

  if (label !== undefined) {
    return (
      <TouchableOpacity
        testID={testID}
        onPress={onPress}
        style={StyleSheet.compose(styles.actionButtonWithLabel, style)}>
        <Text style={styles.actionButtonLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <Button
      testID={testID}
      onPress={onPress}
      theme="quarterlyGrey"
      style={style}
      isIconOnlyButton={true}
      renderIcon={textStyle => <Icon name={icon} size={24} style={textStyle} />}
    />
  );
};

const HeaderTitle: FC<HeaderTitleProps> = ({
  children,
  size = 'large',
  style,
  testID,
}) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <Text
      testID={testID}
      numberOfLines={1}
      style={[
        styles.title,
        size === 'small' ? styles.titleSmall : styles.titleLarge,
        style,
      ]}>
      {children}
    </Text>
  );
};

const PageContentWrapperWithOverlay: FC<PageContentWrapperProps> = ({
  children,
}) => {
  const pageLayoutProps = useHeaderWithOverlayLayout();

  if (typeof children === 'function') {
    return children(pageLayoutProps);
  }

  const { pageContainerProps } = pageLayoutProps;

  const maybeChild = React.Children.only(children);

  if (!React.isValidElement(maybeChild)) {
    return null;
  }

  const child = maybeChild as ReactElement<any>;

  const isList =
    isElementOfType(child, ScrollView) || child.props.data !== undefined;

  return React.cloneElement(
    child,
    !isList
      ? {
          ...pageContainerProps.static,
          style: StyleSheet.compose(
            child.props.style,
            pageContainerProps.static.style,
          ),
        }
      : {
          ...pageContainerProps.scrollable,
          contentContainerStyle: StyleSheet.compose(
            child.props.contentContainerStyle,
            pageContainerProps.scrollable.contentContainerStyle,
          ),
        },
  );
};

export const Header = Object.assign(HeaderComponent, {
  Title: HeaderTitle,
  BackButton: HeaderBackButton,
  ActionButton: HeaderActionButton,
  PageContentWrapperWithOverlay,
});
