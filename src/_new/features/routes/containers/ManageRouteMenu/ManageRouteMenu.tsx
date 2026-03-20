import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Portal } from '@gorhom/portal';
import { BottomMenu, Icon } from 'atoms';
import { useBottomMenu, useColorScheme, useTranslation } from 'core/hooks';
import { FullWindowOverlay } from 'react-native-screens';
import { isIOS } from 'services/PlatformService';
import { COLORS } from 'assets';

export const ManageRouteMenu = ({
  menuProps,
  onEdit,
  onDelete,
}: {
  menuProps: ReturnType<typeof useBottomMenu>;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const { t } = useTranslation('routes');
  const colorScheme = useColorScheme();
  const negativeColor =
    colorScheme === 'dark'
      ? COLORS.dark.text.negative
      : COLORS.light.text.negative;

  const menu = (
    <BottomMenu
      testID="manageRouteMenu"
      withBackdrop
      header={{ title: t('manageRoute.title') }}
      onBackdropPress={menuProps.closeMenu}
      {...menuProps}>
      <View className="px-gutter pb-6">
        <TouchableOpacity
          className="flex-row items-center gap-3 py-4"
          onPress={() => {
            menuProps.closeMenu();
            onEdit();
          }}>
          <Icon name="pen" size={20} className="text-primary" />
          <Text className="font-body1Regular text-primary">
            {t('manageRoute.edit')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center gap-3 py-4"
          onPress={() => {
            menuProps.closeMenu();
            onDelete();
          }}>
          <Icon name="delete" size={20} color={negativeColor} />
          <Text className="font-body1Regular text-negative">
            {t('manageRoute.delete')}
          </Text>
        </TouchableOpacity>
      </View>
    </BottomMenu>
  );

  return (
    <Portal>
      {isIOS ? (
        <FullWindowOverlay>
          <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
            {menu}
          </View>
        </FullWindowOverlay>
      ) : (
        menu
      )}
    </Portal>
  );
};
