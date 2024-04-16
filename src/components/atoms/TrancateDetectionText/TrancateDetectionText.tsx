import React, {ComponentProps, memo, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {styles} from './styles';
import {useStaticCallback} from 'react-redux-help-kit';

interface IProps extends ComponentProps<typeof Text> {
  onTruncate?: (isTruncated: boolean) => void;
}

export const TrancateDetectionText = memo(
  ({onTruncate, numberOfLines, ...props}: IProps) => {
    const [mainTextHeight, setMainTextHeight] = useState<number | null>(null);
    const [hiddenTextHeight, setHiddenTextHeight] = useState<number | null>(
      null,
    );

    const onTruncateHandler = useStaticCallback(
      (isTruncated: boolean) => {
        onTruncate?.(isTruncated);
      },
      [onTruncate],
    );

    useEffect(() => {
      if (mainTextHeight && hiddenTextHeight) {
        onTruncateHandler(mainTextHeight < hiddenTextHeight);
      }
    }, [hiddenTextHeight, mainTextHeight, onTruncateHandler]);

    return (
      <>
        <Text
          onLayout={({nativeEvent}) =>
            setMainTextHeight(nativeEvent.layout.height)
          }
          {...props}
          numberOfLines={numberOfLines}
        />
        <Text
          onLayout={({nativeEvent}) =>
            setHiddenTextHeight(nativeEvent.layout.height)
          }
          {...props}
          style={[props.style, styles.hiddenText]}
        />
      </>
    );
  },
);
