import { Button, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import useLocation from "../hooks/useLocation";
import { withNavigationFocus } from "react-navigation";
import {
  addLocation,
  startRecording,
  stopRecording,
} from "../actions/location";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../_mock";

const AddWalkScreen = ({
  recording,
  addLocation,
  stopRecording,
  startRecording,
  locations,
  isFocused,
}) => {
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );

  const [err] = useLocation(recording || isFocused, callback);

  return (
    <SafeAreaView>
      <Map />
      {err ? <Text>Please enable location services.</Text> : null}
      {recording ? (
        <Button title="Finish" onPress={() => stopRecording(locations)} />
      ) : (
        <Button title="Start walk." onPress={startRecording} />
      )}
    </SafeAreaView>
  );
};

AddWalkScreen.proptypes = {
  recording: PropTypes.bool.isRequired,
  addLocation: PropTypes.func.isRequired,
  startRecording: PropTypes.func.isRequired,
  stopRecording: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  recording: state.location.recording,
  locations: state.location.locations,
});

export default connect(mapStateToProps, {
  addLocation,
  startRecording,
  stopRecording,
})(withNavigationFocus(AddWalkScreen));

const styles = StyleSheet.create({});
