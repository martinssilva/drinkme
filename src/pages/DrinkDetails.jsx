import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


const DrinkDetails = ({ route }) => {
  const { drink } = route.params;

  const backgroundColors = [
    "#1abc9c",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#3498db",
    "#e67e22",
  ]

  React.useEffect(() => {
    const randomColor1 = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    const randomColor2 = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    setGradientColors([randomColor1, randomColor2]);
  }, []);

  const [gradientColors, setGradientColors] = React.useState(["#1abc9c", "#f39c12"]);

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />
        <Text style={styles.title}>{drink.strDrink}</Text>
        <Text style={styles.subtitle}>Main Ingredients:</Text>
        <Text style={styles.ingredients}>
          {drink.strIngredient1}, {drink.strIngredient2}, {drink.strIngredient3}
        </Text>
        <Text style={styles.subtitle}>Instructions:</Text>
        <Text style={styles.instructions}>{drink.strInstructions}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: .84,
    elevation: 5,
    alignItems: "center",
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
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },
  ingredients: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
  },
});


export default DrinkDetails;
