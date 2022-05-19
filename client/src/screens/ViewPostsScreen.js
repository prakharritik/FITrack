import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getPosts } from "../actions/post";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import PostItem from "../components/PostItem";

const ViewPostsScreen = ({ getPosts, posts, loading, navigation, user }) => {
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
          return <PostItem item={item} navigation={navigation} user={user} />;
        }}
      />
    </View>
  );
};

ViewPostsScreen.proptypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.post.loading,
  posts: state.post.posts,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getPosts })(ViewPostsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
});
