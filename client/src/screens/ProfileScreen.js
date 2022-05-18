import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getprofile } from "../actions/profile";
import { Image } from "react-native-elements";

import { EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const bmi = (height, weight) => {
  const value = ((weight / height / height) * 100 * 100).toPrecision(4);

  if (value <= 18.5) return { value, status: "Under Weight" };
  else if (value > 18.5 && value <= 24.9) return { value, status: "Healthy" };
  else if (value > 25 && value <= 29.9) return { value, status: "Over Weight" };
  else if (value >= 30) return { value, status: "Obese" };
};

const ProfileScreen = ({
  profile: { profile, loading },
  getprofile,
  navigation,
}) => {
  useEffect(() => {
    getprofile();
  }, []);

  if (loading) return <Text>loading</Text>;

  const { age, weight, height } = profile;
  const bmivalue = bmi(height, weight);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Editprofile")}>
          <EvilIcons name="pencil" size={35} style={{ textAlign: "right" }} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
            }}
          />

          {/* <Text style={styles.name}>{name} </Text> */}
          <Text style={styles.userInfo}>Age : {age}</Text>
          <Text style={styles.userInfo}>
            {bmivalue.value} {bmivalue.status}{" "}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.item}>
          <Text style={styles.info}>{weight} kg</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.info}>{height} cm</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

ProfileScreen.propTypes = {
  profile: PropTypes.object,
  getprofile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

ProfileScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default connect(mapStateToProps, { getprofile })(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#778899",
    flex: 1,
  },
  header: {
    backgroundColor: "#DCDCDC",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600",
  },
  body: {
    flexDirection: "row",
  },
  item: {
    flexBasis: "50%",
    height: 100,
    backgroundColor: "#111",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "grey",
  },
  info: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
});
