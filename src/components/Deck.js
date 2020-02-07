import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class deck extends Component {
  render() {
    return (
      <View>
        <Text>Deck</Text>

        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate("NewDeck")}
        />
      </View>
    );
  }
}
