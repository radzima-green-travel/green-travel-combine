import { HEADER_OVERLAY_OFFSET } from 'core/constants';

export const useHeaderWithOverlayLayout = (
  {
    enabled,
  }: {
    enabled?: boolean;
  } = { enabled: true },
) => {
  const overlayOffset = enabled ? HEADER_OVERLAY_OFFSET : 0;

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
