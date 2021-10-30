import { StyleSheet } from 'react-native';
// .color1 {color: #2968c0;}
// .color2 {color: #298bc4;}
// .color3 {color: #29adbf;}
// .color4 {color: #6ad5ce;}
// .color5 {color: #d7eae9;}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#298bc4',
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    input: {
        backgroundColor: '#d7eae9',
        borderColor: 'black',
        borderRadius: 14,
        paddingLeft: 12,
        marginBottom: 5,
        borderWidth: 3,
        marginTop: 1,
        alignItems: 'center',
        //borderBottomColor: 'green'
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
    header: {
        fontSize: 30,
        position: 'absolute',
        // backgroundColor: '#f4efec',
        borderRadius: 50,
        padding: 15,
    },
    headerContainer: {
        alignItems: 'flex-start'
    },
    btn: {
        backgroundColor: '#2968c0',
        // paddingLeft: 5,
        paddingHorizontal: 4,
        paddingBottom: 10,
        // paddingRight: 5,
        paddingTop: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'black'
    },
    btnContainer: {
        paddingRight: 25,
        paddingLeft: 25
    },
    label: {
        marginBottom: 3,
        color: 'black',

    },
    inputcont: {
        borderBottomWidth: 0,
        marginHorizontal: 2,
    },
    checkBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    boxcont: {
        backgroundColor: '#d7eae9',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 15
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
        marginRight: 55,
    },
    reloj: {
        marginRight: 35
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