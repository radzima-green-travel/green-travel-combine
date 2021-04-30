import {COLORS} from 'assets';

export const themeStyles = {
  container: {
    height: 105,
    width: 150,
    zIndex: 99999,
  },
  content: {
    height: 80,
    width: 150,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginBottom: 'auto',
  },

  sBubble: {
    height: 7,
    width: 7,
    borderRadius: 7,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 5,
    left: 50,
  },

  mBubble: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 12,
    left: '50%',
    transform: [{translateX: -5}],
  },
};
