import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  updateBtn: {
    backgroundColor: "#00BD9D",
    width: width * 0.55,
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
    fontSize: 18,
  },
  display: {
    display: "flex",
    alignSelf: "center",
  },
  all: {
    marginTop: height * 0.05,
  },
  containerInput: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
    width: "90%",
    marginLeft: width * 0.02,
  },
  textInput: {
    paddingLeft: 10,
  }
});

export default styles;
