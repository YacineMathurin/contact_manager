import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class ViewContactScreen extends Component {
  static navigationOptions = {
    title: "View Contact"
    /* No more header config here! */
  };
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>View !</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
