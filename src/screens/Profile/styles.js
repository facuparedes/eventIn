import { Dimensions, StyleSheet } from "react-native";

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
  }
});

export default styles;
