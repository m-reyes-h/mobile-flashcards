import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./src/reducers";
import { dark, blue, white, yellow } from "./src/utils/colors.js";


import Deck from "./src/components/Deck";
import NewCard from "./src/components/NewCard";
import NewDeck from "./src/components/NewDeck";
import Quiz from "./src/components/Quiz";

const StackNavigation = createStackNavigator({
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: dark,
      headerStyle: {
        backgroundColor: yellow
      },
      title: "Mobile FlashCards"
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: dark,
      headerStyle: {
        backgroundColor: yellow
      },
      title: "Add Flashcard"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: dark,
      headerStyle: {
        backgroundColor: yellow
      },
      title: "Quiz"
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0 // remove shadow on iOS
      },
      title: "New Deck"
    }
  }
});

const store = createStore(reducer);

const AppContainer = createAppContainer(StackNavigation);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <View
          style={{
            flex: 1,
            backgroundColor: yellow
          }}
        > */}
          <AppContainer />
        {/* </View> */}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
