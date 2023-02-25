import { colors, WIDTH_SCREEN } from '@/utils';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetchAccessToken from './useFetchAccessToken';

const FetchAccessTokenScreen = () => {
  const { fecthToken, loading } = useFetchAccessToken();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          color: colors.primary,
          fontSize: 24,
          textAlign: 'center',
        }}>
        Welcome to SimpleInvoice dung+octopus4@101digital.io
      </Text>
      <TouchableOpacity onPress={fecthToken} style={styles.button}>
        {loading ? (
          <ActivityIndicator color={colors.white} size="large" />
        ) : (
          <Text
            style={{
              color: colors.white,
            }}>
            Fecth Token And Get Me
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: WIDTH_SCREEN / 2,
    height: 44,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginTop: 16,
  },
});

export default FetchAccessTokenScreen;
