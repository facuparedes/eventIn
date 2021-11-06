import { StyleSheet, Dimensions } from 'react-native';

export const { width, height } = Dimensions.get("screen");


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EEEE',
    height: 35,
    flexDirection: 'row',
    marginTop: 2,
    marginRight: 16,
    borderRadius: 40
  },
  textInput: {
    width: width / 2.5,
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
    color: '#080808',
    paddingLeft: 3,
  },
  iconStyle: {
    fontSize: 27,
    alignSelf: 'center',
    marginRight: 6,
    marginTop: -1
  },
  touchableOpacity: {
    marginTop: 4
  }

})