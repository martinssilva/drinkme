import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchApi = async () => {
    try {
        const res = await axios
            .get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        return res.data.drinks[0];
    } catch (err) {
        // handle error
        console.log(err);
        throw new Error("Failed to fetch API data");
    }
};

export const saveDrink = async () => {
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
