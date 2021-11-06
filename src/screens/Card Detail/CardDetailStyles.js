import { StyleSheet, Dimensions } from "react-native";
import { colorPallete } from "../Onboarding/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
  },
  viewCont: {
    marginTop: 4,
  },
  header: {
    width: "100%",
    height: height * 0.36,
    paddingTop: 20,
  },
  btnBackBg: {
    position: "absolute",
    paddingTop: height * 0.04,
    paddingLeft: width * 0.03,
  },
  btnBack: {
    position: "absolute",
    paddingTop: height * 0.043,
    paddingLeft: width * 0.035,
  },
  btnLikeBackground: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    alignSelf: "flex-end",
    paddingTop: height * 0.23,
  },
  btnLike: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingTop: height * 0.246,
    paddingRight: width * 0.037,
  },
  btnShare: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingTop: height * 0.303,
    paddingRight: width * 0.04,
  },
  img: {
    position: "relative",
    resizeMode: "cover",
    width: width / 1,
    height: height / 2.7,
    justifyContent: "center",
    alignSelf: "center",
  },
  body: {
    backgroundColor: "white",
    width: "100%",
    height: height * 0.615,
    alignSelf: "center",
    borderRadius: 30,
  },
  contentTitled: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Gotham-Medium",
    fontSize: 26,
  },
  fee: {
    fontFamily: "Gotham-Bold",
    fontSize: 22,
  },
  dataContain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBody: {
    fontFamily: "Gotham-Light",
    fontSize: 15,
  },
  location: {
    fontFamily: "Gotham-LightItalic",
    fontSize: 15,
    color: "blue",
    textDecorationLine: "underline",
  },
  maps: {
    height: height * 0.1,
    width: width * 0.2,
    borderRadius: 10,
  },
  descContent: {
    flex: 2,
  },
  subTitle: {
    fontFamily: "Gotham-Bold",
    fontSize: 16,
    marginTop: 10,
  },
  gallery: {
    flex: 3,
    flexDirection: "row",
  },
  imgContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  imgIzq: {
    resizeMode: "contain",
    width: width * 0.4,
    height: height * 0.13,
    borderRadius: 20,
  },
  imgDer: {
    resizeMode: "contain",
    width: width * 0.45,
    height: height * 0.247,
    borderRadius: 20,
  },
});

export default styles;
