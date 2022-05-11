import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { localSignIn } from "../actions/auth";
import { connect } from "react-redux";

const ResolveAuthScreen = ({ localSignIn }) => {
  useEffect(() => {
    localSignIn();
  }, []);

  return null;
};

ResolveAuthScreen.propTypes = {
  localSignIn: PropTypes.func.isRequired,
};

export default connect(null, { localSignIn })(ResolveAuthScreen);
