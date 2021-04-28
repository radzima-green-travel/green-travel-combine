import {useCallback, useState} from 'react';
import {SCREEN_WIDTH} from 'services/PlatformService';

export function useImageSlider(pagesAmount: number) {
  const [page, setPage] = useState(1);

  const onScroll = useCallback(
    e => {
      if (pagesAmount && pagesAmount > 1) {
        const {contentOffset} = e.nativeEvent;
        const pageNum = Math.round(contentOffset.x / SCREEN_WIDTH);
        setPage(pageNum + 1);
      }
    },
    [pagesAmount],
  );

  return {
    onScroll,
    page,
    pagesAmount,
  };
}
