import { StyleSheet, View } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import IconInput from "react-native-vector-icons/FontAwesome";
import IconButton from "react-native-vector-icons/MaterialCommunityIcons";
import LottieView from "lottie-react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
} from "@expo-google-fonts/roboto";
import React, { useState } from "react";

const AuthForm = ({ headerText, lottie }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{headerText}</Text>
        {lottie === "login" ? (
          <LottieView
            source={require("../../assets/19555-meditation.json")}
            style={styles.animation}
            autoPlay
          />
        ) : (
          <LottieView
            source={require("../../assets/99668-fitness.json")}
            style={styles.animation}
            autoPlay
          />
        )}
        <Input
          placeholder="Email"
          leftIcon={<IconInput name="user" size={24} color="black" />}
          value={email}
          onChangeText={setEmail}
          inputStyle={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          leftIcon={<IconInput name="lock" size={24} color="black" />}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.input}
        />
        <Button
          buttonStyle={{ width: 150 }}
          icon={<IconButton name="send-circle" size={45} color="#111" />}
          onPress={() => alert("click")}
          type="clear"
        />
      </View>
    );
  }
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  input: {
    padding: 5,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Roboto_400Regular",
  },
  animation: {
    width: 300,
    height: 300,
  },
});
