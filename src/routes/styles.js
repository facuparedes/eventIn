import { Dimensions, StyleSheet } from "react-native";
import { colorPallete } from "../screens/Onboarding/styles";

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
  buttons: {
    backgroundColor: colorPallete.third,
    width: width * 0.65,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textLogout: {
    fontFamily: "Gotham-Medium",
    fontSize: 16,
    color: "white",
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
  direction: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  display: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    marginVertical: height * 0.03,
  },
  text: {
    flex: 2,
    justifyContent: "flex-start",
  },
  icon: {
    flex: 1,
    justifyContent: "center",
  },
  actionSheet: {
    height: height * 0.4,
  },
});

export default styles;
