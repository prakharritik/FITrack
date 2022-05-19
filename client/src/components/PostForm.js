import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button, Image, Input } from "react-native-elements";

const PostForm = ({ _title, _text, _image, handleSubmit, _id }) => {
  const [title, setTitle] = useState(_title ? _title : "");
  const [text, setText] = useState(_text ? _text : "");
  const [image, setImage] = useState(_image);

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
          handleSubmit(title, text, image, _id);
        }}
      />
    </ScrollView>
  );
};

export default PostForm;

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
