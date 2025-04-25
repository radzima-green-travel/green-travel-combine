import {bootstrapRequest} from 'core/actions';
import {useStatusBar} from 'core/hooks';
import {Redirect} from 'expo-router';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useOnRequestError, useOnRequestSuccess} from 'react-redux-help-kit';
import {SplashScreen as CustomSplashScreen} from '../screens';
import {selectUpdatesMandatory} from 'core/selectors';

export default function RootScreen() {
  useStatusBar('light');

  const dispatch = useDispatch();

  const [splashAnimationIsFinished, setSplashAnimationIsFinished] =
    useState(false);

  const updateIsMandatory = useSelector(selectUpdatesMandatory);

  const [bootstrapIsFinished, setBootstrapIsFinished] = useState(false);

  const markBootstrapAsFinished = () => setBootstrapIsFinished(true);

  useEffect(() => void dispatch(bootstrapRequest()), [dispatch]);

  useOnRequestSuccess(bootstrapRequest, markBootstrapAsFinished);

  useOnRequestError(bootstrapRequest, markBootstrapAsFinished, true);

  if (!splashAnimationIsFinished || !bootstrapIsFinished) {
    return (
      <CustomSplashScreen
        onAnimationEnd={() => setSplashAnimationIsFinished(true)}
      />
    );
  }

  if (updateIsMandatory) {
    return <Redirect href="/force-update" />;
  }

  return <Redirect href="/(main)" />;
}
