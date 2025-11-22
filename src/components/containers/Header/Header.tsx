import React, {
  ComponentProps,
  Fragment,
  useLayoutEffect,
  type ComponentType,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import { AnimatedCircleButton } from 'molecules';
import {
  StyleProp,
  View,
  ViewStyle,
  Text,
  TextStyle,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useStatusBar, useThemeStyles } from 'core/hooks';
import { themeStyles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { Button, Icon } from 'atoms';
import type { IconName } from '../../atoms/Icon/types';
import type { ButtonThemes } from '../../atoms/Button/types';
import { HEADER_OVERLAY_OFFSET } from './constants';
import type { SystemBarStyle } from 'react-native-edge-to-edge';

export type HeaderRenderProps = {
  canGoBack: boolean;
  navigation: NavigationProp<any>;
};

type HeaderProps = {
  overlaysContent?: boolean;
  replacesDefaultHeader?: boolean;
  style?: StyleProp<ViewStyle>;
  contentAlignment?: ContentAlignment;
  statusbarStyle?: SystemBarStyle;
} & (
  | {
      title?: never;
      canGoBack?: never;
      children?: ReactNode | ((props: HeaderRenderProps) => ReactNode);
    }
  | {
      title: ReactNode;
      canGoBack?: boolean;
      children?: never;
    }
);

const HeaderComponent = ({
  children,
  overlaysContent = true,
  replacesDefaultHeader = true,
  title,
  canGoBack,
  style,
  contentAlignment = 'left',
  statusbarStyle = 'auto',
}: HeaderProps) => {
  const navigation = useNavigation<any>();

  const { topBlock, bottomBlock, leftBlock, rightBlock, contentBlock } =
    useHeaderBlocks(children, {
      title,
      canGoBack,
      navigation,
      contentAlignment,
    });

  useLayoutEffect(() => {
    if (replacesDefaultHeader) {
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [replacesDefaultHeader, navigation]);

  useStatusBar({ style: statusbarStyle });

  const styles = useThemeStyles(themeStyles);

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, overlaysContent && styles.overlay, style]}>
      {topBlock}
      <View style={styles.block}>
        {leftBlock}
        {contentBlock}
        {rightBlock}
      </View>
      {bottomBlock}
    </SafeAreaView>
  );
};

type HeaderBlocks = Record<
  'topBlock' | 'bottomBlock' | 'leftBlock' | 'rightBlock' | 'contentBlock',
  ReactElement | null
>;

const useHeaderBlocks = (
  children: ReactNode | ((props: HeaderRenderProps) => ReactNode) | undefined,
  {
    title,
    canGoBack: canGoBackProp,
    navigation,
    contentAlignment,
  }: {
    navigation: NavigationProp<any>;
    title: ReactNode | undefined;
    canGoBack: boolean | undefined;
    contentAlignment?: ContentAlignment;
  },
): HeaderBlocks => {
  return (() => {
    const canGoBack = canGoBackProp ?? navigation.getState()?.index! > 0;

    if (children === undefined) {
      return {
        topBlock: null,
        bottomBlock: null,
        leftBlock: canGoBack ? (
          <BackButton onPress={navigation.goBack} />
        ) : null,
        rightBlock: null,
        contentBlock: (
          <Title size={canGoBack ? 'small' : 'large'}>{title}</Title>
        ),
      };
    }

    // Handle render prop pattern
    let childrenArray = React.Children.toArray(
      typeof children === 'function'
        ? children({ canGoBack, navigation })
        : children,
    );

    if (isElementOfType(childrenArray[0], Fragment)) {
      childrenArray = React.Children.toArray(childrenArray[0].props.children);
    }

    const contentCentered = contentAlignment === 'center';

    const blocks: HeaderBlocks = {
      topBlock: null,
      bottomBlock: null,
      leftBlock: contentCentered ? <LeftBlock expanded /> : null,
      rightBlock: contentCentered ? <RightBlock expanded /> : null,
      contentBlock: null,
    };

    childrenArray.forEach(child => {
      if (!React.isValidElement(child)) {
        return;
      }

      switch (true) {
        case isElementOfType(child, TopBlock):
          blocks.topBlock = child;
          break;
        case isElementOfType(child, BottomBlock):
          blocks.bottomBlock = child;
          break;
        case isElementOfType(child, LeftBlock):
          blocks.leftBlock = contentCentered
            ? React.cloneElement(child, {
                expanded: true,
              })
            : child;
          break;
        case isElementOfType(child, RightBlock):
          blocks.rightBlock = contentCentered
            ? React.cloneElement(child, {
                expanded: true,
              })
            : child;
          break;
        case isElementOfType(child, ContentBlock):
          blocks.contentBlock = React.cloneElement(child, {
            contentAlignment: contentAlignment,
          });
          break;
        case isElementOfType(child, Title):
          blocks.contentBlock = (
            <ContentBlock contentAlignment={contentAlignment}>
              {React.cloneElement(child, {
                size: blocks.leftBlock?.type === BackButton ? 'small' : 'large',
              })}
            </ContentBlock>
          );
          break;
        case isElementOfType(child, BackButton):
          blocks.leftBlock = (
            <LeftBlock expanded={contentCentered}>
              {React.cloneElement(child, {
                onPress: child.props.onPress ?? navigation.goBack,
              })}
            </LeftBlock>
          );

          break;
      }
    });

    return blocks;
  })();
};

type ContentAlignment = 'left' | 'center' | 'right';

type BlockProps = PropsWithChildren<{
  expanded?: boolean;
  contentAlignment?: ContentAlignment;
  style?: StyleProp<ViewStyle>;
}>;

function blockFactory(name: string, defaulProps: Partial<BlockProps> = {}) {
  const Block = function ({
    children,
    style,
    expanded = defaulProps.expanded ?? false,
    contentAlignment = defaulProps.contentAlignment ?? 'left',
  }: BlockProps) {
    const styles = useThemeStyles(themeStyles);

    if (!expanded && (!children || !React.Children.count(children))) {
      return null;
    }

    return (
      <View
        style={[
          styles.block,
          expanded && styles.expanded,
          contentAlignment && styles[`contentAlign_${contentAlignment}`],
          defaulProps.style,
          style,
        ]}>
        {children}
      </View>
    );
  };

  Object.defineProperty(Block, 'name', { value: name, writable: false });

  return Block;
}

const TopBlock = blockFactory('TopBlock');
const BottomBlock = blockFactory('BottomBlock');

const LeftBlock = blockFactory('LeftBlock');
const RightBlock = blockFactory('RightBlock', {
  contentAlignment: 'right',
  style: { marginLeft: 'auto' },
});
const ContentBlock = blockFactory('ContentBlock', { expanded: true });

const isElementOfType = <const T extends ComponentType<any>>(
  element: ReactNode,
  type: T,
): element is ReactElement<ComponentProps<T>, T> => {
  if (!React.isValidElement(element)) {
    return false;
  }
  return element.type === type || (element.type as any).name === type.name;
};

interface ActionButtonProps {
  testID: string;
  onPress?: () => void;
  icon: IconName;
  theme?: ButtonThemes;
  style?: StyleProp<ViewStyle>;
  size?: 'small' | 'large';
}

export const ActionButton = ({
  testID,
  onPress,
  icon,
  theme = 'quarterlyGrey',
  style,
  size = 'large',
}: ActionButtonProps) => {
  if (size === 'small') {
    return (
      <AnimatedCircleButton
        icon={{ name: icon }}
        onPress={onPress}
        testID={testID}
        containerStyle={style}
      />
    );
  }

  return (
    <Button
      testID={testID}
      isIconOnlyButton
      renderIcon={textStyle => <Icon name={icon} size={24} style={textStyle} />}
      onPress={onPress}
      theme={theme}
      style={style}
    />
  );
};

interface BackButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const BackButton = ({ onPress, style }: BackButtonProps) => {
  return (
    <ActionButton
      testID="backButton"
      icon="chevronMediumLeft"
      size="small"
      onPress={onPress}
      style={style}
    />
  );
};

interface TitleProps extends PropsWithChildren {
  size?: 'small' | 'large';
  style?: StyleProp<TextStyle>;
}

const Title = ({ children, size = 'large', style }: TitleProps) => {
  const styles = useThemeStyles(themeStyles);

  return (
    <Text
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

const PageContentWithOverlay = ({ children }: PropsWithChildren) => {
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
          style: StyleSheet.compose(child.props.style, {
            paddingTop: HEADER_OVERLAY_OFFSET,
          }),
        }
      : {
          contentContainerStyle: StyleSheet.compose(
            child.props.contentContainerStyle,
            {
              paddingTop: HEADER_OVERLAY_OFFSET,
            },
          ),
          showsVerticalScrollIndicator: false,
        },
  );
};

export const Header = Object.assign(HeaderComponent, {
  BackButton,
  Title,
  LeftBlock,
  RightBlock,
  ContentBlock,
  TopBlock,
  BottomBlock,
  ActionButton,
  PageContentWithOverlay,
  overlayOffset: HEADER_OVERLAY_OFFSET,
});
