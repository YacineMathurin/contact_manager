import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  AsyncStorage,
} from "react-native";
import { Card, CardItem } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native-elements";

export default class ViewContactScreen extends Component {
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
    title: "View Contact",
    /* No more header config here! */
  };
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("didFocus", () => {
      let Key = navigation.getParam("Key", "");
      // Call method to populate key
      this.getContact(Key);
    });
  }
  getContact = async (Key) => {
    try {
      await AsyncStorage.getItem(Key)
        .then((contactJsonString) => {
          let contact = JSON.parse(contactJsonString);
          contact["Key"] = Key;
          this.setState(contact);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  callAction = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = "telpromt:" + phone;
    } else {
      phoneNumber = "tel:" + phone;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number not availlable !");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  smsAction = (phone) => {
    let phoneNumber = "sms:" + phone;

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number not availlable !");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editContact = (Key) => {
    this.props.navigation.navigate("Edit", { Key });
  };

  deleteContact = (key) => {
    // const user = this.state.fname;
    Alert.alert(
      "Delete Contact ?",
      this.state.fname + " " + this.state.lname,
      // this.state.lname
      [
        {
          text: "Cancel",
          onPress: () => console.log("Contact delection canceled"),
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(key)
                .then(() => this.props.navigation.goBack())
                .catch((error) => {
                  console.log(error);
                });
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: this.state.uri }}
            style={{ width: "100%", height: 200, opacity: 1 }}
          />
          <FontAwesome
            name={"expand"}
            size={30}
            color={"white"}
            style={{
              position: "absolute",
              top: "45%",
              left: "45%",
              padding: 7,
              backgroundColor: "#eee",
              opacity: 0.5,
              borderRadius: 5,
            }}
          ></FontAwesome>
        </View>
        <View>
          <Text style={styles.fname}>{this.state.fname}</Text>
        </View>
        <View style={styles.details}>
          <Text style={[styles.infoText, { fontWeight: "bold" }]}>Phone </Text>
          <Text style={{ marginLeft: 15, marginBottom: 10 }}>
            {this.state.phone}{" "}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={[styles.infoText, { fontWeight: "bold" }]}>Email</Text>
          <Text style={{ marginLeft: 15, marginBottom: 10 }}>
            {this.state.email}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={[styles.infoText, { fontWeight: "bold" }]}>Address</Text>
          <Text style={{ marginLeft: 15, marginBottom: 10 }}>
            {this.state.address}{" "}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => {
              this.smsAction(this.state.phone);
            }}
          >
            <FontAwesome
              name={"comment"}
              style={[styles.actionIcons, { borderColor: "gray" }]}
            ></FontAwesome>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.callAction(this.state.phone);
            }}
          >
            <FontAwesome
              name={"phone"}
              style={styles.actionIcons}
            ></FontAwesome>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.editContact(this.state.Key)}>
            <FontAwesome
              name={"edit"}
              style={[styles.actionIcons, { borderColor: "lightblue" }]}
            ></FontAwesome>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.deleteContact(this.state.Key);
            }}
          >
            <FontAwesome
              name={"trash"}
              style={[styles.actionIcons, { borderColor: "darkred" }]}
            ></FontAwesome>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fname: {
    padding: 20,
    backgroundColor: "#333945",
    width: "90%",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 3,
    position: "relative",
    bottom: 10,
    elevation: 2,
    opacity: 0.7,
    fontWeight: "bold",
    color: "white",
  },
  details: {
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 5,
    borderRadius: 3,
  },
  actions: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-around",
  },
  actionIcons: {
    fontSize: 20,
    padding: 20,
    borderRadius: 3,
    borderColor: "gold",
    borderWidth: 1,
  },

  infoContainer: {
    flexDirection: "column",
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center",
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff",
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900",
  },
  infoText: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "300",
    position: "relative",
    left: 15,
    bottom: 15,
    backgroundColor: "white",
    // paddingLeft: 7,
    width: 80,
    textAlign: "center",
  },
  actionContainer: {
    flexDirection: "row",
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900",
  },
});
