import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import NavLink from "../components/NavLink";
import AuthForm from "../components/AuthForm";
import { connect } from "react-redux";
import { signin, localSignIn } from "../actions/auth";
import PropTypes from "prop-types";

const SigninScreen = ({ navigation, signin, token }) => {
  if (token) {
    navigation.navigate("mainFlow");
  }

  return (
    <View style={styles.container}>
      <AuthForm headerText="Sign In" lottie="login" onSubmit={signin} />
      <NavLink
        text="Don't have an account? Sign up instead."
        routeName="Signup"
      />
    </View>
  );
};

SigninScreen.propTypes = {
  token: PropTypes.string,
  signin: PropTypes.func.isRequired,
  localSignIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { signin, localSignIn })(SigninScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
    flex: 1,
  },
});
