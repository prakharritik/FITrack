import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Button, Image, Input } from "react-native-elements";
import PostForm from "../components/PostForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editPost } from "../actions/post";

const EditPostScreen = ({ navigation, editPost }) => {
  const post = navigation.getParam("post");

  return (
    <PostForm
      _image={post.image ? post.image.url : null}
      _text={post.text}
      _title={post.title}
      _id={post._id}
      handleSubmit={editPost}
    />
  );
};

export default connect(null, { editPost })(EditPostScreen);

const styles = StyleSheet.create({});
