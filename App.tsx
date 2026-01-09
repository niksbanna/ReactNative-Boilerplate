import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { store } from './app/store';
import { ThemeProvider } from './app/theme/ThemeContext';
import RootNavigator from './app/navigation/RootNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
