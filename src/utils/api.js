import { AsyncStorage } from "react-native";

import { CARD_STORAGE_KEY, createDeck } from "./helpers";

export const addCard = async (deckTitle, newCard) => {
  try {
    AsyncStorage.getItem(CARD_STORAGE_KEY).then(data => {
      const stack = JSON.parse(data);
      const updateQuestion = stack[deckTitle].question.concat([newCard]);
      const createdDeck = createDeck(deckTitle, updateQuestion);
      AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify(createdDeck));
      return createdDeck;
    });
  } catch (error) {
    console.warn("Error adding card on Deck: ", error);
  }
};

export const saveDeck = async deckTitle => {
  const createdDeck = createDeck(deckTitle);
  try {
    AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify(createdDeck));
    return createdDeck;
  } catch (error) {
    console.warn("Error Adding Deck to Stack: ", error);
  }
};

export const receiveDecks = async id => {
  try {
    AsyncStorage.getItem(CARD_STORAGE_KEY).then(data => {
      const stack = JSON.parse(data);
      return typeof id === "undefined" ? stack : stack[id];
    });
  } catch (error) {
    console.warn("Error Getting Deck from Stack: ", error);
  }
};
