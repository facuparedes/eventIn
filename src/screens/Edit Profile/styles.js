import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    display: "flex",
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 1,
  },
  profileInfo: {
    display: "flex",
    marginTop: 30,
    alignItems: "center",
    flexDirection: "column",
  },
  btn: {
    display: "flex",
    margin: 25,
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerInput: {
    flexDirection: "row",
    marginTop: 13,
    marginBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
    width: "90%",
  },
  textInput: {
    flex: 1,
    // marginTop: -3,
    paddingLeft: 10,
    color: "#05375a",
  },
  commandButton: {
    width: 170,
    height: 40,
    // padding: 8,
    borderRadius: 6,
    backgroundColor: "#00BD9D",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  btnSubir: {
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 16
    //backgroundColor: 'black',
    // height: 50,
    // marginLeft: 10,
  },
  containerTxt: {
    alignSelf: "center",
    justifyContent: "center",
  },
  containerIcon: {
    flex: 1,
  },
});
