import { StyleSheet } from 'react-native';
// .color1 {color: #2968c0;}
// .color2 {color: #298bc4;}
// .color3 {color: #29adbf;}
// .color4 {color: #6ad5ce;}
// .color5 {color: #d7eae9;}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 8
    },
    // textAndImg: {
    //     flex: 1
    // },
    titleText: {
        textAlign: 'left'
    },
    logoImage: {
        resizeMode: 'contain',
        height: 80,
        width: 80,
        marginLeft: 280,
        alignContent: 'space-between'
    },
    input: {
        backgroundColor: '#fff',
        borderColor: 'black',
        borderRadius: 4,
        paddingLeft: 9,
        marginBottom: 2,
        borderWidth: 1,
        alignItems: 'center',
        //borderBottomColor: 'green'
    },
    label: {
        marginBottom: 1,
        color: 'black',
        fontWeight: 'normal'
    },
    inputCont: {
        borderBottomWidth: 0,
        marginRight: 20
    },
    inputError: {
        backgroundColor: '#d7eae9',
        borderColor: 'red',
        borderRadius: 14,
        paddingLeft: 12,
        marginBottom: 5,
        borderWidth: 2,
        marginTop: 1,
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#6ad5ce',
        height: 50,
        width: 200,
        // paddingLeft: 5,
        paddingHorizontal: 4,
        paddingBottom: 10,
        // paddingRight: 5,
        paddingTop: 10,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
        // borderWidth: 1,
        // borderColor: 'black'
    },
    categoriesView: {
        flex: 1,
        flexDirection: 'row'
    },
    btnCategories: {
        backgroundColor: '#fff',
        height: 30,
        width: 180,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 15,
        borderWidth: 1.5,
        borderColor: '#6ad5ce'
    },
    catIcon: {
        marginRight: 8
    },
    textCat: {
        alignSelf: 'flex-start',
        paddingLeft: 12,
        paddingTop: 2,
        fontSize: 16,
    },
    btnsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtn: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    btnContainer: {
        paddingRight: 25,
        paddingLeft: 25
    },
    textType: {
        alignSelf: 'flex-start',
        marginLeft: 8,
        marginBottom: 8,
        fontSize: 16
    },
    checkBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    boxcont: {
        borderWidth: 0,
        backgroundColor: '#fff',
        fontWeight: '100'
    },
    text: {
        //    marginLeft:20,
        marginBottom: 10
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    icn: {
        // position:'absolute',
        alignItems: 'flex-start'
        // marginLeft:8,
        // marginTop:326,
        // marginTop:12
    },
    lefticn: {
        // marginLeft:1
        // position:'absolute',
        alignItems: 'center'
    },
    calendarContainer: {
        // flexDirection: 'row',
        // marginBottom: 35,
        // marginTop: 5,
        marginHorizontal: 6
    },
    calendar: {
        marginLeft: 10,
        // marginTop:2
    },
    inputHoraContainer: {
        borderBottomWidth: 0,
        marginRight: 40,
    },
    reloj: {
        marginRight: 40,
        marginBottom: 8

        // marginBottom:100,
        // position:'absolute'
    },
    horaCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginLeft: 8
    }
})

export default styles;