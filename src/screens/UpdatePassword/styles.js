import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  container2: {
    marginTop: 100
  },
  backArrow: {
    marginTop: -30,
  },
  passContainer: {
    marginTop: 50,
    marginRight: 20
  },
  newPassCont: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  inputViewCont: {

  },
  inputCont: {
    width: 310
  },
  eyeBtn: {
    bottom: 10,
    zIndex: 3,
    marginLeft: -3,
  },
  passWarnYellow: {
    color: '#ffb400',
    fontSize: 12,
    marginLeft: 10,
    marginTop: -25,
    marginBottom: 20
  },
  passWarnGreen: {
    color: 'green',
    fontSize: 12,
    marginLeft: 10,
    marginTop: -25,
    marginBottom: 20
  },
  passWarnRed: {
    color: '#b70000',
    fontSize: 12,
    marginLeft: 10,
    marginTop: -25,
    marginBottom: 20
  },
  btn: {
    backgroundColor: "#00BD9D",
    width: width * 0.5,
    borderRadius: 4,
    height: height * 0.06,
    marginTop: height * 0.02,
    justifyContent: 'center',
    marginLeft: 10
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 17
  },
});

export default styles;
