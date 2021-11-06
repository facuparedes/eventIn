import { StyleSheet ,Dimensions } from 'react-native';
// .color1 {color: #2968c0;}
// .color2 {color: #298bc4;}
// .color3 {color: #29adbf;}
// .color4 {color: #6ad5ce;}
// .color5 {color: #d7eae9;}
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 8
    },
    logoImage: {
        resizeMode: 'contain',
        height: 60,
        width: 80,
        marginLeft: 100
    },
    textAndImg: {
        flexDirection: 'row',
        height: 60,
        marginBottom:70,
        marginTop:10
    },
    card_body_image: {
        position: "relative",
        // width: "100%",
        // height: windowHeight / 2.5,
        width: windowWidth / 1.17,
        height: windowHeight / 3.4,
        borderRadius: 15,
      },
      titleText: {
        textAlign: 'left',
        marginTop: 10
    },
    card_body: {
        width: "100%",
      },
    cardContainer:{
        flex:1,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        elevation: 10,
        // alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 15,
        paddingVertical:70,
        marginTop:10,
        marginBottom:10,
        // marginVertical: 45,
    },
    cardItems:{
        alignItems:'flex-start',
        justifyContent:'space-evenly',
        padding:7
    },
    card_header:{
    // flex: 1,
    paddingHorizontal: 6,
    // paddingVertical: 10,
    width: "100%",
    },
    card_header_title: {
        fontFamily: "Gotham-Medium",
        fontSize: 20,
        // color: "#000",
        color: '#298bc4',
    },
    card_header_description: {
        color: "#5c6066",
        fontFamily: "Gotham-Book",
        fontSize: 15,
      },
      card_body_date: {
        position: "absolute",
        right: 15,
        fontSize: 14,
        color: "white",
        marginHorizontal: 5,
        marginVertical: 8,
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
      },
      card_body_date_active: {
        backgroundColor: "#6ad5ce",
        color: "white",
        
      },
      card_boton:{
        flexDirection:'row',
        marginTop:5,
        marginRight:250,
        justifyContent:'space-evenly',
      }
})
export default estilos