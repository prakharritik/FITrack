import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Image, Input } from "react-native-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as ImagePicker from "expo-image-picker";
import { addPost } from "../actions/post";

const AddPostScreen = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 4],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(`data:image/jpg;base64,${result.base64}`);
      console.log(image);
    }
  };

  useEffect(() => {}, []);

  return (
    <ScrollView style={styles.container}>
      <Input
        placeholder="Enter Post Title"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        multiline
        numberOfLines={6}
        style={styles.TextInput}
        placeholder="Enter Post Body....."
        value={text}
        onChangeText={setText}
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Pick an image from camera roll" onPress={pickImage} />

      <Button
        title="Submit"
        onPress={() => {
          addPost(title, text, image);
        }}
      />
    </ScrollView>
  );
};
AddPostScreen.proptypes = {
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(null, { addPost })(AddPostScreen);

const styles = StyleSheet.create({
  TextInput: {
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  image: {
    height: 300,
    resizeMode: "cover",
    margin: 10,
  },
});
