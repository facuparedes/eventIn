import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
    container:{
        flex:1
    },
    image: {
        display:"flex",
        width: 120,
        height: 120,
        borderRadius:60,
        borderWidth:1,
        
        
    },
    profileInfo:{
        display: "flex",
        marginTop:30,
        alignItems:"center",
        flexDirection:"column"
    },
    btn:{
        display:"flex",
        margin: 25,
        marginTop:30,
        flexDirection:"row",
        justifyContent:"space-between"
    }

})