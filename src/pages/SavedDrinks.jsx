import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedDrinks = () => {
  const [savedDrinks, setSavedDrinks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("selectedDrinks");
        if (jsonValue !== null) {
          setSavedDrinks(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.strDrinkThumb }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.strDrink}</Text>
        <Text style={styles.itemIngredients}>
          Main Ingredients: {item.strIngredient1}, {item.strIngredient2},{" "}
          {item.strIngredient3}
        </Text>
        <Button title="Learn More" />
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
    backgroundColor: "#000",
    paddingVertical: 20,
    height:60,
  },
  itemContainer: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 32,
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemIngredients: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default SavedDrinks;
