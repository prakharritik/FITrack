import { StyleSheet, Text, View, Button } from "react-native";
import NavLink from "../components/NavLink";
import React from "react";
import AuthForm from "../components/AuthForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import {} from "react-navigation";

const SignupScreen = ({ signup }) => {
  return (
    <SafeAreaView>
      <AuthForm headerText="Sign Up" lottie="signup" onSubmit={signup} />

      <NavLink
        text="Already have an account? Sign in instead."
        routeName="Signin"
      />
    </SafeAreaView>
  );
};

SignupScreen.propTypes = {
  signup: PropTypes.func.isRequired,
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default connect(null, { signup })(SignupScreen);

const styles = StyleSheet.create({});
