import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useSavedDrinks } from '../context/SavedDrinksContext';



const SavedDrinks = () => {
  const { savedDrinks, setSavedDrinks } = useSavedDrinks();
  const navigation = useNavigation();

  const handleDeleteDrink = async (item) => {
    try {
      // Remove the drink object from the savedDrinks state
      const newSavedDrinks = savedDrinks.filter((drink) => drink.idDrink !== item.idDrink);
      setSavedDrinks(newSavedDrinks);
  
      // Remove the corresponding key-value pair from AsyncStorage
      await AsyncStorage.removeItem(`@liked_drink_${item.idDrink}`);
    } catch (error) {
      console.error("Error deleting drink:", error);
    }
  };

  const handleLearnMore = (drink) => {
    navigation.navigate('Details', { drink });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.strDrinkThumb }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.strDrink}</Text>
        <Text style={styles.itemIngredients}>
          Main Ingredients: {item.strIngredient1}, {item.strIngredient2},{" "}
          {item.strIngredient3}
        </Text>
        <View style={styles.learnMore}>
          <Button title="Learn More" onPress={() => handleLearnMore(item)} />
        </View>
        <View style={styles.delete}>
          <Button color="red" title="Delete Drink" onPress={() => handleDeleteDrink(item)} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={savedDrinks}
        keyExtractor={(item) => item.idDrink}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal:20,
    height:60,
  },
  itemContainer: {
    flex:1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 22,
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0, // These values are for horizontal and vertical offset of the shadow.
      height: 2,
    },
    shadowOpacity: 0.23, // This value can be between 0 and 1.
    shadowRadius: 2.62, // The larger the radius, the blurrier the shadow will be.

    // Android shadow properties
    elevation: 4, // This value can be from 0 to any higher number for different shadow depths.
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  itemIngredients: {
    fontSize: 16,
    marginBottom: 8,
  },
  learnMore: {
    borderRadius: 25,
    overflow: 'hidden',
    margin: 4,
  },
  delete: {
    borderRadius: 25,
    overflow: 'hidden',
    margin: 4,
  },
});

export default SavedDrinks;
