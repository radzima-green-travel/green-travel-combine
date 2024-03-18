// import React from 'react';

// import {View} from 'react-native';
// import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

// import {
//   useSharedValue,
//   withTiming,
//   Easing,
//   runOnJS,
// } from 'react-native-reanimated';
// import * as SplashScreen from 'expo-splash-screen';
// import {themeStyles} from './styles';
// import {useColorScheme, useThemeStyles} from '../../core/hooks';

// interface IProps {
//   onAnimationEnd?: () => void;
//   onFadeStart?: () => void;
// }

// const logoSrc = require('../../assets/bootsplash/bootsplash_logo.png');
// const darkLogoSrc = require('../../assets/bootsplash/bootsplash_logo_dark.png');
// const manifest = require('../../assets/bootsplash/bootsplash_manifest.json');

// export const Splash = ({onAnimationEnd, onFadeStart}: IProps) => {
//   const opacity = useSharedValue(1);
//   const animatedValue = useSharedValue(0);
//   const theme = useColorScheme();
//   const styles = useThemeStyles(themeStyles);
//   const {container, logo} = RNBootSplash.useHideAnimation({
//     manifest: {
//       ...manifest,
//       background:
//         theme === 'light' ? manifest.background : manifest.darkBackground,
//       darkBackground: undefined,
//     },
//     logo: theme === 'light' ? logoSrc : darkLogoSrc,
//     animate: () => {
//       animatedValue.value = withTiming(
//         1,
//         {
//           duration: 400,
//           easing: Easing.out(Easing.ease),
//         },
//         () => {
//           if (onFadeStart) {
//             runOnJS(onFadeStart)();
//           }
//           opacity.value = withTiming(
//             0,
//             {
//               duration: 300,
//               easing: Easing.out(Easing.ease),
//             },
//             () => {
//               if (onAnimationEnd) {
//                 runOnJS(onAnimationEnd)();
//               }
//             },
//           );
//         },
//       );
//     },
//   });

//   const containerAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity: opacity.value,
//     };
//   });

//   const imageAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {translateX: interpolate(animatedValue.value, [0, 1], [0, -90])},
//       ],
//     };
//   });

//   const textAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity: animatedValue.value,
//       transform: [
//         {scale: animatedValue.value},
//         {
//           translateX: interpolate(animatedValue.value, [0, 1], [0, 35]),
//         },
//       ],
//     };
//   });

//   return (
//     <Animated.View
//       {...container}
//       style={[containerAnimatedStyle, container.style]}>
//       <Animated.Image {...logo} style={imageAnimatedStyle} />

//       <View style={styles.textContainer}>
//         <Animated.Text style={[textAnimatedStyle, styles.text]}>
//           Radzima
//         </Animated.Text>
//       </View>
//     </Animated.View>
//   );
// };
