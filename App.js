import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/homeScreen";
import AddContactScreen from "./src/screens/addContactScreen";
import EditContactScreen from "./src/screens/editContactScreen";
import ViewContactScreen from "./src/screens/viewContactScreen";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Add: AddContactScreen,
    Edit: EditContactScreen,
    View: ViewContactScreen,
  },
  {
    initialRouteName: "Home",
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "darkred",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  }
);

export default createAppContainer(AppNavigator);
