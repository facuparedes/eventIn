import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: 350,
    marginTop: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#6ad5ce",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "gray",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginHorizontal: 30,
    marginVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 290,
    height: 150,
    borderRadius: 10,
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
