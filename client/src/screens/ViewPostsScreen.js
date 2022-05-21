import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getPosts, addLike, removeLike, deletePost } from "../actions/post";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import PostItem from "../components/PostItem";

const ViewPostsScreen = ({
  getPosts,
  posts,
  loading,
  navigation,
  user,
  deletePost,
  addLike,
  removeLike,
}) => {
  useEffect(() => {
    getPosts();
  }, []);

  return loading ? (
    <Text>loading</Text>
  ) : (
    <View style={styles.container}>
      <Button
        icon={{ type: "font-awesome", name: "plus" }}
        onPress={() => navigation.navigate("Addpost")}
      />
      <FlatList
        data={posts}
        keyExtractor={(post) => post._id}
        renderItem={({ item }) => {
          return (
            <PostItem
              item={item}
              navigation={navigation}
              user={user}
              addLike={addLike}
              removeLike={removeLike}
              deletePost={deletePost}
            />
          );
        }}
      />
    </View>
  );
};

ViewPostsScreen.proptypes = {
  getPosts: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  posts: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.post.loading,
  posts: state.post.posts,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getPosts,
  addLike,
  removeLike,
  deletePost,
})(ViewPostsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
});
