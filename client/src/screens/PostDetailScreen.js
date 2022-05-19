import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native-elements";

const PostDetailScreen = ({ navigation }) => {
  const post = navigation.getParam("post");

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{post.title}</Text>
      <Text style={styles.name}>{post.user.name}</Text>
      {post.image ? (
        <Image source={{ uri: post.image.url }} style={styles.image} />
      ) : null}
      <Text style={styles.text}>{post.text}</Text>
    </View>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  image: {
    height: 300,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    textAlign: "center",
    fontSize: 25,
  },
  name: {
    color: "grey",
    textAlign: "center",
    fontSize: 20,
  },
  text: {
    padding: 10,
    textAlign: "left",
    fontSize: 15,
  },
});
