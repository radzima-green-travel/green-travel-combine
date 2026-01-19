import { View, Text, Pressable } from 'react-native';
import { Route } from '../../model';
import { Icon } from 'components/atoms';
import { useTranslation } from 'react-i18next';

interface RouteCardProps {
  route: Route.Route;
  onPress: (route: Route.Route) => void;
}

export const RouteCard = ({ route, onPress }: RouteCardProps) => {
  const { t } = useTranslation('routes');

  return (
    <Pressable
      onPress={() => onPress(route)}
      className="flex-row items-center gap-3 rounded-[12] bg-primary px-4 py-2">
      <View className="h-10 w-10 items-center justify-center rounded-[12] bg-quarterly">
        <Icon
          name="routeSimple"
          size={24}
          color="accent"
          className="text-accent"
        />
      </View>
      <View className="flex-1">
        <Text className="font-subheadlineBold text-primary">{route.name}</Text>
        <Text className="font-caption1Regular mt-1 text-secondary">
          {t('common.routeObjectCount', { amount: route.objectIds.length })}
        </Text>
      </View>
      <Icon name="more" size={24} className="text-secondary" />
    </Pressable>
  );
};
