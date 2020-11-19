import React from 'react';
import {ScrollView, Image, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {TextElemets, Button} from 'atoms';
import {
  PlaceDetailsImageSlider,
  RouteMetrics,
  RouteDetailsBikeRental,
} from 'molecules';
const image = require('../PlaceDetails/mockImage.jpg');

import {styles} from './styles';

const mockData = {
  about:
    'Маршрут ведет через самые живописные места рекреационной зоны Беловежской пущи включая следующие точки осмотра:',
  routePoints: [
    {
      title: 'Красный дуб',
      description:
        'Очень красивый, но небезопасный пришелец из Северной Америки. В Беловежье дуб появился в 20 – 30-х годах минувшего века, его высаживали около лесничеств, как декоративное дерево.',
    },
    {
      title: 'Береза с «Головой зубра»',
      description:
        'Большие наросты на стволах деревьев называются капами. Кап образуется, когда в живую ткань стволов или ветвей внедряются какие-то инородные организмы. Чаще всего в этой роли выступают грибы. На березах капы могут быть особенно большими: иногда их размеры вдвое превышают толщину ствола!',
    },
    {
      title: 'Дуб-«отшельник»',
      description:
        'Когда-то на этом месте простиралось болото. Дуб, который вырос на его окраине, запечатлел в себе прежний ландшафт. Дерево необычно для леса: его кряжистый силуэт характерен для дубов, растущих на открытом пространстве.',
    },
    {
      title: 'Болото «Татарское багно»',
      description:
        '«Багном» в Беларуси и Польше называют топкие, малопроходимые болота. Летописи свидетельствуют, что во времена великих татаромонгольских нашествий отряды кочевников добрались и до Беловежской пущи.',
    },
    {
      title: 'Урочище «Турлюй»',
      description:
        'Вскоре после I Мировой войны в пуще случилось несколько крупных пожаров. Один из них полностью уничтожил это урочище. В начале 30-х годов польские лесоводы, бывшие тогда хозяевами беловежского края, засадили огромное черное пятно пожарища саженцами сосны.',
    },
    {
      title: 'Атака короеда',
      description:
        'У великой Беловежской пущи есть давний враг. Речь идет о насекомом, именуемом «короед-типограф». Снижение уровня грунтовых вод, случившееся в результате необдуманной мелиорации 60-х годов прошлого века, серьезно повлияло на природный иммунитет деревьев.',
    },
    {
      title: 'Дубы 30-х годов',
      description:
        'Сплошные вырубки времен I Мировой войны, а также 20-х годов минувшего столетия были самыми крупными лесозаготовками во всей истории Беловежской пущи. К счастью польские власти, распоряжавшиеся ей до 1939 года, стремились смягчить ущерб от промышленной эксплуатации. На месте вырубок высаживались саженцы сосны и дуба.',
    },
  ],
};

export const RouteDetailsFull = () => {
  const {t} = useTranslation('route-details');

  return (
    <ScrollView style={styles.container}>
      <PlaceDetailsImageSlider images={[image, image, image, image]} />
      <TextElemets.H1>{t('routeName')}</TextElemets.H1>
      <RouteMetrics containerStyle={styles.metricsContainer} />
      <Button label={t('howToGetThere')} />
      <RouteDetailsBikeRental />
      <TextElemets.H1>{t('aboutRoute')}</TextElemets.H1>
      <TextElemets.H3 style={styles.aboutText}>{mockData.about}</TextElemets.H3>
      <Image source={image} style={styles.image} />
      {mockData.routePoints.map(({title, description}, index) => (
        <View key={title} style={styles.pointsListContainer}>
          <TextElemets.H1>{`${index + 1}.${title}`}</TextElemets.H1>
          <TextElemets.H3>{description}</TextElemets.H3>
        </View>
      ))}
      <Button type="outline" label={t('showRoute')} />
    </ScrollView>
  );
};
