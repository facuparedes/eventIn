import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  card_header: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
  },
  card_header_title_description: {
    color: "rgba(0, 0, 0, 0.6)",
    marginTop: 5,
  },
  card_header_title: {
    fontSize: 18,
    color: "#000",
  },
  card_body: {
    width: "100%",
  },
  card_body_image: {
    position: "relative",
    width: "100%",
    height: windowHeight / 2.5,
  },
  card_body_date: {
    position: "absolute",
    right: 0,
    fontSize: 14,
    color: "white",
    marginHorizontal: 5,
    marginVertical: 8,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  card_body_date_active: {
    backgroundColor: "#6ad5ce",
    color: "white",
  },
});
