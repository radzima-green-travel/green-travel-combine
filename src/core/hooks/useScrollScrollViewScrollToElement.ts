import { RefObject, useCallback, useRef } from 'react';
import { ScrollView, View } from 'react-native';

export function useScrollScrollViewScrollToElement<
  El = View,
  Scroll = ScrollView,
>(offset = 0) {
  const scrollRef = useRef<Scroll>(null);
  const elementRef = useRef<El>(null);

  const scrollToElement = useCallback(() => {
    if (scrollRef.current) {
      (elementRef as RefObject<View>).current?.measureLayout(
        // @ts-ignore
        scrollRef.current,
        (_, top) => {
          (scrollRef as RefObject<ScrollView>).current?.scrollTo({
            y: top - offset,
            animated: true,
          });
        },
        e => {
          console.log('error', e);
        },
      );
    }
  }, [offset]);

  return {
    scrollRef,
    elementRef,
    scrollToElement,
  };
}
