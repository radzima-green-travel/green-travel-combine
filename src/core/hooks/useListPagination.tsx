import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from 'assets';

interface ListPaginationProps {
  loadMore: () => void;
  isLoading: boolean;
  hasMoreToLoad: boolean;
}

const styles = StyleSheet.create({
  indicator: {
    marginBottom: 32,
  },
});

export const useListPagination = ({
  loadMore,
  isLoading,
  hasMoreToLoad,
}: ListPaginationProps) => {
  const loadingMore = useRef(false);

  const onEndReached = useCallback(() => {
    if (hasMoreToLoad && !loadingMore.current) {
      loadingMore.current = true;
      loadMore();
    }
  }, [hasMoreToLoad, loadMore]);

  const ListFooterComponent = useMemo(() => {
    return isLoading ? (
      <ActivityIndicator
        style={styles.indicator}
        color={COLORS.forestGreen}
        size={'small'}
      />
    ) : null;
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      loadingMore.current = false;
    }
  }, [isLoading]);

  return useMemo(
    () => ({
      onEndReachedThreshold: 0.75,
      initialNumToRender: 10,
      scrollEventThrottle: 16,
      maxToRenderPerBatch: 10,
      ListFooterComponent,
      onEndReached,
    }),
    [ListFooterComponent, onEndReached],
  );
};
