import React from "react";
import { Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
    try {
      const selectedDrinks = await AsyncStorage.getItem('selectedDrinks');
      if (selectedDrinks !== null) {
        // Data retrieved successfully
        console.log(JSON.parse(selectedDrinks));
        // TODO: do something with the data
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
};


const DrinkList = () => {
    return(
        <>
        <Button
        onPress={getData}
        title="Pegar Drink"
        />
        </>
    )
};

export default DrinkList;