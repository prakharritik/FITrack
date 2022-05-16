import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card, Image, Text } from "react-native-elements";
import CardWithBackground from "../components/CardWithBackground";

const MytracksScreen = ({ navigation }) => {
  return (
    <View>
      <Text h1 style={styles.heading}>
        Tracks
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Addwalk")}>
        <CardWithBackground
          uri="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
          heading="Exercise"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Addsleep")}>
        <CardWithBackground
          uri="https://images.unsplash.com/photo-1429117237875-aa29229d99f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          heading="Sleep"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Addcalorie")}>
        <CardWithBackground
          uri="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          heading="Calorie"
          route="Progress"
        />
      </TouchableOpacity>
    </View>
  );
};

export default MytracksScreen;

const styles = StyleSheet.create({
  heading: { textAlign: "center" },
});
