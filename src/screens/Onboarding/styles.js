import { StyleSheet, Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");

export const colorPallete = { first: "#2968c0", second: "#298bc4", third: "#29adbf", fourth: "#6ad5ce", fifth: "#d7eae9" };

export const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: "center",
  },
  dotContainer: {
    flexDirection: "row",
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    borderRadius: 12,
    backgroundColor: colorPallete.third,
    marginHorizontal: 6,
  },
  dotRootContainer: {
    position: "absolute",
    bottom: height > 700 ? "27%" : "20%",
  },
  btnStart: {
    height: 50,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  btnLogin: {
    height: 50,
    borderRadius: 30,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colorPallete.third,
    backgroundColor: "transparent",
  },
  btnRegister: {
    height: 50,
    borderRadius: 30,
    backgroundColor: colorPallete.third,
  },
});
