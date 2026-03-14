import { Icon } from 'atoms';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

export const CreateRouteMenuItem = ({ onPress }: { onPress: () => void }) => {
  const { t } = useTranslation('routes');
  return (
    <Pressable
      className="flex-row items-center gap-3 px-gutter py-3"
      onPress={onPress}>
      <View className="h-10 w-10 items-center justify-center rounded-[12] bg-quarterly">
        <Icon name="addRoute" size={24} className="text-accent" />
      </View>
      <Text className="font-subheadlineRegular flex-1 text-primary">
        {t('saveToRouteList.createNewRoute')}
      </Text>
    </Pressable>
  );
};
