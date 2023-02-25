import { colors, stylesDefault } from '@/utils';
import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

interface Props {
  loading: boolean;
  textEmpty?: string;
}

export const EmptyList = ({ loading, textEmpty = 'No data' }: Props) => {
  return (
    <View style={stylesDefault.container}>
      {loading ? (
        <>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.txtTitle}>Loading...</Text>
        </>
      ) : (
        <>
          <Text style={styles.txtTitle}>{textEmpty}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  txtTitle: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
