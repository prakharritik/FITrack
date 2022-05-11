import { StyleSheet, Text, View, Button } from "react-native";
import NavLink from "../components/NavLink";
import React from "react";
import AuthForm from "../components/AuthForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signup } from "../actions/auth";

const SignupScreen = ({ signup }) => {
  return (
    <View>
      <AuthForm headerText="Sign Up" lottie="signup" onSubmit={signup} />

      <NavLink
        text="Already have an account? Sign in instead."
        routeName="Signin"
      />
    </View>
  );
};

SignupScreen.propTypes = {
  signup: PropTypes.func.isRequired,
};

export default connect(null, { signup })(SignupScreen);

const styles = StyleSheet.create({});
