import { FetchAccessTokenScreen } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="FetchAccessToken"
        component={FetchAccessTokenScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
