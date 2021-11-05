import { StyleSheet, Dimensions } from 'react-native';

export const { width, height } = Dimensions.get("screen");


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EEEE',
    height: 35,
    borderRadius: 4,
    width: width/2.0,
    flexDirection: 'row',
    marginTop: 2,
    //alignItems: 'center',
    marginHorizontal: 15,
    //justifyContent: 'center',
  },
  textInput: {
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
    color: '#080808',
  },
  iconStyle: {
    fontSize: 24,
    alignSelf: 'center',
    marginHorizontal: 12,
  },
  touchableOpacity: {
    marginTop: 6,
  }
  
})