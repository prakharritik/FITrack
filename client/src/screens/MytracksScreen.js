import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Card, Image, Text } from "react-native-elements";
import CardWithBackground from "../components/CardWithBackground";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCalorie } from "../actions/calorie";
import { getWalk } from "../actions/location";

const MytracksScreen = ({
  navigation,
  getCalorie,
  getWalk,
  calorie: { calories, loading: CalorieLoading, sum: Cal_sum },
  walk: { walks, loading: WalkLoading, sum: Walk_sum },
}) => {
  useEffect(() => {
    getCalorie();
    getWalk();
  }, []);

  return CalorieLoading || WalkLoading ? (
    <Text>loading</Text>
  ) : (
    <View>
      <Text h1 style={styles.heading}>
        Tracks
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Addwalk")}>
        <CardWithBackground
          uri="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
          heading="Exercise"
          sum={Walk_sum}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Addcalorie")}>
        <CardWithBackground
          uri="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          heading="Calorie"
          route="Progress"
          sum={Cal_sum}
        />
      </TouchableOpacity>
    </View>
  );
};

MytracksScreen.proptypes = {
  getCalorie: PropTypes.func.isRequired,
  calorie: PropTypes.object.isRequired,
  walk: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  calorie: state.calorie,
  walk: state.location,
});

export default connect(mapStateToProps, { getCalorie, getWalk })(
  MytracksScreen
);

const styles = StyleSheet.create({
  heading: { textAlign: "center" },
});
