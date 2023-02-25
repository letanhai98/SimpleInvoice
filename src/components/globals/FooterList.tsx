import { colors, stylesDefault } from '@/utils';
import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

interface Props {
  loading: boolean;
  textEmpty?: string;
}

export const FooterList = ({ loading }: Props) => {
  return (
    loading && (
      <View
        style={[
          stylesDefault.container,
          {
            marginTop: 8,
          },
        ]}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.txtTitle}>Loading...</Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  txtTitle: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
