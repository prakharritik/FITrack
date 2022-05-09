import { StyleSheet, Text, View, Button } from "react-native";
import NavLink from "../components/NavLink";
import React from "react";
import AuthForm from "../components/AuthForm";

const SignupScreen = ({ navigation }) => {
  return (
    <View>
      <AuthForm headerText="Sign Up" lottie="signup" />
      {/* <Button
        title="mainFlow"
        onPress={() => navigation.navigate("mainFlow")}
      /> */}
      <NavLink
        text="Already have an account? Sign in instead."
        routeName="Signin"
      />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
