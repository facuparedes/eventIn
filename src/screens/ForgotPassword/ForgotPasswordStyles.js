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
    miniText: {
        alignSelf: 'flex-start',
        marginLeft: 40,
        fontSize: 12
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
        alignItems: 'flex-start',
        marginTop: 4,
        marginRight: 70
    },
    button: {
        backgroundColor: '#00BD9D',
        width: '52%',
        padding: 6,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        flexDirection: 'row'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#00BD9D',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#00BD9D',
        fontWeight: '700',
        fontSize: 16
    },
    closeX: {
        alignSelf: 'flex-start',
        marginTop: -200,
        marginBottom: 160,
        marginLeft: 10
    }
})

export default styles;