import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Touchable,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  AsyncStorage,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Form, Item, Input, Label, Button } from "native-base";

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
    /* No more header config here! */
  };
  saveContact = async () => {
    if (
      this.state.fname !== "" &&
      this.state.lname !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.address !== ""
    ) {
      let contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      };
      try {
        await AsyncStorage.setItem(
          Date.now().toString(),
          JSON.stringify(contact)
        ).then(() => this.props.navigation.goBack());
      } catch (error) {
        console.log("AsyncStorage: ", error);
      }
    } else {
      Alert.alert("All fields are required !");
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
                onchangeText={fname => this.setSate({ fname })}
              ></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Label>Last Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onchangeText={lname => this.setSate({ lname })}
              ></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Label>Phone</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric"
                onchangeText={phone => this.setSate({ phone })}
              ></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onchangeText={email => this.setSate({ email })}
              ></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Label>address</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onchangeText={address => this.setSate({ address })}
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
    backgroundColor: "#B83227",
    marginTop: 40
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
