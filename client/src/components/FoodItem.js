import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Button, Image } from "react-native-elements";
import { navigate } from "../navigationRef";

const FoodItem = ({ food_name, photo }) => {
  let food_name_cap = food_name.charAt(0).toUpperCase() + food_name.slice(1);
  return (
    <TouchableOpacity
      onPress={() => navigate("Caloriedetail", { food_name })}
      style={styles.container}
    >
      <Image
        source={{
          uri: photo,
        }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.subcont}>
        <Text style={styles.text}>{food_name_cap}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "aliceblue",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "grey",
    marginBottom: 5,
    borderWidth: 2,
  },
  subcont: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  image: {
    height: 100,
    width: 100,
    borderColor: "black",
    borderWidth: 2,
  },
  text: {
    width: 100,
    textAlign: "center",
  },
});
