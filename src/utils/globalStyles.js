import { StyleSheet } from "react-native";

import { white, charcoal, cream, gray, tan } from "./colors";

export const global = StyleSheet.create({
  buttonStyle: {
    width: "80%",
    borderRadius: 50,
    borderWidth: 3,
    padding: 15,
    marginBottom: 15
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    textTransform: 'uppercase'
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    backgroundColor: charcoal
  },
  cardHeader: {
    color: cream,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 8
  },
  cardSubHeader: {
    color: tan,
    fontSize: 16,
    textAlign: "center"
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  header: {
    color: cream,
    fontSize: 50,
    fontWeight: "700"
  },
  inputField: { // todo delete
    height: 50,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    paddingRight: 10,
    paddingLeft: 10,
    color: cream
  },
  inputFloat: {
    height: 52,
    backgroundColor: 'transparent',
    color: white,
    borderWidth: 0,
    borderBottomColor: white,
    borderBottomWidth: 2,
    fontSize: 24,
    width: "80%",
    marginBottom: 32
  },
  list: {
    alignSelf: "flex-start",
    marginTop: 50,
    width: "100%"
  },
  subHeader: {
    color: cream,
    fontSize: 40,
    textAlign: "center"
  },
  title: {
    marginBottom: 30,
    color: tan,
    fontSize: 30
  },
  wrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
