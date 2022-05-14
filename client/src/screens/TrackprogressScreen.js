import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";

const TrackprogressScreen = () => {
  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.33233141,
          longitude: -122.0312186,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      ></MapView>
    </View>
  );
};

export default TrackprogressScreen;

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});
