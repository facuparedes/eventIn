import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonLogin: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#306BAC",
    width: 120,
    marginTop: 5,
    marginBottom: -10,
    marginRight: 10,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textLogin: {
    padding: 4,
    marginTop: -1,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
  },
  buttonLogout: {
    backgroundColor: "#00BD9D",
    width: 200,
    borderRadius: 4,
    marginHorizontal: 100,
    marginVertical: 15,
  },
  textLogout: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  searchIcon: {
    fontSize: 28,
    alignSelf: "center",
    marginHorizontal: 12,
    backgroundColor: "#F0EEEE",
    borderRadius: 999,
    padding: 4,
  },
  searchContainer: {
    marginRight: 5,
    marginTop: 3,
  },
  containerEdit: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  direction: { display: "flex", flexDirection: "row", padding: 10, alignSelf: "center" },
});

export default styles;
