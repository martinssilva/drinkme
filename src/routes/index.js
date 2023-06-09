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
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#fff', 
          },
          headerTintColor: '#f4511e',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={MainDrink}
          options={{
            headerTitle: 'Swipe & Sip',
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="Saved Drinks"
          component={SavedDrinks}
          options={{
            headerTitle: 'My drinks',
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
      <Stack.Screen 
        name="Details" 
        component={DrinkDetails}
        options={{
          headerStyle: {
            backgroundColor: '#fff', 
          },
          headerTintColor: '#f4511e',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTitle: 'Mixology Guide',
        }}
       />
    </Stack.Navigator>
  );
}

export default DrinkNavigation;
