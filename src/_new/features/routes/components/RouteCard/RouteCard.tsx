import { View, Text, Pressable } from 'react-native';
import { RouteModel } from '../../model';
import { Icon } from 'components/atoms';
import { useTranslation } from 'react-i18next';

interface RouteCardProps {
  route: RouteModel.Route;
  onPress: (route: RouteModel.Route) => void;
}

export const RouteCard = ({ route, onPress }: RouteCardProps) => {
  const { t } = useTranslation('routes');

  return (
    <Pressable
      onPress={() => onPress(route)}
      className="bg-primary flex-row items-center gap-3 rounded-[12] px-4 py-2">
      <View className="bg-quarterly h-10 w-10 items-center justify-center rounded-[12]">
        <Icon
          name="routeSimple"
          size={24}
          color="accent"
          className="text-accent"
        />
      </View>
      <View className="flex-1">
        <Text className="font-subheadlineBold text-primary">{route.name}</Text>
        <Text className="font-caption1Regular text-secondary mt-1">
          {t(
            // TODO: Bump the prehistoric version of i18next to 21.0.0, preferably latest
            route.objectIds.length === 1
              ? 'common.routeObjectCount_one'
              : 'common.routeObjectCount_other',
            { amount: route.objectIds.length },
          )}
        </Text>
      </View>
      <Icon name="more" size={24} className="text-secondary" />
    </Pressable>
  );
};
