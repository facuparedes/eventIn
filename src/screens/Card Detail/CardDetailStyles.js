import { StyleSheet, Dimensions } from "react-native";
import { colorPallete } from "../Onboarding/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-start",
    backgroundColor: "grey",
  },
  viewCont: {
    fontSize: 20,
    marginTop: 4,
  },
  header: {
    width: "100%",
    height: height * 0.385,
    paddingTop: 20,
  },
  btnBack: {
    position: "absolute",
    paddingTop: 30,
    paddingLeft: 10,
  },
  btnLikeBackground: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    alignSelf: "flex-end",
    paddingTop: height * 0.335,
    paddingRight: width * 0.05,
  },
  btnLike: {
    position: "absolute",
  },
  img: {
    position: "relative",
    resizeMode: "cover",
    width: width / 1,
    height: height / 2.7,
    justifyContent: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    borderTopWidth: 1,
    marginLeft: 0,
    paddingTop: 16,
    borderTopColor: "#6ad5ce",
  },
  viewTitle: {
    alignSelf: "flex-start",
    backgroundColor: "#d7eae9",
  },
  bold: {
    fontWeight: "bold",
  },
  textConts: {
    marginLeft: 6,
    marginTop: 10,
  },
  viewContLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#6ad5ce",
    marginLeft: 0,
  },
});

export default styles;
