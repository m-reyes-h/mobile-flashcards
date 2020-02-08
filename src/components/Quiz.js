import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import InputButton from "./InputButton";

import { charcoal, cream, tan, yellow } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import { global } from "../utils/globalStyles";

class Quiz extends Component {
  state = {
    questionIndex: 0,
    showAnswer: false,
    correctAnswers: 0,
    incorrectAnswers: 0
  };

  renderHeader = (index, deck) => {
    return (
      <View
        style={[
          global.row,
          {
            width: "100%",
            justifyContent: "flex-start",
            marginBottom: 24,
            marginTop: 16,
            marginLeft: 16
          }
        ]}
      >
        <Text style={[global.cardSubHeader, { marginRight: 16 }]}>
          {deck.title}
        </Text>
        <View style={global.row}>
          <Text
            style={[
              global.cardSubHeader,
              { fontWeight: "bold", paddingRight: 4 }
            ]}
          >
            {index + 1}
          </Text>
          <Text style={global.cardSubHeader}>of {deck.question.length}</Text>
        </View>
      </View>
    );
  };

  renderQuestion = (index, deck) => (
    <View style={global.rowCenter}>
      {this.renderHeader(index, deck)}

      <Text style={[global.cardHeader, { marginBottom: 40 }]}>
        {deck.question[index].question}
      </Text>

      <TouchableOpacity
        onPress={this.toggleShowAnswer}
        style={[global.buttonStyle, { borderColor: yellow }]}
      >
        <Text style={[global.buttonText, { color: yellow }]}>
          Show Me The Answer
        </Text>
      </TouchableOpacity>
    </View>
  );

  //-----------------------------------

  renderAnswer = (index, deck) => (
    <View style={global.rowCenter}>
      {this.renderHeader(index, deck)}

      <Text style={[global.cardHeader, { marginBottom: 40 }]}>
        {deck.question[index].answer}
      </Text>

      <InputButton
        backgroundColor={"transparent"}
        borderColor={"transparent"}
        color={cream}
        onPress={this.toggleShowAnswer}
      >
        Show Question
      </InputButton>

      <InputButton
        backgroundColor={cream}
        borderColor={cream}
        color={charcoal}
        onPress={() => this.incrementAnswers("correctAnswers")}
      >
        Correct
      </InputButton>
      <InputButton
        backgroundColor={tan}
        borderColor={tan}
        color={cream}
        onPress={() => this.incrementAnswers("incorrectAnswers")}
      >
        Incorrect
      </InputButton>
    </View>
  );

  //--------------------------------------------

  renderScore = () => {
    clearLocalNotification().then(setLocalNotification());
    return (
      <View style={global.rowCenter}>
        <Text style={[global.cardSubHeader, { marginBottom: 5 }]}>
          Correct Answers: {this.state.correctAnswers}
        </Text>
        <Text style={[global.cardSubHeader, { marginBottom: 5 }]}>
          Incorrect Answers: {this.state.incorrectAnswers}
        </Text>
        <Text style={[global.cardHeader, { marginBottom: 40 }]}>
          Total Score:{" "}
          {(
            (this.state.correctAnswers / this.props.deck.question.length) *
            100
          ).toFixed()}
          %
        </Text>
        <InputButton borderColor={cream} color={cream} onPress={this.reset}>
          Take it again!
        </InputButton>
        <InputButton
          backgroundColor={cream}
          borderColor={cream}
          color={charcoal}
          onPress={() =>
            this.props.navigation.navigate("Deck", {
              deckId: this.props.deckId
            })
          }
        >
          Back To Deck
        </InputButton>
      </View>
    );
  };

  incrementAnswers = key => {
    this.toggleShowAnswer();
    this.setState(state => ({
      ...state,
      [key]: state[key] + 1,
      questionIndex: state.questionIndex + 1
    }));
  };

  toggleShowAnswer = () => {
    this.setState(state => ({
      ...state,
      showAnswer: !state.showAnswer
    }));
  };

  reset = () => {
    this.setState(() => ({
      questionIndex: 0,
      showAnswer: false,
      correctAnswers: 0,
      incorrectAnswers: 0
    }));
  };

  render() {
    const { deck } = this.props;
    const { questionIndex, showAnswer } = this.state;

    return (
      <View style={{ backgroundColor:yellow, padding: 10, flex: 1 }}>
        {showAnswer === false
          ? questionIndex < deck.question.length
            ? this.renderQuestion(questionIndex, deck)
            : this.renderScore()
          : this.renderAnswer(questionIndex, deck)}
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

export default connect(mapStateToProps)(Quiz);
