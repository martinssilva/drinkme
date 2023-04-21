import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MainDrink from '../pages/Main';
import SavedDrinks from '../pages/SavedDrinks';
import DrinkDetails from '../pages/DrinkDetails';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainDrink} />
      <Tab.Screen name="Saved Drinks" component={SavedDrinks} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const DrinkNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Principal"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={DrinkDetails} />
    </Stack.Navigator>
  );
}

export default DrinkNavigation;
