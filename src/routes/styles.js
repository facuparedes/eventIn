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
    backgroundColor: '#306BAC',
    width: 120,
    borderRadius: 4,
    marginRight: 7
  },
  textLogout: {
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  searchIcon: {
    fontSize: 28,
    alignSelf: 'center',
    marginHorizontal: 12,
    backgroundColor: '#F0EEEE',
    borderRadius: 999,
    padding: 4,
  },
  searchContainer: {
    marginRight: 5,
    marginTop: 3
  }
})

export default styles;