import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SavedDrinks = () => {
  const [savedDrinks, setSavedDrinks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLikedDrinks = async () => {
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
    fetchLikedDrinks();
  }, []);

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
        <Button style={styles.learnMore} title="Learn More" onPress={() => handleLearnMore(item)} />
        <Button style={styles.delete} color="red" title="Delete Drink" 
          onPress={() => handleDeleteDrink(item)} 
        />
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
    margin:8,
  },
  delete: {
    margin:8,
  },
});

export default SavedDrinks;
