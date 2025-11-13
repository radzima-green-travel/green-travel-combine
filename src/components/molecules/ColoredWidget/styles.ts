import { FONTS_PRESETS } from 'assets/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CFE9BC',
    borderRadius: 20,
  },
  contentWrapper: { paddingVertical: 12, paddingHorizontal: 13 },
  titleText: FONTS_PRESETS.footnoteBold,
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5, // compensates negative margin of the badge for indentation between badge and text
  },
  titleBadge: {
    paddingHorizontal: 7,
    borderRadius: 20,
    justifyContent: 'center',
    marginHorizontal: -7, // makes badge aligned horizontally with the rest of the text lines
  },
  titleBadgeText: { color: 'white' },
});
