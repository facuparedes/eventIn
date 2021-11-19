import { StyleSheet } from "react-native";
import { width, height, colorPallete } from "../../Onboarding/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
  },
  textHeader: {
    fontSize: 20,
  },
  titleText: {
    textAlign: "center",
    marginVertical: 10,
  },
  txts: {
    fontFamily: "Gotham-Medium",
    fontSize: 18,
    color: colorPallete.second,
    paddingHorizontal: width * 0.03,
  },
  dateCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
    marginLeft: 30,
    width: "90%",
  },
  dateInput: {
    marginRight: 40,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "black",
    borderRadius: 4,
    alignItems: "center",
    fontSize: 15,
  },
  label: {
    marginBottom: 1,
    color: "black",
    fontWeight: "normal",
    fontSize: 18,
  },
  calendar: {
    marginRight: 40,
    marginBottom: 8,
  },
  daysCont: {
    flex: 1,
    width: width * 1,
    marginBottom: height * 0.02,
  },
  timeCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 20,
    marginLeft: 30,
    width: "90%",
  },
  clock: {
    marginRight: 40,
    marginBottom: 8,
  },
  timeInput: {
    marginRight: 40,
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: colorPallete.fourth,
    width: width * 0.35,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    marginHorizontal: width * 0.03,
    marginTop: height * 0.02,
  },
  picker: {
    alignSelf: "center",
    width: "100%",
    color: "black",
  },
  txtValue: {
    fontFamily: "Gotham-Bold",
    fontSize: 30,
    marginHorizontal: width * 0.03,
  },
  btnsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-30%",
  },
  btn: {
    backgroundColor: "#00BD9D",
    height: 50,
    width: 160,
    paddingHorizontal: 4,
    paddingTop: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  textBtn: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default styles;
