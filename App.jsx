import React from 'react';
import { View, Text } from 'react-native';
import MainDrink from './src/pages/Main';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './src/routes';

export default function App() {
return(
  <>
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  </>
);
};
