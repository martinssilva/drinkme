import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedDrinksContext = createContext();

export const useSavedDrinks = () => {
  const context = useContext(SavedDrinksContext);
  if (!context) {
    throw new Error('useSavedDrinks must be used within a SavedDrinksProvider');
  }
  return context;
};

export const SavedDrinksProvider = ({ children }) => {
  const [savedDrinks, setSavedDrinks] = useState([]);

  useEffect(() => {
    const fetchSavedDrinks = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const likedDrinkKeys = keys.filter((key) => key.startsWith('@liked_drink_'));

        if (likedDrinkKeys.length > 0) {
          const likedDrinkData = await AsyncStorage.multiGet(likedDrinkKeys);
          const likedDrinkObjects = likedDrinkData.map(([_, value]) => JSON.parse(value));
          setSavedDrinks(likedDrinkObjects);
        }
      } catch (error) {
        console.error("Error fetching liked drinks:", error);
      }
    };

    fetchSavedDrinks();
  }, []);

  const saveDrink = async (drink) => {
    try {
      await AsyncStorage.setItem(`@liked_drink_${drink.idDrink}`, JSON.stringify(drink));
      setSavedDrinks((prevDrinks) => [...prevDrinks, drink]);
    } catch (error) {
      console.error("Error storing liked drinks:", error);
    }
  };

  const deleteDrink = async (drinkId) => {
    try {
      await AsyncStorage.removeItem(`@liked_drink_${drinkId}`);
      setSavedDrinks((prevDrinks) => prevDrinks.filter((drink) => drink.idDrink !== drinkId));
    } catch (error) {
      console.error("Error deleting drink:", error);
    }
  };

  return (
    <SavedDrinksContext.Provider
      value={{
        savedDrinks,
        setSavedDrinks,
        saveDrink,
        deleteDrink,
      }}
    >
      {children}
    </SavedDrinksContext.Provider>
  );
};
