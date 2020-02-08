import { AppLoading } from "expo";
import React, { Component } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons as MCI } from "@expo/vector-icons";
import { addStack } from "../actions";
import { getDecks } from "../utils/api";
import { white, yellow, blue, dark } from "../utils/colors";
import { global } from "../utils/globalStyles";

class Stack extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    getDecks()
      .then(stack => this.props.dispatch(addStack(stack)))
      .then(() => this.setState({ ready: true }));
  }

  renderItem = ({ item }) => {
    const { stack } = this.props;
    return (
      <TouchableOpacity onPress={() => this.viewDeck(item)} style={global.card}>
        <Text style={global.cardHeader}>{stack[item].title}</Text>
        <View style={global.row}>
          <MCI name="cards-outline" size={24} color={dark} />
          <Text style={[global.cardSubHeader, {marginLeft: 12}]}>
            ({stack[item].question.length} Cards)
          </Text>
        </View>
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

    if (!ready) {
      return <AppLoading />;
    }

    return (
      <View style={[global.center, { padding: 20, backgroundColor: yellow }]}>
        {deckKeys.length > 0 ? (
          <FlatList
            data={deckKeys}
            keyExtractor={item => item}
            renderItem={this.renderItem}
            style={global.list}
          />
        ) : (
          <View>
            <Text style={[global.header, { color: white }]}>
              There are no decks.
            </Text>
          </View>
        )}

        <TouchableHighlight
          style={[global.fab, global.center, { backgroundColor: blue }]}
          onPress={() => this.props.navigation.navigate("NewDeck")}
        >
          <View style={global.row}>
            <MCI name="cards" size={30} color={white} />
            <Text style={{ marginLeft: 12, color: white }}>Add New Deck</Text>
          </View>
        </TouchableHighlight>
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
