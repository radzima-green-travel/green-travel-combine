import { memo, useContext, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'components/atoms';
import { useRouteList } from '../../../api';
import { RouteCard } from '../../../components';
import { SaveToRouteListFlowContext } from '../context';

export const ObjectRoutesSection = memo(() => {
  const { objectId, menuProps } = useContext(SaveToRouteListFlowContext);
  const { data: routes } = useRouteList();
  const { t } = useTranslation('routes');
  const [isExpanded, setIsExpanded] = useState(false);

  const objectRoutes =
    routes?.filter(route => route.objectIds.includes(objectId)) ?? [];

  if (objectRoutes.length === 0) return null;

  const collapsedLimit = 3;

  const hasMore = objectRoutes.length > collapsedLimit;
  const visibleRoutes = isExpanded
    ? objectRoutes
    : objectRoutes.slice(0, collapsedLimit);

  return (
    <View className="mt-6 gap-3 px-gutter">
      <View className="flex-row items-center">
        <Text className="font-headlineBold flex-1 text-primary">
          {t('objectRoutes.sectionTitle')}{' '}
          <Text className="text-tertiary">{objectRoutes.length}</Text>
        </Text>
        <Pressable
          onPress={menuProps.openMenu}
          className="flex-row items-center gap-1"
          hitSlop={8}>
          <Icon name="addLarge" size={20} className="text-accent" />
          <Text className="font-calloutBold text-accent">
            {t('objectRoutes.addButtonLabel')}
          </Text>
        </Pressable>
      </View>

      {visibleRoutes.map(route => (
        <RouteCard key={route.id} route={route} showMenuButton={false} />
      ))}

      {hasMore && (
        <Pressable
          onPress={() => setIsExpanded(prev => !prev)}
          className="items-center">
          <Text className="font-footnoteBold text-accent">
            {isExpanded
              ? t('objectRoutes.showLessButtonLabel')
              : t('objectRoutes.showMoreButtonLabel')}
          </Text>
        </Pressable>
      )}
    </View>
  );
});
