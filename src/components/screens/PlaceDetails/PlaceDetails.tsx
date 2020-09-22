import React from 'react';
import {ScrollView} from 'react-native';
import {PlaceDetailsImageSlider} from 'molecules';
import HTML from 'react-native-render-html';

const image = require('./mockImage.jpg');

const htmlContent =
  '<p dir = "auto"><strong>Тестовое описание<br><br></strong><span style="color: rgb(123,136,152);background-color: rgb(85,98,113);font-size: 26px;font-family: Mercury SSm A", "Mercury SSm B", Georgia, Times, "Times New Roman", "Microsoft YaHei New", "Microsoft Yahei", 微软雅黑, 宋体, SimSun, STXihei, 华文细黑, serif;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br><br><strong>Тестовое изображение<br><br></strong></span></p>\n<img src="https://picsum.photos/200/300" alt="undefined" style="height: auto;width: auto"/>\n<p dir = "auto"><span style="color: rgba(0,0,0,0.65);background-color: rgb(255,255,255);font-size: 14px;font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><strong>Тестовое описание<br><br></strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p>\n';

export const PlaceDetails = () => {
  return (
    <ScrollView>
      <PlaceDetailsImageSlider images={[image, image, image, image]} />
      <HTML
        html={htmlContent}
        ignoredStyles={['font-family', 'width', 'height']}
        tagsStyles={{img: {width: '100%', height: 300}}}
      />
    </ScrollView>
  );
};
