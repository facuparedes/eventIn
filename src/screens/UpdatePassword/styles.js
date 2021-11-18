import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  updateBtn: {
    backgroundColor: "#00BD9D",
    width: width * 0.6,
    borderRadius: 4,
    marginTop: height * 0.05,
  },
  textStyle: {
    display: "flex",
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  display: {
    display: "flex",
    alignSelf: "center",
  },
  all: {
    marginTop: height * 0.05,
  },
});

export default styles;
