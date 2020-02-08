import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons as MCI } from "@expo/vector-icons";
import { yellow, blue, white, red } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import { global } from "../utils/globalStyles";

class Quiz extends Component {
  state = {
    questionIdx: 0,
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

  postAnswer = key => {
    this.setState(state => ({
      ...state,
      showAnswer: !state.showAnswer,
      [key]: state[key] + 1,
      questionIdx: state.questionIdx + 1
    }));
  };

  handleShowHideAnswer = () => {
    this.setState(state => ({
      ...state,
      showAnswer: !state.showAnswer
    }));
  };

  resetQuiz = () => {
    this.setState(() => ({
      questionIdx: 0,
      showAnswer: false,
      correctAnswers: 0,
      incorrectAnswers: 0
    }));
  };

  handleRenderQuestion = (index, deck) => (
    <View style={global.rowCenter}>
      {this.renderHeader(index, deck)}

      <Text style={[global.cardHeader, { marginBottom: 40 }]}>
        {deck.question[index].question}
      </Text>

      <TouchableOpacity
        onPress={this.handleShowHideAnswer}
        style={[global.buttonStyle, { borderColor: blue }]}
      >
        <Text style={[global.buttonText, { color: blue }]}>
          Show Me The Answer
        </Text>
      </TouchableOpacity>
    </View>
  );

  //-----------------------------------

  handleRenderAnswer = (index, deck) => (
    <View style={global.rowCenter}>
      {this.renderHeader(index, deck)}

      <Text style={[global.cardHeader, { marginBottom: 40 }]}>
        {deck.question[index].answer}
      </Text>

      <TouchableOpacity
        onPress={this.handleShowHideAnswer}
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
          onPress={() => this.postAnswer("incorrectAnswers")}
          style={[
            global.roundButtonStyle,
            global.center,
            { backgroundColor: red }
          ]}
        >
          <MCI name="thumb-down-outline" size={28} color={white} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.postAnswer("correctAnswers")}
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

        <TouchableOpacity
          style={[global.buttonStyle, { borderColor: blue }]}
          onPress={this.resetQuiz}
        >
          <Text style={[global.buttonText, { color: blue }]}>Start again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Deck")}
          style={[global.buttonStyle, { color: blue, borderColor: blue }]}
        >
          <Text style={[global.buttonText, { color: blue }]}>Back To Deck</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { deck } = this.props;
    const { questionIdx, showAnswer } = this.state;

    return (
      <View style={{ backgroundColor: yellow, padding: 10, flex: 1 }}>
        {showAnswer === false
          ? questionIdx < deck.question.length
            ? this.handleRenderQuestion(questionIdx, deck)
            : this.renderScore()
          : this.handleRenderAnswer(questionIdx, deck)}
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
