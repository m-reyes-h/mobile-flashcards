import React, { Component } from "react";
import { connect } from "react-redux";
import { global } from "../utils/globalStyles";
import { Text, View, TouchableOpacity } from "react-native";
import { blue, white, yellow } from "../utils/colors";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId
    };
  };

  handleAddCard = () => {
    this.props.navigation.navigate("NewCard", { deckId: this.props.deckId });
  };

  handleStartQuiz = () => {
    this.props.navigation.navigate("Quiz", { deckId: this.props.deckId });
  };

  render() {
    const { deck } = this.props;

    return (
      <View style={[global.center, { padding: 20, backgroundColor: blue }]}>
        <Text style={[global.cardHeader, { color: white, marginBottom: 10 }]}>
          {deck.title}
        </Text>
        <Text style={[global.cardSubHeader, { marginBottom: 50 }]}>
          ({deck.question.length} cards)
        </Text>

        <TouchableOpacity
          onPress={this.handleAddCard}
          style={[global.buttonStyle, { borderColor: yellow }]}
        >
          <Text style={[global.buttonText, { color: yellow }]}>
            Add New Card
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={deck.question.length === 0}
          onPress={this.handleStartQuiz}
          style={[
            global.buttonStyle,
            { borderColor: yellow, backgroundColor: yellow }
          ]}
        >
          <Text style={[global.buttonText, { color: white }]}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: state[deckId]
  };
}

export default connect(mapStateToProps)(Deck);
