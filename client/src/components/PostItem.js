import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button, Image } from "react-native-elements";

const PostItem = ({
  item,
  navigation,
  user,
  addLike,
  removeLike,
  deletePost,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Postdetail", { post: item })}
    >
      <Image
        style={styles.image}
        source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.name}>{item.user.name}</Text>
        <View style={styles.buttonsgroup}>
          <Button
            icon={{
              type: "font-awesome",
              name: "thumbs-up",
            }}
            type="clear"
            title={item.likes.length}
            onPress={() => addLike(item._id)}
          />
          <Button
            icon={{
              type: "font-awesome",
              name: "thumbs-down",
            }}
            type="clear"
            onPress={() => removeLike(item._id)}
          />
          <Button
            icon={{
              type: "entypo",
              name: "trash",
            }}
            type="clear"
            onPress={() => deletePost(item._id)}
          />
          {user.id === item.user._id ? (
            <Button
              icon={{ type: "font-awesome", name: "pencil" }}
              type="clear"
              onPress={() => navigation.navigate("Editpost", { post: item })}
            />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ebf0f7",
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  buttonsgroup: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7",
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#3399ff",
    fontWeight: "bold",
  },
  name: {
    fontSize: 15,
    flex: 1,
    alignSelf: "center",
    color: "grey",
    fontWeight: "bold",
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#6666ff",
  },
});
