import { AppLoading } from "expo";
import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View, Button } from "react-native";
import { connect } from "react-redux";

import { addNewStack } from "../actions";
import { getDecks } from "../utils/api";
import { cream } from "../utils/colors";
import { global } from "../utils/globalStyles";

class Stack extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    getDecks()
      .then(stack => this.props.dispatch(addNewStack(stack)))
      .then(() => this.setState({ ready: true }));
  }

  renderItem = ({ item }) => {
    const { stack } = this.props;
    return (
      <TouchableOpacity onPress={() => this.viewDeck(item)} style={global.card}>
        <Text style={global.cardHeader}>{stack[item].title}</Text>
        <Text style={global.cardSubHeader}>
          ({stack[item].question.length} Cards)
        </Text>
      </TouchableOpacity>
    );
  };

  viewDeck = deckId => {
    this.props.navigation.navigate("Deck", { deckId });
  };

  render() {
    const { stack } = this.props;
    const { ready } = this.state;
    const deckKeys = Object.keys(stack);

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <View style={[global.center, { padding: 20 }]}>
        {deckKeys.length > 0 ? (
          <FlatList
            data={deckKeys}
            keyExtractor={item => item}
            renderItem={this.renderItem}
            style={global.list}
          />
        ) : (
          <Text style={[global.header, { color: cream }]}>
            There are no decks.
          </Text>
        )}

        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate("NewDeck")}
        />
      </View>
    );
  }
}

function mapStateToProps(stack) {
  return {
    stack
  };
}

export default connect(mapStateToProps)(Stack);
