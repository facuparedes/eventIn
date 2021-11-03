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
        marginTop: 5
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
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#00BD9D',
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#00BD9D',
        fontWeight: '700',
        fontSize: 16
    }
})

export default styles;