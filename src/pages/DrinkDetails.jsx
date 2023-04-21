import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const DrinkDetails = ({ route }) => {
  const { drink } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />
      <Text style={styles.title}>{drink.strDrink}</Text>
      <Text style={styles.subtitle}>Main Ingredients:</Text>
      <Text style={styles.ingredients}>
        {drink.strIngredient1}, {drink.strIngredient2}, {drink.strIngredient3}
      </Text>
      <Text style={styles.subtitle}>Instructions:</Text>
      <Text style={styles.instructions}>{drink.strInstructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  ingredients: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  instructions: {
    fontSize: 16,
    alignSelf: "flex-start",
  },
});

export default DrinkDetails;
