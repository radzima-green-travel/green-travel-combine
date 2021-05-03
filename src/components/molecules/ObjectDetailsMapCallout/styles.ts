import {COLORS} from 'assets';

export const themeStyles = {
  container: {
    paddingBottom: 15,
    width: 300,
    zIndex: 99999,
  },
  content: {
    width: 300,
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
    bottom: 0,
    left: '50%',
    transform: [{translateX: -3.5}],
    shadowColor: 'rgb(21, 39, 2)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
    shadowColor: 'rgb(21, 39, 2)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
};
