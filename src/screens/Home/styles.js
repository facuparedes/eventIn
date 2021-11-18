import { StyleSheet } from "react-native";
import { height, width } from "../Onboarding/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 7,
  },
  picker: {
    alignSelf: "center",
    width: "100%",
    color: "white",
  },
  viewPicker: {
    backgroundColor: "#29adbf",
    marginTop: 3,
    alignItems: "center",
    width: "45%",
    height: 30,
    justifyContent: "center",
    borderRadius: 5,
    paddingBottom: 2,
  },
  datePicker: {
    marginTop: -4,
    alignSelf: "center",
  },
});
