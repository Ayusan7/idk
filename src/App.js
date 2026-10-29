
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from './components/Header';
import BottomTabs from './navigation/BottomTabs';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <BottomTabs /> 
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}
