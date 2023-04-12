import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainDrink from '../pages/Main';
import DrinkList from '../pages/DrinkList';
import SavedDrinks from '../pages/SavedDrinks';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainDrink} />
      <Tab.Screen name="Lista" component={DrinkList} />
      <Tab.Screen name="Drinks Salvos" component={SavedDrinks} />
    </Tab.Navigator>
  );
};

export default MyTabs;
