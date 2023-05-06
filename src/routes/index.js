import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SavedDrinksProvider } from "../context/SavedDrinksContext";
import MainDrink from '../pages/Main';
import SavedDrinks from '../pages/SavedDrinks';
import DrinkDetails from '../pages/DrinkDetails';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <SavedDrinksProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Saved Drinks') {
              iconName = focused ? 'ios-bookmark' : 'ios-bookmark-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Home"
          component={MainDrink}
          options={{
            headerTitle: 'Home',
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Saved Drinks"
          component={SavedDrinks}
          options={{
            headerTitle: 'Saved Drinks',
            headerTitleAlign: 'center',
          }}
        />
      </Tab.Navigator>
    </SavedDrinksProvider>
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
