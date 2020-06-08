import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  AsyncStorage,
  ScrollView,
} from "react-native";
import { Form, Item, Input, Label, Button, Thumbnail } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const test = "5";

export default class AddContactScreen extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: "",
    };
  }
  static navigationOptions = {
    title: "Add Contact",
  };
  state = {
    uri: "",
  };
  saveContact = async () => {
    Alert.alert("Saving Contact ...", this.state.fname);
    if (
      this.state.fname !== "" &&
      // this.state.lname !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.uri !== ""
    ) {
      // Alert.alert("if");
      let contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address,
        uri: this.state.uri,
      };
      try {
        // Alert.alert("Try caught ...");
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

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ uri: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback
        style={styles.page}
        onPress={() => Keyboard.dismiss}
      >
        <ScrollView style={styles.container}>
          <View style={{ backgroundColor: "#2F363F" }}>
            <Avatar
              // style={styles.avatar}
              rounded
              icon={{ name: "photo" }}
              size="large"
              // title="MD"
              source={{
                uri: this.state.uri,
              }}
              showAccessory
              containerStyle={{
                flex: 4,
                marginVertical: 55,
                alignSelf: "center",
                borderWidth: 1,
                borderColor: "#ccc",
              }}
              onPress={this._pickImage}
            />
          </View>
          <Form>
            <Item>
              <FontAwesome
                name="user"
                size={15}
                color="black"
                style={{ backgroundColor: "gold", padding: 5, borderRadius: 3 }}
              ></FontAwesome>
              <Input
                autoCompleteType="off"
                placeholder="Full Name"
                autoCorrect={false}
                // autoCapitalize="none"
                keyboardType="default"
                onChangeText={(fname) => this.setState({ fname })}
              />
            </Item>
            <Item>
              <FontAwesome
                name="phone"
                size={15}
                color="black"
                style={{ backgroundColor: "gold", padding: 5, borderRadius: 3 }}
              ></FontAwesome>

              <Input
                placeholder="Phone"
                autoCompleteType="off"
                autoCorrect={false}
                // autoCapitalize="none"
                keyboardType="phone-pad"
                onChangeText={(phone) => this.setState({ phone })}
              />
            </Item>
            <Item>
              <FontAwesome
                name="at"
                size={15}
                color="black"
                style={{ backgroundColor: "gold", padding: 5, borderRadius: 3 }}
              ></FontAwesome>
              <Input
                placeholder="Email"
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="none"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({ email })}
              />
            </Item>
            <Item>
              <FontAwesome
                name="map-marker"
                size={15}
                color="black"
                style={{ backgroundColor: "gold", padding: 7, borderRadius: 3 }}
              ></FontAwesome>
              <Input
                placeholder="Address"
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="none"
                keyboardType="email-address"
                onChangeText={(address) => this.setState({ address })}
              />
            </Item>
          </Form>
          <Button
            style={styles.button}
            bordered
            success
            onPress={() => this.saveContact()}
          >
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
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#eee",
    // borderRadius: 3,
    // margin: 10,
    height: 500,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 3,
  },
  avatar: {
    marginHorizontal: 20,
  },
  inputItem: {
    margin: 5,
    fontWeight: "bold",
  },
  inputLabel: {
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  button: {
    // backgroundColor: "#1BCA9B",
    marginHorizontal: 40,
    marginTop: 25,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "#000",
    // fontWeight: "bold",
  },
  empty: {
    height: 500,
    // backgroundColor: "#FFF",
  },
});
