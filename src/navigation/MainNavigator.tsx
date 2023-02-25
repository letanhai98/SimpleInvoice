import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const MainAuthStack = () => {
  const dataUser = useSelector((state: RootState) => state.user);

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
        gestureEnabled: true,
      }}>
      {dataUser?.user ? (
        <Stack.Screen name="HomeNav" component={HomeNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </AuthStack.Navigator>
  );
};

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainAuthStack} />
    </Stack.Navigator>
  );
};
