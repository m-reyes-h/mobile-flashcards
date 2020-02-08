import React, { Component } from "react";
import { KeyboardAvoidingView, Text, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";


import { addNewCard } from "../actions";
import { addCardToDeck } from "../utils/api";
import { yellow, white, blue } from "../utils/colors";
import { global } from "../utils/globalStyles";

class NewCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId
    };
  };

  addCard = () => {
    const { deckId } = this.props;
    const newCard = this.state;

    addCardToDeck(deckId, newCard).then(() => {
      this.props.dispatch(addNewCard(deckId, newCard));
      this.setState(() => ({
        question: "",
        answer: ""
      }));
      this.props.navigation.navigate("Deck", { deckId: deckId });
    });
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={[global.center, { padding: 15, backgroundColor: blue }]}
      >
        <TextInput
          onChangeText={question => this.setState({ question })}
          placeholder={"Your Question"}
          placeholderTextColor={white}
          style={[global.inputFloat, { marginBottom: 30 }]}
          value={this.state.title}
          selectionColor={white}
        />

        <TextInput
          onChangeText={answer => this.setState({ answer })}
          placeholder={"Your Answer"}
          placeholderTextColor={white}
          style={[global.inputFloat, { marginBottom: 50 }]}
          value={this.state.title}
          selectionColor={white}
        />

        <TouchableOpacity
          disabled={question === 0 || answer.length === 0}
          onPress={this.addCard}
          style={[
            global.buttonStyle,
            { backgroundColor: yellow, borderColor: yellow }
          ]}
        >
          <Text style={[global.buttonText, { color: white }]}>Add Card</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(stat, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId
  };
}

export default connect(mapStateToProps)(NewCard);
