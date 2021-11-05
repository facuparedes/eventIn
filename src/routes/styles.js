import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 120,
    marginTop: 5,
    marginBottom: -10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 4
  },
  logText: {
    padding: 4,
    marginTop: -1,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white'
  }
})

export default styles;