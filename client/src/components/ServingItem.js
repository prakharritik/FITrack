import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";

import React from "react";

const ServingItem = ({
  measure,
  quantity,
  weight,
  calByWt,
  name,
  handleAdd,
}) => {
  const cal = parseInt(calByWt * weight);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.Itemhead}>
          {measure.charAt(0).toUpperCase() + measure.slice(1)}
        </Text>
        <Text style={styles.Itemdet}>
          Quantity : {quantity} {"   "}Weight: {weight} g{"  "} Calories: {cal}
        </Text>
      </View>

      <Button title="Add" onPress={() => handleAdd(name, cal)} />
    </View>
  );
};

export default ServingItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "lightblue",
    margin: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Itemhead: {
    fontSize: 16,
  },
  Itemdet: {
    fontSize: 13,
  },
});
