import { HEADER_OVERLAY_OFFSET } from 'core/constants';

export const useHeaderWithOverlayLayout = () => {
  const overlayOffset = HEADER_OVERLAY_OFFSET;

  return {
    overlayOffset,
    pageContainerProps: {
      static: { style: { paddingTop: overlayOffset } },
      scrollable: {
        contentContainerStyle: { paddingTop: overlayOffset },
        showsVerticalScrollIndicator: false,
      },
    },
  };
};
