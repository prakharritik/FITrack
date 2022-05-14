import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Polyline, Circle } from "react-native-maps";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Map = ({ currentLocation, locations }) => {
  if (!currentLocation)
    return <ActivityIndicator size={"large"} style={{ marginTop: 200 }} />;
  // console.log(currentLocation);
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={120}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      <Polyline coordinates={locations.map((loc) => loc.coords)} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

Map.proptypes = {
  currentLocation: PropTypes.object.isRequired,
  locations: PropTypes.array,
};

const mapStateToProps = (state) => ({
  currentLocation: state.location.currentLocation,
  locations: state.location.locations,
});

export default connect(mapStateToProps, {})(Map);
