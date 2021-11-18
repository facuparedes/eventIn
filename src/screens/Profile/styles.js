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
    // borderWidth: 1,
    borderRadius: width * 0.3,
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    marginTop: height * 0.05,
    //paddingHorizontal: width * 0.07,
    alignItems: "center",
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
    fontSize: 20,
    justifyContent: "center",
    marginTop: height * 0.01,
  },
  favs: {
    height: height * 0.6,
  },
  containerFlatList: {
    flex: 20
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
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    height: 30
  },
  eventBtn: {
    alignSelf: 'center'
  },
  textBtn: {
    fontWeight: 'bold',

  },
  middleView: {
    borderWidth: 1,
    marginHorizontal: -15
  }
});

export default styles;
