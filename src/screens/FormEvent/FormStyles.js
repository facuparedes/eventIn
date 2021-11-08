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
    textAndImg: {
        flexDirection: 'row',
        height: 60,
        marginVertical: 30,
        marginLeft: 8
    },
    titleText: {
        textAlign: 'left',
        marginVertical: 10
    },
    logoImage: {
        resizeMode: 'contain',
        height: 60,
        width: 80,
        marginLeft: 120
    },
    input: {
        backgroundColor: '#fff',
        borderColor: 'black',
        borderRadius: 4,
        // paddingLeft: 9,
        // marginBottom: 2,
        // borderWidth: 1,
        alignItems: 'center',
        //borderBottomColor: 'green'
    },
    label: {
        marginBottom: 1,
        color: 'black',
        fontWeight: 'normal',
        // fontFamily: 'asd'
    },
    inputCont: {
        // borderBottomWidth: 0,
        marginRight: 46
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
        backgroundColor: '#00BD9D',
        height: 50,
        width: 200,
        // paddingLeft: 5,
        paddingHorizontal: 4,
        paddingBottom: 10,
        // paddingRight: 5,
        paddingTop: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
        // borderWidth: 1,
        // borderColor: 'black'
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    categoriesView: {
        flex: 1,
        flexDirection: 'row'
    },
    btnCategories: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        backgroundColor: '#fff',
        height: 36,
        width: 134,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 15,
        borderWidth: 1.5,
        borderColor: '#d7eae9'
    },
    catIcon: {
        marginRight: 8,
        marginTop: 2,
        marginLeft: 6
    },
    textCat: {
        alignSelf: 'flex-start',
        paddingLeft: 12,
        paddingTop: 5,
        fontSize: 16,
    },
    btnsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "10%"
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
    boxCont: {
        borderWidth: 0,
        backgroundColor: '#fff',
        height: 42
    },
    text: {
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
        // borderBottomWidth: 0,
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
    },
    btn2: {
        // backgroundColor: '#298bc4',
        backgroundColor: '#fff',
        height: 42,
        width: '44%',
        paddingHorizontal: 4,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 14,
        marginTop: 5,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#298bc4',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textMaps: {
        color: 'black',
        alignSelf: 'center',
        marginTop: -3,
        fontWeight: 'bold',
        fontSize: 16
    },
    textLoc: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: -20
    },
    arrowIcon: {
        marginBottom: -4
    },
    photosContainer: {
        flexDirection: 'column'
    },
    photosText: {
        marginLeft: 10,
        fontSize: 15,
        marginBottom: 10
    },
    photoBtn: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#298bc4',
        borderRadius: 4,
        width: "100%",
        flexDirection: 'row',
        height: 38,
        marginBottom: 20,
        marginLeft: 9
    },
    textPhotoBtn: {
        marginLeft: 8,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    selectedPhotosText: {
        marginLeft: 9,
        marginBottom: 6
    },
    multimediaBtns: {
        flexDirection: 'row'
    },
    videoBtn: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#298bc4',
        borderRadius: 4,
        width: "83%",
        flexDirection: 'row',
        height: 38,
        marginBottom: 20,
        marginLeft: 40
    },
    textVideoBtn: {
        marginLeft: 8,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    pickerContainer: {
        backgroundColor: '#fff',
        marginTop: 3,
        alignItems: "center",
        width: "38%",
        height: 30,
        justifyContent: "center",
        borderRadius: 5,
        paddingBottom: 2,
        borderWidth: 2,
        borderColor: '#298bc4',
        marginLeft: 9,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    picker: {
        alignSelf: "center",
        width: "100%",
        color: "black"
    },
    cancelBtn: {
        backgroundColor: '#eee',
        height: 50,
        width: 200,
        paddingHorizontal: 4,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    cancelTextBtn: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default styles;