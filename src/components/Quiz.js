import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import InputButton from "./InputButton";

import { MaterialCommunityIcons as MCI } from "@expo/vector-icons";

import {
  charcoal,
  cream,
  tan,
  yellow,
  blue,
  white,
  red,
  dark
} from "../utils/colors";
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

  incrementAnswers = key => {
    this.setState(state => ({
      ...state,
      showAnswer: !state.showAnswer,
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

  renderQuestion = (index, deck) => (
    <View style={global.rowCenter}>
      {this.renderHeader(index, deck)}

      <Text style={[global.cardHeader, { marginBottom: 40 }]}>
        {deck.question[index].question}
      </Text>

      <TouchableOpacity
        onPress={this.toggleShowAnswer}
        style={[global.buttonStyle, { borderColor: blue }]}
      >
        <Text style={[global.buttonText, { color: blue }]}>
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

      <TouchableOpacity
        onPress={this.toggleShowAnswer}
        style={[global.buttonStyle, { borderColor: blue }]}
      >
        <Text style={[global.buttonText, { color: blue }]}>
          Show Me The Question
        </Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 32, marginBottom: 50, fontSize: 24 }}>
        How was your response?
      </Text>

      <View
        style={[global.row, { justifyContent: "space-between", width: "40%" }]}
      >
        <TouchableOpacity
          onPress={() => this.incrementAnswers("incorrectAnswers")}
          style={[
            global.roundButtonStyle,
            global.center,
            { backgroundColor: red }
          ]}
        >
          <MCI name="thumb-down-outline" size={28} color={white} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.incrementAnswers("correctAnswers")}
          style={[
            global.roundButtonStyle,
            global.center,
            { backgroundColor: blue }
          ]}
        >
          <MCI name="thumb-up-outline" size={28} color={white} />
        </TouchableOpacity>
      </View>
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

        <TouchableOpacity onPress={this.reset}>
          <Text style={[global.buttonStyle, { color: dark }]}>Start again</Text>
        </TouchableOpacity>

        <InputButton
          backgroundColor={cream}
          borderColor={cream}
          color={charcoal}
          onPress={() => this.props.navigation.navigate("Deck")}
        >
          Back To Deck
        </InputButton>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Deck")}
          style={[global.buttonStyle]}
        >
          <Text style={{ color: dark }}>Back To Deck</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { deck } = this.props;
    const { questionIndex, showAnswer } = this.state;

    return (
      <View style={{ backgroundColor: yellow, padding: 10, flex: 1 }}>
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
