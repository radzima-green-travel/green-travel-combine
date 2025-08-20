import {LayoutRectangle, findNodeHandle} from 'react-native';

export const measureInWindow = (element: any): Promise<LayoutRectangle> => {
  return new Promise(resolve => {
    try {
      element.measureInWindow((x = 0, y = 0, width = 0, height = 0) => {
        resolve({x, y, width, height});
      });
    } catch (e) {
      resolve(fallbackMeasurements);
    }
  });
};

export const measureLayout = (
  element: any,
  relativeTo: any,
): Promise<LayoutRectangle> => {
  return new Promise(resolve => {
    try {
      element.measureLayout(
        findNodeHandle(relativeTo),
        (x = 0, y = 0, width = 0, height = 0) => {
          resolve({x, y, width, height});
        },
      );
    } catch (e) {
      resolve(fallbackMeasurements);
    }
  });
};

const fallbackMeasurements: LayoutRectangle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

import {RefObject, useCallback, useRef} from 'react';
import {ScrollView, View} from 'react-native';

export const useScrollToElement = ({
  scrollViewRef: scrollViewRefProp,
}: {
  scrollViewRef?: RefObject<ScrollView>;
} = {}) => {
  const defaultRef = useRef<ScrollView>(null);

  const scrollViewRef = scrollViewRefProp || defaultRef;

  const elements = useRef(new Map<string | number, View>());

  const setElementRef = useCallback(
    (id: string | number) => (ref: View) => {
      if (ref) {
        elements.current.set(id, ref);
      } else {
        elements.current.delete(id);
      }
    },
    [],
  );

  const scrollToElement = useCallback(
    async (id: string | number, options?: Partial<Options>) => {
      const {offset, elementPosition, scrollPosition, animated} = {
        ...defaultOptions,
        ...options,
      };

      const [
        {width: scrollViewHeight},
        {x: elementTopY, width: elementHeight},
      ] = await Promise.all([
        measureInWindow(scrollViewRef.current),
        measureLayout(elements.current.get(id), scrollViewRef.current),
      ]);

      const elementY = {
        top: elementTopY,
        bottom: elementTopY + elementHeight,
        center: elementTopY + elementHeight / 2,
      };

      const scrollY = {
        top: 0,
        bottom: scrollViewHeight,
        center: scrollViewHeight / 2,
      };

      const scrollValue = elementY[elementPosition] - scrollY[scrollPosition];

      scrollViewRef.current?.scrollTo({
        x: scrollValue + offset,
        animated,
      });
    },
    [scrollViewRef],
  );

  return {
    scrollViewRef,
    setElementRef,
    scrollToElement,
  };
};

type Position = 'top' | 'bottom' | 'center';

type Options = {
  elementPosition: Position;
  scrollPosition: Position;
  offset: number;
  animated: boolean;
};

const defaultOptions = {
  elementPosition: 'top',
  scrollPosition: 'center',
  offset: 0,
  animated: true,
};

export type ScrollToElementProps = ReturnType<typeof useScrollToElement>;
