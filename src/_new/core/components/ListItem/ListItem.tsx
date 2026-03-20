import { Icon } from 'components/atoms';
import type { ReactNode } from 'react';
import {
  Pressable,
  type StyleProp,
  Text,
  type TextProps,
  View,
  type ViewStyle,
} from 'react-native';
import { cn } from 'tailwind-variants';
import type { IconsNames } from '../../../../components/atoms/Icon';
import { withUniwind } from 'uniwind';

export interface ListItemProps {
  caption?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  onPress?: () => void;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

// TODO: Clarify and add "variants" - "edit", "disabled", "list"
// Add more components - "list points", "counter", "button", "dropdown"
const ListItemComponent = ({
  caption,
  title,
  subtitle,
  onPress,
  leadingContent,
  trailingContent,
  style,
}: ListItemProps) => {
  const content = (
    <>
      {typeof caption === 'string' ? (
        <ListItemCaption>{caption}</ListItemCaption>
      ) : (
        caption
      )}
      {typeof title === 'string' ? (
        <ListItemTitle>{title}</ListItemTitle>
      ) : (
        title
      )}
      {typeof subtitle === 'string' ? (
        <ListItemCaption>{subtitle}</ListItemCaption>
      ) : (
        subtitle
      )}
    </>
  );

  return (
    <Pressable
      className="flex-row items-center gap-3 rounded-xl bg-primary px-gutter py-2"
      style={style}
      onPress={onPress}>
      {leadingContent}
      <View className="flex-1 gap-0.5">{content}</View>
      {trailingContent}
    </Pressable>
  );
};

interface ListItemTitleProps extends TextProps {
  fontVariant?: 'regular' | 'bold';
}

const ListItemTitle = ({
  fontVariant = 'regular',
  className,
  ...props
}: ListItemTitleProps) => {
  return (
    <Text
      className={cn(
        fontVariant === 'regular' ? 'font-bodyRegular' : 'font-bodyBold',
        'text-primary',
        className,
      )}
      numberOfLines={2}
      {...props}
    />
  );
};

const ListItemCaption = ({ className, ...props }: TextProps) => {
  return (
    <Text
      className={cn('font-caption1Regular text-secondary', className)}
      numberOfLines={1}
      {...props}
    />
  );
};

interface ListItemSubjectIconProps {
  name: IconsNames;
  size?: number;
  className?: string;
  iconClassName?: string;
}

/**
 * Leading icon that represents the subject of the list item content.
 *
 * Use for content-identifying icons like a route icon or a category icon.
 */
export const ListItemSubjectIcon = ({
  name,
  size = 24,
  className,
  iconClassName,
}: ListItemSubjectIconProps) => {
  return (
    <View
      className={cn(
        'size-10 items-center justify-center rounded-xl bg-quarterly',
        className,
      )}>
      <Icon
        name={name}
        size={size}
        className={cn('text-accent', iconClassName)}
      />
    </View>
  );
};

interface ListItemActionIconProps {
  name: IconsNames;
  size?: number;
  className?: string;
}

/**
 * Secondary icon used for actions around the list item.
 *
 * Use for action-oriented icons like chevron, delete, or drag handles.
 */
export const ListItemActionIcon = ({
  name,
  size = 24,
  className,
}: ListItemActionIconProps) => {
  return (
    <Icon name={name} size={size} className={cn('text-tertiary', className)} />
  );
};

export const ListItem = Object.assign(withUniwind(ListItemComponent), {
  SubjectIcon: ListItemSubjectIcon,
  ActionIcon: ListItemActionIcon,
  Title: ListItemTitle,
  Subtitle: ListItemCaption,
});
