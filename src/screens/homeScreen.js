import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList
} from "react-native";
import { Card } from "native-base";
import { sorting } from "./functions/sortThem";
import { Entypo } from "@expo/vector-icons";

function Item({ contact, Key, classProps }) {
  return (
    <TouchableOpacity
      onPress={() =>
        classProps.navigation.navigate("View", {
          Key
        })
      }
    >
      <Card style={styles.listItem}>
        <View style={styles.iconContainer}>
          <Text style={styles.contactIcon}>
            {contact.fname[0].toUpperCase()}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            {contact.fname} {contact.lname}
          </Text>
          <Text style={styles.infoText}>{contact.phone}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      Data: [],
      result: []
    };
  }
  static navigationOptions = {
    title: "Home"
    /* No more header config here! */
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("didFocus", () => {
      this.getAllContacts();
    });
  }

  getAllContacts = async () => {
    try {
      await AsyncStorage.getAllKeys().then(keys => {
        return AsyncStorage.multiGet(keys).then(result => {
          let Array1 = new Array(result.length).fill(0);
          // Get All The result[i][1] in Array1
          // console.log("result: ", result);
          let i = 0,
            array1Index = 0;
          for (let item of result) {
            Array1[i] = JSON.parse(item[1]);
            i++;
          }
          // sorting(Array1);
          this.setState({ Data: result });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.Data}
          renderItem={({ item, index }) => {
            let toSend = item;
            toSend = JSON.parse(toSend[1]);
            console.log("key", item[0]);
            return (
              <Item contact={toSend} Key={item[0]} classProps={this.props} />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        ></FlatList>
        <TouchableOpacity
          style={styles.floatButton}
          onPress={() => this.props.navigation.navigate("Add")}
        >
          <Entypo name="plus" size={30} color="white"></Entypo>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    flexDirection: "row",
    padding: 20
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B83227",
    borderRadius: 100
  },
  contactIcon: {
    fontSize: 28,
    color: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 60,
    backgroundColor: "#586776",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.49,
    shadowRadius: 14.65,

    elevation: 20
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
