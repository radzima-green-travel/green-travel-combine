import { Icon, Button } from 'components/atoms';
import { ObjectListViewMode } from 'components/types';
import { useTranslation } from 'core/hooks';
import { Text, TouchableOpacity, View } from 'react-native';

interface AddObjectsProps {
  testID?: string;
  onPress: () => void;
  viewMode?: ObjectListViewMode;
}

export const AddObjects = ({
  testID = 'AddObjects',
  onPress,
  viewMode = 'list',
}: AddObjectsProps) => {
  const { t } = useTranslation('routes');

  if (viewMode === 'list') {
    return (
      <Button
        theme="quarterly"
        testID={testID}
        onPress={onPress}
        text={t('routeDetails.common.addObjects')}
        renderIcon={textStyle => <Icon name="addLarge" style={textStyle} />}
        iconPosition="left"
        className="h-14 w-full"
      />
    );
  }

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      activeOpacity={0.8}
      className={`flex-1 items-center justify-center rounded-[20] border border-[var(--background-color-accent)] bg-quarterly`}>
      <View className="items-center gap-2">
        <Icon name="addLarge" size={32} className="text-accent" />
        <Text className="font-subheadlineBold text-center text-accent">
          {t('routeDetails.common.addObjects')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
