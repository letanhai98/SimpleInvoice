import { ViewStyle } from 'react-native';

const rowAndCenter: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const center: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const container: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

export const stylesDefault = { rowAndCenter, center, container };
