import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from 'atoms';
import { Header } from 'components/containers';
import { SuspenseView } from 'components/molecules';
import { RenameRouteForm } from '../RenameRouteForm';
import { useEditRoute } from './hooks/useEditRoute';
import { DraggableItem } from './components/DraggableItem';
import { GhostItem } from './components/GhostItem';
import { DropIndicator } from './components/DropIndicator';
import { ITEM_HEIGHT, LIST_PADDING_TOP } from './constants';

function getDisplayIndex(
  originalIndex: number,
  fromIndex: number,
  iAt: number,
): number {
  if (originalIndex === fromIndex) return iAt;
  const ri = originalIndex > fromIndex ? originalIndex - 1 : originalIndex;
  return ri < iAt ? ri : ri + 1;
}

export function EditRouteScreen() {
  const {
    id,
    routeName,
    orderedObjects,
    orderedObjectIds,
    selectedIds,
    isSelectionMode,
    loading,
    renameMenuProps,
    t,
    handleDone,
    handleSelectAll,
    handleCancelSelection,
    handleToggleSelect,
    handleRemoveSelected,
    handleReorder,
    handleRenamePress,
  } = useEditRoute();

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [insertAt, setInsertAt] = useState(0);
  const insertAtRef = useRef(0);

  const ghostAbsY = useSharedValue(0);
  const ghostOffsetX = useSharedValue(0);
  const ghostScale = useSharedValue(1);
  const containerAbsY = useRef(0);
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);

  const draggingIdRef = useRef<string | null>(null);
  const orderedObjectIdsRef = useRef(orderedObjectIds);
  orderedObjectIdsRef.current = orderedObjectIds;

  const draggingItem = draggingId
    ? (orderedObjects.find(o => o.id === draggingId) ?? null)
    : null;

  const fromIndexRef = useRef(-1);

  const startDrag = useCallback(
    (itemId: string, absY: number) => {
      const fi = orderedObjectIdsRef.current.indexOf(itemId);
      draggingIdRef.current = itemId;
      fromIndexRef.current = fi;
      insertAtRef.current = fi;
      setInsertAt(fi);

      ghostAbsY.value = absY;
      ghostOffsetX.value = withSpring(Dimensions.get('window').width / 3, {
        damping: 14,
        stiffness: 280,
      });
      ghostScale.value = withSpring(1.06, { damping: 12, stiffness: 260 });

      setDraggingId(itemId);
      setIsScrollDisabled(true);
    },
    [ghostAbsY, ghostOffsetX, ghostScale],
  );

  const moveDrag = useCallback(
    (absY: number) => {
      ghostAbsY.value = absY;
      if (!draggingIdRef.current) return;

      const ids = orderedObjectIdsRef.current;
      const contentY = absY - containerAbsY.current - LIST_PADDING_TOP;
      const newInsertAt = Math.max(
        0,
        Math.min(ids.length - 1, Math.round(contentY / ITEM_HEIGHT)),
      );

      if (newInsertAt !== insertAtRef.current) {
        insertAtRef.current = newInsertAt;
        setInsertAt(newInsertAt);
      }
    },
    [ghostAbsY],
  );

  const endDrag = useCallback(() => {
    const currentDraggingId = draggingIdRef.current;
    if (currentDraggingId) {
      const ids = orderedObjectIdsRef.current;
      const iAt = insertAtRef.current;

      const newOrder = ids.filter(oid => oid !== currentDraggingId);
      newOrder.splice(iAt, 0, currentDraggingId);

      const changed = newOrder.some((oid, i) => oid !== ids[i]);
      if (changed) {
        handleReorder(newOrder);
      }
    }

    ghostOffsetX.value = withTiming(0, { duration: 150 });
    ghostScale.value = withSpring(1, { damping: 14, stiffness: 280 });
    draggingIdRef.current = null;
    fromIndexRef.current = -1;

    setDraggingId(null);
    setIsScrollDisabled(false);
  }, [handleReorder, ghostOffsetX, ghostScale]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (isSelectionMode) {
      navigation.setOptions({
        customOptions: {
          title: t('editRoute.title'),
          titleAlign: 'center',
          titleSize: 'small',
          backButtonHidden: true,
          leftSlot: (
            <Header.ActionButton
              label={t('editRoute.selectAll')}
              onPress={handleSelectAll}
            />
          ),
          rightActions: [
            { label: t('editRoute.cancel'), action: handleCancelSelection },
          ],
        },
      });
    } else {
      navigation.setOptions({
        customOptions: {
          title: t('editRoute.title'),
          titleAlign: 'center',
          titleSize: 'small',
          rightActions: [{ label: t('editRoute.done'), action: handleDone }],
        },
      });
    }
  }, [
    isSelectionMode,
    t,
    handleSelectAll,
    handleCancelSelection,
    handleDone,
    navigation,
  ]);

  const totalItems = orderedObjects.length;
  const fromIndex = fromIndexRef.current;

  if (loading && !totalItems) {
    return <SuspenseView testID="editRouteObjectsSuspense" loading />;
  }

  return (
    <View className="flex-1 bg-secondary pt-6">
      <TouchableOpacity
        className="flex-row items-center px-4 pt-6 pb-4"
        onPress={handleRenamePress}>
        <Text
          className="font-title3Bold mr-2 shrink text-primary"
          numberOfLines={1}>
          {routeName}
        </Text>
        <Icon name="pen" size={24} className="text-secondary" />
      </TouchableOpacity>

      <View
        className="relative flex-1"
        ref={(ref: View | null) => {
          if (ref) {
            ref.measure((_x, _y, _width, _height, _pageX, pageY) => {
              containerAbsY.current = pageY;
            });
          }
        }}>
        <ScrollView
          scrollEnabled={!isScrollDisabled}
          className="flex-1"
          contentContainerStyle={{
            paddingTop: LIST_PADDING_TOP,
            paddingBottom: isSelectionMode ? 88 : 8,
          }}>
          {orderedObjects.map((item, index) => {
            const displayIndex = draggingId
              ? getDisplayIndex(index, fromIndex, insertAt)
              : index;
            return (
              <DraggableItem
                key={item.id}
                item={item}
                displayIndex={displayIndex}
                totalItems={totalItems}
                isSelected={selectedIds.has(item.id)}
                onToggleSelect={handleToggleSelect}
                onDragStart={startDrag}
                onDragMove={moveDrag}
                onDragEnd={endDrag}
                isDragging={item.id === draggingId}
              />
            );
          })}

          {draggingId && <DropIndicator insertAt={insertAt} />}
        </ScrollView>

        {draggingId && (
          <GhostItem
            item={draggingItem}
            displayIndex={insertAt}
            ghostAbsY={ghostAbsY}
            ghostOffsetX={ghostOffsetX}
            ghostScale={ghostScale}
            containerAbsY={containerAbsY.current}
          />
        )}
      </View>

      {isSelectionMode && (
        <View className="absolute right-0 bottom-0 left-0 px-4 pb-6">
          <Button
            testID="removeSelectedButton"
            text={t('editRoute.remove', { count: selectedIds.size })}
            onPress={handleRemoveSelected}
            theme="primary"
            className="w-full"
          />
        </View>
      )}

      <RenameRouteForm
        key={routeName}
        menuProps={renameMenuProps}
        routeName={routeName}
        routeId={id}
      />
    </View>
  );
}
