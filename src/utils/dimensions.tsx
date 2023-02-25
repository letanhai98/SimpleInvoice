import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WIDTH_SCREEN = width;
const HEIGHT_SCREEN = height;

const SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
};

export { WIDTH_SCREEN, HEIGHT_SCREEN, SHADOW };
