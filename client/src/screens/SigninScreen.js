import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import NavLink from "../components/NavLink";
import AuthForm from "../components/AuthForm";

const SigninScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AuthForm headerText="Sign In" lottie="login" />
      <NavLink
        text="Don't have an account? Sign up instead."
        routeName="Signup"
      />
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
    flex: 1,
  },
});
