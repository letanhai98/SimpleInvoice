import { colors, WIDTH_SCREEN } from '@/utils';
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface IProps {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
  onPress?: () => void;
  disabled?: boolean;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  shadow?: boolean;
}

export const PrimaryButton: React.FC<IProps> = ({
  disabled = false,
  loading = false,
  onPress,
  color,
  title,
  titleStyle = {},
  containerStyle = {},
  shadow = true,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        {
          height: 44,
          width: WIDTH_SCREEN / 1.8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color,
          borderRadius: 128,
          alignSelf: 'center',
        },
        shadow && {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        },
        containerStyle,
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text
          style={[
            {
              fontSize: 16,
              fontWeight: '700',
              color: colors.white,
            },
            titleStyle,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
