import { StyleSheet } from "react-native";

// first: "#2968c0", second: "#298bc4", third: "#29adbf", fourth: "#6ad5ce", fifth: "#d7eae9" };

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
    },
    img: {
        resizeMode: "cover",
        height: 250,
        width: "136%",
        borderRadius: 4,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    title: {
        fontSize: 30,
        marginBottom: 10,
        borderTopWidth: 1,
        marginLeft: 0,
        paddingTop: 16,
        borderTopColor: '#6ad5ce'
    },
    viewLine: {
        borderBottomWidth: 2,
    },
    viewTitle: {
        alignSelf: 'flex-start',
        backgroundColor: '#d7eae9'
    },
    bold: {
        fontWeight: 'bold'
    },
    viewCont: {
        flexDirection: 'row',
        fontSize: 20,
        marginTop: 4
    },
    textConts: {
        marginLeft: 6,
        marginTop: 10
    },
    viewContLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#6ad5ce',
        marginLeft: 0
    }
});

export default styles;