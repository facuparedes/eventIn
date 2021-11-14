import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        alignItems: 'center',
    },
    textHeader: {
        fontSize: 20,
    },
    titleText: {
        textAlign: 'center',
        marginVertical: 10
    },
    txts: {
        fontWeight: 'bold',
        marginLeft: 10
    },
    dateCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 30,
        marginLeft: 30,
        width: '90%'
    },
    dateInput: {
        marginRight: 40
    },
    input: {
        backgroundColor: '#fff',
        borderColor: 'black',
        borderRadius: 4,
        alignItems: 'center',
        fontSize: 15,
    },
    label: {
        marginBottom: 1,
        color: 'black',
        fontWeight: 'normal',
        fontSize: 18
    },
    calendar: {
        marginRight: 40,
        marginBottom: 8
    },
    daysCont: {
        marginLeft: 10,
        marginBottom: 20,
    },
    pickerContainer: {
        backgroundColor: '#fff',
        marginTop: 8,
        alignItems: "center",
        width: "38%",
        height: 30,
        justifyContent: "center",
        borderRadius: 5,
        paddingBottom: 2,
        borderWidth: 2,
        borderColor: '#298bc4',
        marginLeft: 10,
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
    txtValue: {
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 30
    },
    btnsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "-30%",
    },
    btn: {
        backgroundColor: '#00BD9D',
        height: 50,
        width: 160,
        paddingHorizontal: 4,
        paddingTop: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10
    },
    textBtn: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default styles;