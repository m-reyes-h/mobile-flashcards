import React, { Component } from "react";
import { StatusBar, View, StyleSheet, Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./src/reducers";
import { charcoal, cream, gray } from "./src/utils/color.js";

import { Ionicons } from "@expo/vector-icons";

import Deck from "./src/components/Deck";
import NewCard from "./src/components/NewCard";
import NewDeck from "./src/components/NewDeck";
import Quiz from "./src/components/Quiz";
import Stack from "./src/components/Stack";

function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View
      style={{
        backgroundColor
      }}
    >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const TabNavigation = createBottomTabNavigator(
  {
    Stack: {
      screen: Stack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-albums" size={30} color={tintColor} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add-circle-outline" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: cream,
      style: {
        height: 50,
        backgroundColor: gray,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const StackNavigation = createStackNavigator({
  Home: {
    screen: TabNavigation,
    navigationOptions: {
      header: null,
      title: "Go Back"
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: cream,
      headerStyle: {
        backgroundColor: charcoal
      },
      title: "Decks"
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: cream,
      headerStyle: {
        backgroundColor: charcoal
      },
      title: "Add Flashcard"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: cream,
      headerStyle: {
        backgroundColor: charcoal
      },
      title: "Quiz"
    }
  }
});

const store = createStore(reducer);

const AppContainer = createAppContainer(StackNavigation);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View
          style={{
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
          }}
        >
          <FlashcardsStatusBar
            backgroundColor={charcoal}
            barStyle="light-content"
          />
          <AppContainer />
        </View>
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
