import { Image } from '@core/components';
import { composeTestID } from 'core/helpers/common';
import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { cn } from 'tailwind-variants';
import { RoutesImage, RoutesImages } from '../../assets/images';

interface RoutesEmptyListViewProps extends PropsWithChildren {
  testID: string;
  title: string;
  description: string;
  image: RoutesImage;
  className?: string;
}

export const RoutesEmptyListView = ({
  testID,
  title,
  description,
  image,
  children,
  className,
}: RoutesEmptyListViewProps) => {
  return (
    <View
      testID={testID}
      className={cn('flex-1 items-center justify-center px-gutter', className)}>
      <View className="absolute mt-[-1] h-1 justify-end">
        <View className="items-center justify-center">
          <View className="aspect-[calc(208/124)] w-[calc((208/375*100)%)] items-center justify-center">
            <Image
              testID={composeTestID(testID, 'image')}
              source={RoutesImages[image]}
              className="aspect-square w-full"
              contentFit="scale-down"
            />
          </View>
          <Text
            testID={composeTestID(testID, 'title')}
            className="font-title3Bold mt-4 text-center text-primary">
            {title}
          </Text>
          <Text
            testID={composeTestID(testID, 'description')}
            className="font-subheadlineRegular text-center text-secondary">
            {description}
          </Text>
          {children}
        </View>
      </View>
    </View>
  );
};
