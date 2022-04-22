import {
  StackCardStyleInterpolator,
  StackNavigationOptions,
} from '@react-navigation/stack';

const fadeInterpolation: StackCardStyleInterpolator = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const config = {
  animation: 'timing',
  config: {
    duration: 200,
  },
};

export const Fade = {
  cardStyleInterpolator: fadeInterpolation,
  transitionSpec: {
    open: config,
    close: config,
  } as StackNavigationOptions['transitionSpec'],
};
