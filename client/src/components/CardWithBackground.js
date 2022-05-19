import { ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { Text } from "react-native-elements";

const CardWithBackground = ({ uri, heading }) => {
  return (
    <ImageBackground
      source={{
        uri,
      }}
      style={styles.container}
      imageStyle={{ borderRadius: 10 }}
    >
      <Text h3 style={styles.heading}>
        {heading}
      </Text>
    </ImageBackground>
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
});
