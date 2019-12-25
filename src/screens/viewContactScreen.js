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
  AsyncStorage
} from "react-native";
import { Card, CardItem } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default class ViewContactScreen extends Component {
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
    title: "View Contact"
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
  getContact = async Key => {
    try {
      await AsyncStorage.getItem(Key)
        .then(contactJsonString => {
          let contact = JSON.parse(contactJsonString);
          contact["Key"] = Key;
          this.setState(contact);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {}
  };

  callAction = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = "telpromt:" + phone;
    } else {
      phoneNumber = "tel:" + phone;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number not availlable !");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  smsAction = phone => {
    let phoneNumber = "sms:" + phone;

    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number not availlable !");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  editContact = Key => {
    this.props.navigation.navigate("Edit", { Key });
  };

  deleteContact = key => {
    // const user = this.state.fname;
    Alert.alert(
      "Delete Contact ?",
      this.state.fname + " " + this.state.lname,
      // this.state.lname
      [
        {
          text: "Cancel",
          onPress: () => console.log("Contact delection canceled")
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(key)
                .then(() => this.props.navigation.goBack())
                .catch(error => {
                  console.log(error);
                });
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contactIconContainer}>
          <Text style={styles.contactIcon}>
            {this.state.fname[0].toUpperCase()}
          </Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {this.state.fname} {this.state.lname}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Phone </Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.phone} </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Email </Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.email} </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Address </Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.address} </Text>
            </CardItem>
          </Card>
        </View>
        <Card style={styles.actionContainer}>
          <CardItem bordered style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => {
                this.smsAction(this.state.phone);
              }}
            >
              <Entypo name={"message"} color="#B83227" size={50}></Entypo>
            </TouchableOpacity>
          </CardItem>
          <CardItem bordered style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => {
                this.callAction(this.state.phone);
              }}
            >
              <Entypo name={"phone"} color="#B83227" size={50}></Entypo>
            </TouchableOpacity>
          </CardItem>
        </Card>
        <Card style={styles.actionContainer}>
          <CardItem bordered style={styles.actionButton}>
            <TouchableOpacity onPress={() => this.editContact(this.state.Key)}>
              <Entypo name={"edit"} color="#B83227" size={50}></Entypo>
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem bordered style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => {
                this.deleteContact(this.state.Key);
              }}
            >
              <Entypo name={"trash"} color="#B83227" size={50}></Entypo>
            </TouchableOpacity>
          </CardItem>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  }
});
