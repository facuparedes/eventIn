import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image} from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";

export default function Profile() {
    const navigation = useNavigation()

    return(
        <SafeAreaView>
            <View style={styles.profileInfo}>
                <Image style={styles.image} source={{uri:"https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"}}/>
                <View style={styles.info}>
                    <Text >Juan jausoro</Text>
                    <Text style={{color:"lightgrey"}}>juanjauso@gmail.com</Text>
                </View>
            </View>
            <View style={styles.containerEdit}>
                <TouchableOpacity style={styles.edit} onPress={()=>{navigation.navigate("EditProfile")}}>
                    <Text style={styles.textEdit}>Editar perfil</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
    
}