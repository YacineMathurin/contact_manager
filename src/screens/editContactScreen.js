import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Form, Item, Label, Input, Button, Textarea } from "native-base";
import { Image } from "react-native-elements";

export default class EditContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "DummyText",
      lname: "DummyText",
      phone: "DummyText",
      email: "DummyText",
      address: "DummyText",
      key: "DummyText",
    };
  }
  static navigationOptions = {
    title: "Edit Contact",
    /* No more header config here! */
  };
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("didFocus", () => {
      const Key = navigation.getParam("Key", "");
      this.getContact(Key);
    });
  }

  getContact = async (key) => {
    await AsyncStorage.getItem(key)
      .then((contactJsonString) => {
        let contact = JSON.parse(contactJsonString);
        contact["key"] = key;
        this.setState(contact);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  updateContact = async (key) => {
    if (
      this.state.fname !== "" &&
      // this.state.lname !== "" &&
      this.state.email !== "" &&
      this.state.phone !== "" &&
      this.state.address !== ""
    ) {
      let contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        phone: this.state.phone,
        address: this.state.address,
      };
      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
        .then(() => this.props.navigation.goBack())
        .catch((error) => {
          console.log(error);
        });
    } else Alert.alert("All field are required !");
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <View style={styles.container}>
            <View style={{ marginBottom: 10 }}>
              <Image
                source={{ uri: this.state.uri }}
                style={{ width: "100%", height: 200 }}
              />
            </View>
            <View style={styles.details}>
              <Text
                style={[
                  styles.infoText,
                  { fontWeight: "bold", backgroundColor: "white" },
                ]}
              >
                Full Name
              </Text>

              <Textarea
                autoFocus
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                value={this.state.fname}
                style={[
                  // styles.infoText,
                  { backgroundColor: "#ccc", height: 25 },
                ]}
                onChangeText={(fname) => this.setState({ fname })}
              ></Textarea>
            </View>
            <View style={styles.details}>
              <Text style={[styles.infoText, { fontWeight: "bold" }]}>
                Phone
              </Text>
              <Textarea
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                value={this.state.phone}
                onChangeText={(phone) => this.setState({ phone })}
                style={[
                  // styles.infoText,
                  { backgroundColor: "#ccc", height: 25 },
                ]}
              ></Textarea>
            </View>
            <View style={styles.details}>
              <Text style={[styles.infoText, { fontWeight: "bold" }]}>
                Email
              </Text>
              <Textarea
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                style={[
                  // styles.infoText,
                  { backgroundColor: "#ccc", height: 25 },
                ]}
              ></Textarea>
            </View>
            <View style={styles.details}>
              <Text style={[styles.infoText, { fontWeight: "bold" }]}>
                address
              </Text>
              <Textarea
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                value={this.state.address}
                onChangeText={(address) => this.setState({ address })}
                style={[
                  // styles.infoText,
                  { backgroundColor: "#ccc", height: 25 },
                ]}
              ></Textarea>
            </View>
            <Button
              bordered
              success
              style={styles.button}
              onPress={() => this.updateContact(this.state.key)}
            >
              <Text style={styles.buttonText}>Update</Text>
            </Button>
          </View>
          <View style={styles.empty}></View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginHorizontal: 40,
    marginTop: 25,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "#000",
  },
  details: {
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 5,
    borderRadius: 3,
  },
  infoText: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "300",
    position: "relative",
    left: 15,
    bottom: 15,
    backgroundColor: "white",
    width: 80,
    textAlign: "center",
  },
  empty: {
    height: 500,
  },
});
