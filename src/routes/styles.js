import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonLogin: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 120,
    marginTop: 5,
    marginBottom: -10,
    marginRight: 10,
    borderRadius: 4
  },
  textLogin: {
    padding: 4,
    marginTop: -1,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white'
  },
  buttonLogout: {
    backgroundColor: 'black',
    width: 120,
    borderRadius: 4,
    marginRight: 7
  },
  textLogout: {
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  }
})

export default styles;