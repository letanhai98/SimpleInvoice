import { AddInvoiceScreen, HomeScreen } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddInvoice" component={AddInvoiceScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
