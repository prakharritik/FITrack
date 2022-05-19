import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider } from "react-redux";
import { setNavigator } from "./src/navigationRef";

import AddWalkScreen from "./src/screens/AddWalkScreen";
import MytracksScreen from "./src/screens/MytracksScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import RewardsScreen from "./src/screens/RewardsScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackprogressScreen from "./src/screens/TrackprogressScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";

import store from "./src/store";
import AddCalorieScreen from "./src/screens/AddCalorieScreen";
import CalorieDetailScreen from "./src/screens/CalorieDetailScreen";
import AddPostScreen from "./src/screens/AddPostScreen";
import ViewPostsScreen from "./src/screens/ViewPostsScreen";
import EditPostScreen from "./src/screens/EditPostScreen";
import PostDetailScreen from "./src/screens/PostDetailScreen";

const switchNavigator = createSwitchNavigator(
  {
    loginFlow: createStackNavigator({
      ResolveAuth: ResolveAuthScreen,
      Signin: SigninScreen,
      Signup: SignupScreen,
    }),
    mainFlow: createBottomTabNavigator({
      Profileflow: createStackNavigator({
        Profile: ProfileScreen,
        Editprofile: EditProfileScreen,
      }),
      Trackflow: createStackNavigator({
        Tracks: MytracksScreen,
        Addwalk: AddWalkScreen,
        Addcalorie: AddCalorieScreen,
        Caloriedetail: CalorieDetailScreen,

        Progress: TrackprogressScreen,
      }),
      Postflow: createStackNavigator({
        Viewposts: ViewPostsScreen,
        Addpost: AddPostScreen,
        Postdetail: PostDetailScreen,
        Editpost: EditPostScreen,
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
  return (
    <Provider store={store}>
      <App ref={(navigator) => setNavigator(navigator)} />
    </Provider>
  );
};
