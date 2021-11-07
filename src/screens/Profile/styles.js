import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
    },
    profileInfo: {
        display: "flex",
        flexDirection: "row",
        marginTop: 100,
        paddingHorizontal: 29,
    },
    info: {
        marginLeft: 40,
        marginTop: 50,
    },
    imageContainer: {
        width: 100,
        height: 200,
    },
    containerEdit: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginTop: 30
    },
    edit: {
        paddingHorizontal: 20,
        borderRadius: 90,
        backgroundColor: '#306BAC',
        height: 28,
    },
    textEdit: {
        alignSelf: 'center',
        paddingTop: 3,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default styles;