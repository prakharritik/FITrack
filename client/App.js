import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import AddTrackScreen from "./src/screens/AddTrackScreen";
import MytracksScreen from "./src/screens/MytracksScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RewardsScreen from "./src/screens/RewardsScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackprogressScreen from "./src/screens/TrackprogressScreen";

const switchNavigator = createSwitchNavigator(
  {
    loginFlow: createStackNavigator({
      Signin: SigninScreen,
      Signup: SignupScreen,
    }),
    mainFlow: createBottomTabNavigator({
      Profile: ProfileScreen,
      Trackflow: createStackNavigator({
        Tracks: MytracksScreen,
        Addtrack: AddTrackScreen,
        Progress: TrackprogressScreen,
      }),
      Rewards: RewardsScreen,
    }),
  },
  {
    initialRouteName: "loginFlow",
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: "#FFFFFF" },
    },
  }
);

const App = createAppContainer(switchNavigator);

export default () => {
  return <App />;
};
