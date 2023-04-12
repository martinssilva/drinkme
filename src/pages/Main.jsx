import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {fetchApi} from "../services";

const MainDrink = () => {
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    fetchApi().then((data) => {
      setDrink(data);
    });
  }, []);

  const saveDrink = async () => {
    try {
      const existingDrinks = await AsyncStorage.getItem("selectedDrinks");
      const updatedDrinks = existingDrinks
        ? [...JSON.parse(existingDrinks), drink]
        : [drink];
      await AsyncStorage.setItem(
        "selectedDrinks",
        JSON.stringify(updatedDrinks)
      );
      alert("Drink saved successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to save drink.");
    }
  };

  return (
    <View style={styles.container}>
      {drink ? (
        <>
          <Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />
          <Text style={styles.text}>{drink.strDrink}</Text>
          <Text
            style={styles.ingredients}
          >{`Main Ingredients: ${drink.strIngredient1}, ${drink.strIngredient2}, ${drink.strIngredient3}`}</Text>
        </>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}
      <Button
        onPress={() => {
          fetchApi().then((data) => {
            setDrink(data);
          });
        }}
        title="Drink"
      />
      <Button onPress={saveDrink} title="Save" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  ingredients: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
});

export default MainDrink;
