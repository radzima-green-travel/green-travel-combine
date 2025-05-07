import {bootstrapRequest} from 'core/actions';
import {useColorScheme, useStatusBar} from 'core/hooks';
import {Slot} from 'expo-router';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useOnRequestError, useOnRequestSuccess} from 'react-redux-help-kit';
import {
  SplashScreen as CustomSplashScreen,
  ForceUpdateScreen,
  OptionalUpdateScreen,
} from 'screens';
import {
  selectUpdatesAvailable,
  selectUpdatesMandatory,
  selectUpdatesSkipped,
} from 'core/selectors';
import {StatusBar} from 'expo-status-bar';

export default function RootScreen() {
  useStatusBar('light');

  const dispatch = useDispatch();
  const theme = useColorScheme();

  const isUpdatesMandatory = useSelector(selectUpdatesMandatory);
  const isUpdatesAvailable = useSelector(selectUpdatesAvailable);
  const isUpdatesSkipped = useSelector(selectUpdatesSkipped);
  const [bootstrapIsFinished, setBootstrapIsFinished] = useState(false);

  const [splashTransitionFinished, setSplashTransitionFinished] =
    useState(false);

  const [splashFadingStarted, setSplashFadingStarted] = useState(false);

  const markBootstrapAsFinished = () => setBootstrapIsFinished(true);

  useEffect(() => void dispatch(bootstrapRequest()), [dispatch]);

  useOnRequestSuccess(bootstrapRequest, markBootstrapAsFinished);
  useOnRequestError(bootstrapRequest, markBootstrapAsFinished, true);
  const statusBarThemedStyle = theme === 'dark' ? 'light' : 'dark';
  const statusBarStyle = splashFadingStarted ? 'light' : statusBarThemedStyle;

  const onFadeStart = useCallback(() => {
    setSplashFadingStarted(true);
  }, []);

  const onAnimationEnd = useCallback(() => {
    setSplashTransitionFinished(true);
  }, []);

  const showSplash = () => {
    return splashTransitionFinished ? null : (
      <CustomSplashScreen
        onFadeStart={onFadeStart}
        onAnimationEnd={onAnimationEnd}
      />
    );
  };

  const showUpdateScreen = () => {
    if (!splashTransitionFinished) {
      return null;
    } else if (isUpdatesMandatory) {
      return <ForceUpdateScreen />;
    } else if (isUpdatesAvailable && !isUpdatesSkipped) {
      return <OptionalUpdateScreen />;
    }

    return null;
  };

  return (
    <>
      {bootstrapIsFinished ? (
        <>
          <Slot />
          {showUpdateScreen()}
          {showSplash()}
        </>
      ) : null}

      <StatusBar
        animated
        style={statusBarStyle}
        backgroundColor="transparent"
      />
    </>
  );
}
