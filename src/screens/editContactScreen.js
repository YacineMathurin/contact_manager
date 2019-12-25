import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Form, Item, Label, Input, Button } from "native-base";

export default class EditContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "DummyText",
      lname: "DummyText",
      phone: "DummyText",
      email: "DummyText",
      address: "DummyText",
      key: "DummyText"
    };
  }
  static navigationOptions = {
    title: "Edit Contact"
    /* No more header config here! */
  };
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("didFocus", () => {
      const Key = navigation.getParam("Key", "");
      this.getContact(Key);
    });
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactJsonString => {
        let contact = JSON.parse(contactJsonString);
        contact["key"] = key;
        this.setState(contact);
      })
      .catch(error => {
        console.log(error);
      });
  };
  updateContact = async key => {
    if (
      this.state.fname !== "" &&
      this.state.lname !== "" &&
      this.state.email !== "" &&
      this.state.phone !== "" &&
      this.state.address !== ""
    ) {
      let contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        phone: this.state.phone,
        address: this.state.address
      };
      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
        .then(() => this.props.navigation.goBack())
        .catch(error => {
          console.log(error);
        });
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Form>
            <Item style={styles.inputItem}>
              <Label>First Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                value={this.state.fname}
                onChangeText={fname => this.setState({ fname })}
              ></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Label>Last Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                value={this.state.lname}
                onChangeText={lname => this.setState({ lname })}
              ></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              ></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Label>Phone</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric"
                value={this.state.phone}
                onChangeText={phone => this.setState({ phone })}
              ></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Label>Adress</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                value={this.state.address}
                onChangeText={address => this.setState({ address })}
              ></Input>
            </Item>
          </Form>
          <Button
            full
            rounded
            style={styles.button}
            onPress={() => this.updateContact(this.state.key)}
          >
            <Text style={styles.buttonText}>Update</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
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
  }
});
