import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#bedbef',
        paddingTop: 50,
        paddingHorizontal: 12,
       
    },
    input: {
        backgroundColor: '#f4efec',
        borderColor: 'black',
        borderRadius: 14,
        paddingLeft: 12,
        marginBottom: 5,
        borderWidth: 3,
        marginTop: 1,
        alignItems: 'center',
        //borderBottomColor: 'green'


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
        backgroundColor: '#0091ff',
        // paddingLeft: 5,
        paddingHorizontal: 5,
        paddingBottom: 10,
        // paddingRight: 5,
        paddingTop: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15
    },
    btnContainer: {
        paddingRight: 25,
        paddingLeft: 25
    },
    label: {
        marginBottom: 3
    },
    inputcont: {
        borderBottomWidth: 0
    },
    checkBox:{
        flexDirection:'row',
        justifyContent:'space-between'
    }


})

export default styles