import { COLORS } from 'assets';
import { Icon } from 'components/atoms';
import { createThemeStyles } from 'core/helpers/styles';
import { useThemeStyles, useTranslation } from 'core/hooks';
import {
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';

const tileStyles = createThemeStyles({
  container: {
    borderWidth: 1,
    borderColor: {
      light: COLORS.light.background.accent,
      dark: COLORS.dark.background.accent,
    },
  },
});

interface AddObjectsCardTileProps {
  testID?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const AddObjectsCardTile = ({
  testID = 'addObjectsCardTile',
  onPress,
  style,
}: AddObjectsCardTileProps) => {
  const { t } = useTranslation('routes');
  const styles = useThemeStyles(tileStyles);

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, style]}
      className="flex-1 items-center justify-center rounded-[20] bg-quarterly">
      <View className="items-center gap-2">
        <Icon name="addLarge" size={32} className="text-accent" />
        <Text className="font-subheadlineBold text-center text-accent">
          {t('routeDetails.common.addObjects')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
