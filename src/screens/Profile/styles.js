import { Dimensions, StyleSheet } from "react-native";
import { colorPallete } from "../Onboarding/styles";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width * 0.3,
    height: height * 0.15,
    borderRadius: width * 0.3,
  },
  profileInfo: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    marginLeft: width * 0.1,
    marginTop: height * 0.05,
  },
  containerEdit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 30,
  },
  edit: {
    paddingHorizontal: 20,
    borderRadius: 90,
    backgroundColor: "#306BAC",
    height: 28,
  },
  textEdit: {
    alignSelf: "center",
    paddingTop: 3,
    color: "white",
    fontWeight: "bold",
  },
  username: {
    fontFamily: "Gotham-Medium",
    fontSize: 20,
    color: colorPallete.first,
    justifyContent: "center",
    marginTop: height * 0.01,
  },
  favs: {
    flex: 4,
    alignItems: "center",
  },
  containerFlatList: {
    flex: 20,
  },
  borderF: {
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: width * 0.025,
    height: "95%",
    width: width * 0.95,
    backgroundColor: "white",
    borderColor: "white",
    elevation: 7,
  },
  imgFlat: {
    resizeMode: "cover",
    position: "relative",
    width: width / 1.2,
    height: height / 4.2,
    borderRadius: 10,
    alignSelf: "center",
  },
  title: {
    color: colorPallete.second,
    fontSize: 15,
    fontFamily: "Gotham-Medium",
  },
  description: {
    color: "#5c6066",
    fontFamily: "Gotham-Book",
  },
  btnsCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: height * 0.06,
    borderRadius: 10,
    width: width * 0.95,
  },
  eventBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  eventBtn1: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "100%",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  textBtn: {
    fontFamily: "Gotham-Bold",
    fontSize: 16,
  },
});

export default styles;
