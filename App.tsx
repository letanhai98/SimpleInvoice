/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from '@/navigation/MainNavigator';
import Toast from 'react-native-toast-message';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
