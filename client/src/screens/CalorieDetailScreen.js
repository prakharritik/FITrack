import { FlatList, StyleSheet, View } from "react-native";
import { Image, Text } from "react-native-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFoodItemDetail, addCalorie } from "../actions/calorie";
import React, { useEffect } from "react";
import ServingItem from "../components/ServingItem";

const CalorieDetailScreen = ({
  navigation,
  getFoodItemDetail,
  calorie: { itemDetail, loading },
  addCalorie,
}) => {
  const name = navigation.getParam("food_name");
  useEffect(() => {
    getFoodItemDetail(name);
  }, []);
  let food_name_cap = name.charAt(0).toUpperCase() + name.slice(1);

  return loading || !itemDetail ? (
    <Text>Loading</Text>
  ) : (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            itemDetail?.photo?.highres !== null
              ? itemDetail.photo.highres
              : itemDetail.photo.thumb,
        }}
        style={styles.image}
      />
      <Text h3 style={styles.heading}>
        {food_name_cap}
      </Text>

      <FlatList
        data={itemDetail.alt_measures}
        keyExtractor={(serving) => serving.index}
        renderItem={(serving) => {
          return (
            <ServingItem
              measure={serving.item.measure}
              quantity={serving.item.qty}
              weight={serving.item.serving_weight}
              calByWt={itemDetail.nf_calories / itemDetail.serving_weight_grams}
              handleAdd={addCalorie}
              name={food_name_cap}
            />
          );
        }}
      />
    </View>
  );
};
CalorieDetailScreen.proptypes = {
  getFoodItemDetail: PropTypes.func.isRequired,
  addCalorie: PropTypes.func.isRequired,
  calorie: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  calorie: state.calorie,
});

export default connect(mapStateToProps, { getFoodItemDetail, addCalorie })(
  CalorieDetailScreen
);

const styles = StyleSheet.create({
  image: { height: 200, resizeMode: "contain" },
  heading: { textAlign: "center" },
  container: {
    flex: 1,
  },
});
