import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import FoodItem from "../components/FoodItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFoodItems } from "../actions/calorie";

const AddCalorieScreen = ({ getFoodItems, foodItems }) => {
  const [search, setSearch] = useState("");
  return (
    <View style={styles.container}>
      <SearchBar
        searchIcon={{ size: 24 }}
        onChangeText={setSearch}
        value={search}
        onEndEditing={() => getFoodItems(search)}
      />
      <FlatList
        keyExtractor={(foodItem) => foodItem.food_name}
        data={foodItems}
        renderItem={(foodItem) => {
          return (
            <FoodItem
              food_name={foodItem.item.food_name}
              photo={foodItem.item.photo.thumb}
            />
          );
        }}
      />
    </View>
  );
};

AddCalorieScreen.proptypes = {
  getFoodItems: PropTypes.func.isRequired,
  foodItems: PropTypes.array,
};

const mapStateToProps = (state) => ({
  foodItems: state.calorie.foodItems,
});

export default connect(mapStateToProps, { getFoodItems })(AddCalorieScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
