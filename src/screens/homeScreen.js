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
import { Entypo } from "@expo/vector-icons";

function Item({ contact }) {
  return (
    <TouchableOpacity>
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
      Data: []
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
          // let Array1 = new Array(result.length);
          // let Array2 = Array1;
          // Get All The Result[i][1] in Array1
          // map Array1 and fill Array2 (by a map too)
          // Array1.map(array1=>{
          //  if(Array2.length === 0) Array2.push(array1)
          //  Array2.map(array2=>{
          //    array1.fname[0] > array2.fname[0] ? Array2.push(array1): Array2.unshift(array1)
          // })
          // })
          // Data: Array2

          this.setState({ Data: result }, () =>
            console.log("res", JSON.parse(result[0][1]), result.length)
          );
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
          renderItem={({ item }) => {
            let toSend = item;
            toSend = JSON.parse(toSend[1]);
            // console.log("Mad Obj", toSend);
            return <Item contact={toSend} />;
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
