export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const ADD_STACK = 'ADD_STACK';

export function addNewCard(deckId, newCard) {
  return {
    type: ADD_CARD,
    deckId,
    newCard,
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function addStack(stack) {
  return {
    type: ADD_STACK,
    stack,
  };
}