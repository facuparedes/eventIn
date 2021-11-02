import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    view:{
     flex: 1, alignContent: "center", justifyContent: "center" 
    },
    view2:{
        backgroundColor:'#6ad5ce',
        flex:1,
        padding:'10%',
        borderRadius:30,
        marginTop:'15%',
        marginBottom:'15%',
        marginLeft:'3%',
        marginRight:'3%',
        flexDirection:'column'
    },
    img:{
        resizeMode: "contain", 
        height: 250, 
        width: "100%" ,
        borderRadius:30,
        justifyContent:'center',
        alignSelf:'center',
        
        
    },
    title:{
        flex:1,
        justifyContent: "center",
        fontSize:30,  
        alignSelf:'center',

    },
})
export default styles