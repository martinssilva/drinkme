import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-deck-swiper';
import { useSavedDrinks } from '../context/SavedDrinksContext';


export default function App() {
  const [drinks, setDrinks] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    fetchDrinks(6); // Fetch fell drinks initially for smoother swiping
  }, []);

  const fetchDrinks = async (count) => {
    if (fetching) return;

    setFetching(true);
    const newDrinks = [];
    for (let i = 0; i < count; i++) {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php',
      );
      const data = await response.json();
      newDrinks.push(data.drinks[0]);
    }
    setDrinks((prevDrinks) => [...prevDrinks, ...newDrinks]);
    setFetching(false);
  };
  const { savedDrinks, setSavedDrinks } = useSavedDrinks();

  const onSwipedRight = async (index) => {
    if (drinks.length - index === 2) {
      fetchDrinks(5);
    }
    setCardIndex(index + 1); // Update the cardIndex state
    const swipedDrink = drinks[index];
    await AsyncStorage.setItem(
      `@liked_drink_${swipedDrink.idDrink}`,
      JSON.stringify(swipedDrink),
    );
  
    // Update the savedDrinks state
    setSavedDrinks((prevDrinks) => [...prevDrinks, swipedDrink]);
  };

  const onSwipedLeft = (index) => {
    // If there are only 2 cards left in the deck, fetch more drinks
    if (drinks.length - index === 2) {
      fetchDrinks(5);
    }
    setCardIndex(index + 1); // Update the cardIndex state
  };

  const renderCard = (card) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: card.strDrinkThumb }} style={styles.image} />
        <Text style={styles.text}>{card.strDrink}</Text>
        <Text
          style={styles.ingredients}
        >{`Main Ingredients: ${card.strIngredient1}, ${card.strIngredient2}, ${card.strIngredient3}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {drinks.length ? (
        <Swiper
          cards={drinks}
          renderCard={renderCard}
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
          cardIndex={cardIndex}
          backgroundColor="transparent"
          stackSize={3}
          disableBottomSwipe
          disableTopSwipe
        />
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 15,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },

});
