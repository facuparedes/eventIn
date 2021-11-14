import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

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
    width: width * 0.6,
    borderRadius: 4,
    marginHorizontal: 63,
    marginVertical: 15,
  },
  textLogout: {
    flexDirection: "row",
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
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
  direction: { display: "flex", flexDirection: "row", padding: 8, alignSelf: "center" },
  display: {
    alignItems: "center",
    flexDirection: "column",
    marginBottom: height * 0.2,
    marginTop: height * 0.1,
    height: height * 0.25,
  },
  text: {
    flex: 2,
    justifyContent: "center",
  },
  icon: {
    flex: 1,
    justifyContent: "center",
  },
});

export default styles;
