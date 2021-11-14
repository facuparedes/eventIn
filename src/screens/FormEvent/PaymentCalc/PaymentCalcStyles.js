import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    textHeader: {
        fontSize: 20,
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
    btnsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "10%",
    },
});

export default styles;