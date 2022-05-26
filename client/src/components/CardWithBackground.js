import { ImageBackground, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-elements";

const CardWithBackground = ({ uri, heading, sum }) => {
  let unit = heading === "Calorie" ? "cal" : "km";
  return (
    <View>
      <ImageBackground
        source={{
          uri,
        }}
        style={styles.container}
      >
        <Text h3 style={styles.heading}>
          {heading}
        </Text>
      </ImageBackground>
      <View style={styles.progress}>
        <Text>Today</Text>
        <Text>
          {sum} {unit}
        </Text>
      </View>
    </View>
  );
};

export default CardWithBackground;

const styles = StyleSheet.create({
  heading: {
    color: "#fff",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 255, 0.3)",
  },
  container: {
    height: 100,
    justifyContent: "center",
    margin: 10,
    marginTop: 30,
    border: 1,
  },

  progress: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
