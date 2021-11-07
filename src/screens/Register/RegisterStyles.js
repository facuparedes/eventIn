import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logoImage: {
        resizeMode: 'contain',
        height: 180,
        width: 180
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#d7eae9',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 5,
        width: '100%'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#00BD9D',
        width: '100%',
        padding: 15,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 5
    },
    buttonOutline: {
        backgroundColor: '#fff',
        marginTop: 5,
        borderColor: '#6ad5ce',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16
    },
    textCta: {
        marginTop: 30
    },
    textToLg: {
        marginTop: 30,
        color: '#00BD9D',
        marginLeft: 4,
        fontWeight: '800'
    },
    loginTxts: {
        flexDirection: 'row'
    },
    viewLine: {
        width: '100%',
        marginTop: 24,
        borderBottomWidth: 1,
    },
    oText: {
        marginTop: -14,
        padding: 4,
        backgroundColor: '#fff',
        marginBottom: 3
    },
    buttonText: {
        color: '#00BD9D',
        fontWeight: 'bold'
    },
    googleLog: {
        flexDirection: 'row'
    },
    googleIcon: {
        marginRight: 14
    },
    inputAndIcon: {
        flexDirection: 'row'
    },
    icon: {
        marginLeft: -32,
        alignSelf: 'center',
        marginBottom: -5
    },
    passWarnYellow: {
        color: '#ffb400',
        fontSize: 12,
        marginLeft: 8,
        marginBottom: -17
    },
    passWarnGreen: {
        color: 'green',
        fontSize: 12,
        marginLeft: 8,
        marginBottom: -17
    },
    passWarnRed: {
        color: '#b70000',
        fontSize: 12,
        marginLeft: 8,
        marginBottom: -17
    }
})

export default styles;