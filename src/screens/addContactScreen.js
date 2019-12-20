import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  AsyncStorage,
  ScrollView
} from "react-native";
import { Form, Item, Input, Label, Button } from "native-base";

const test = "5";

export default class AddContactScreen extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: ""
    };
  }
  static navigationOptions = {
    title: "Add Contact"
  };
  saveContact = async () => {
    Alert.alert("Saving Contact ...", this.state.fname);
    if (
      this.state.fname !== "" &&
      this.state.lname !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.address !== ""
    ) {
      Alert.alert("if");
      let contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      };
      try {
        Alert.alert("Try caught ...");
        await AsyncStorage.setItem(
          Date.now().toString(),
          JSON.stringify(contact)
        ).then(() => {
          Alert.alert("Done, You're being redirected to Home !");
          this.props.navigation.navigate("Home");
        });
      } catch (error) {
        console.log("AsyncStorage: ", error);
      }
    } else {
      // Alert.alert("All fields are required !");
    }
  };
  state = {};
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <Form>
            <Item style={styles.inputItem}>
              <Label>First Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={fname => this.setState({ fname })}
              ></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Label>Last Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={lname => this.setState({ lname })}
              ></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Label>Phone</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={phone => this.setState({ phone })}
              ></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
              ></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Label>Address</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={address => this.setState({ address })}
              ></Input>
            </Item>
          </Form>
          <Button style={styles.button} full onPress={() => this.saveContact()}>
            <Text style={styles.buttonText}>Save</Text>
          </Button>
          <View style={styles.empty}></View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    // marginTop: 100,
    height: 500
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#1BCA9B",
    marginTop: 40,
    borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF"
  }
});
