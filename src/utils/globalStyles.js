import { StyleSheet } from "react-native";

import { white, tan, dark } from "./colors";

export const global = StyleSheet.create({
  fab: {
    minWidth: 48,
    height: 48,
    maxHeight: 48,
    borderRadius: 50,
    position: "absolute",
    right: 16,
    bottom: 16,
    padding: 12,
    paddingRight: 20
  },
  roundButtonStyle: {
    borderRadius: 50,
    height: 64,
    width: 64,
    maxHeight: 64,
    maxWidth: 64
  },
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
    textTransform: "uppercase"
  },
  card: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: white,
    width: "auto",
    marginLeft: "auto"
  },
  cardHeader: {
    color: dark,
    fontSize: 30,
    textAlign: "left",
    marginBottom: 8,
    textTransform: "capitalize"
  },
  cardSubHeader: {
    color: dark,
    fontSize: 16,
    textAlign: "left"
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  header: {
    color: white,
    fontSize: 50,
    fontWeight: "700"
  },
  inputFloat: {
    height: 52,
    backgroundColor: "transparent",
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
  title: {
    marginBottom: 30,
    color: tan,
    fontSize: 30
  },
  rowCenter: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
