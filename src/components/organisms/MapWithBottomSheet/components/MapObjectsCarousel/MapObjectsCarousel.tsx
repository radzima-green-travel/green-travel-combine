import React, {memo} from 'react';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {ObjectCardNew} from 'molecules';
import {SearchObject} from 'core/types';
import {styles} from './styles';

interface MapObjectsCarouselProps {
  objects: SearchObject[];
  carouselRef: React.RefObject<ICarouselInstance>;
  onCarouselSnap: (index: number) => void;
  onObjectPress: (objectId: SearchObject) => void;
}

export const MapObjectsCarousel: React.FC<MapObjectsCarouselProps> = memo(
  ({objects, carouselRef, onCarouselSnap, onObjectPress}) => {
    if (!objects.length) {
      return null;
    }

    const renderContent = () => {
      if (objects.length === 1) {
        const object = objects[0];
        return (
          <ObjectCardNew
            testID="card"
            item={object}
            key={object.id}
            name={object.name}
            categoryName={object.category.name}
            id={object.id}
            cover={object.cover}
            blurhash={object.blurhash}
            onPress={() => {
              onObjectPress(object);
            }}
            style={[styles.card, styles.singleCard]}
          />
        );
      }

      return (
        <Carousel
          ref={carouselRef}
          data={objects}
          height={168}
          pagingEnabled={true}
          loop={false}
          snapEnabled={true}
          onSnapToItem={onCarouselSnap}
          width={200}
          containerStyle={styles.itemContainer}
          style={styles.carousel}
          mode="parallax"
          modeConfig={{
            parallaxAdjacentItemScale: 0.9,
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: -5,
          }}
          renderItem={({item: object}) => {
            return (
              <ObjectCardNew
                testID="card"
                item={object}
                key={object.id}
                name={object.name}
                categoryName={object.category.name}
                id={object.id}
                cover={object.cover}
                blurhash={object.blurhash}
                onPress={() => {
                  onObjectPress(object);
                }}
                style={styles.card}
              />
            );
          }}
        />
      );
    };
    return (
      <Animated.View
        key={objects.map(object => object.id).join('-')}
        entering={FadeIn}
        exiting={FadeOut}
        id="carousel-component">
        {renderContent()}
      </Animated.View>
    );
  },
);
