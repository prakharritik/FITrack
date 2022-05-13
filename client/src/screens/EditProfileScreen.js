import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import IconButton from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Input } from "react-native-elements";
import PropTypes from "prop-types";
import { getprofile, updateprofile } from "../actions/profile";
import { connect } from "react-redux";

const EditProfileScreen = ({
  getprofile,
  profile: { profile, loading },
  updateprofile,
}) => {
  useEffect(() => {
    getprofile();
  }, [getprofile]);
  const [height, setHeight] = useState(profile.height.toString());
  const [weight, setWeight] = useState(profile.weight.toString());
  const [age, setAge] = useState(profile.age.toString());
  const [name, setName] = useState(profile.name);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Name"
        value={name}
        onChangeText={setName}
        inputStyle={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        autoCapitalize="none"
        autoCorrect={false}
        inputStyle={styles.input}
        keyboardType="number-pad"
      />
      <Input
        placeholder="Weight (Kg)"
        value={weight}
        onChangeText={setWeight}
        autoCapitalize="none"
        autoCorrect={false}
        inputStyle={styles.input}
        keyboardType="number-pad"
      />
      <Input
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        autoCapitalize="none"
        autoCorrect={false}
        inputStyle={styles.input}
        keyboardType="number-pad"
      />
      <Button
        buttonStyle={{ width: 150 }}
        icon={<IconButton name="send-circle" size={45} color="#111" />}
        onPress={() => updateprofile({ name, age, weight, height })}
        type="clear"
      />
    </View>
  );
};

EditProfileScreen.propTypes = {
  profile: PropTypes.object,
  getprofile: PropTypes.func.isRequired,
  updateprofile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getprofile, updateprofile })(
  EditProfileScreen
);

const styles = StyleSheet.create({
  input: {
    borderColor: "red",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});
