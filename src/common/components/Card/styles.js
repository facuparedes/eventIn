import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "70%",
    marginTop: "3%",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#6ad5ce",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "gray",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginHorizontal: "6%",
    marginVertical: "1%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
    height: 150,
    borderRadius: 10,
    resizeMode: "stretch"
  },
  title: {
    fontSize: 18,
    color: "white",
  },
  text: {
    fontSize: 14,
    color: "gray",
  },
});
