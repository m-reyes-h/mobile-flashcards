import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native";
import { connect } from "react-redux";
import { global } from "../utils/globalStyles";
import { addNewDeck } from "../actions";
import { saveDeck } from "../utils/api";
import { blue, white, yellow } from "../utils/colors";

class NewDeck extends Component {
  state = {
    title: ""
  };

  addDeck = () => {
    const { title } = this.state;
    const { navigation, dispatch } = this.props;

    saveDeck(title).then(createdDeck => {
      dispatch(addNewDeck(createdDeck));
      this.setState({ title: "" });
      navigation.navigate("Deck", { deckId: title });
    });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={[global.center, { backgroundColor: blue, padding: 15 }]}
      >
        <TextInput
          onChangeText={title => this.setState({ title })}
          placeholder={"Enter Title"}
          placeholderTextColor={white}
          style={global.inputFloat}
          value={this.state.title}
          selectionColor={white}
        />

        <TouchableOpacity
          disabled={this.state.title.length === 0}
          onPress={this.addDeck}
          style={[global.buttonStyle, { borderColor: yellow, backgroundColor: yellow }]}
        >
          <Text style={[global.buttonText, { color: white }]}>
            Create Deck
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(NewDeck);
