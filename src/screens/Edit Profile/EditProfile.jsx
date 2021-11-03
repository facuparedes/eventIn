import React from "react";
import { View , Text, Image, SafeAreaView} from "react-native";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles"
import { Feather , AntDesign } from '@expo/vector-icons'; 

export default function EditProfile({navigation}) {
    return(
        <SafeAreaView>
            <View style={styles.btn}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}><Feather name="x" size={30} color="black" /></TouchableOpacity>
            <TouchableOpacity><AntDesign name="check" size={30} color="black" /></TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
            <Image style={styles.image} source={{uri:"https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"}}/>
            <View >
            <TouchableOpacity><Text style={{color:"blue"}}>Cambia tu foto de perfil</Text></TouchableOpacity>
            </View>
            <Input label="Nombre" placeholder="Escribe tu nombre">Juan Jausoro</Input>
            <Input label="Mail" placeholder="Escribe tu mail">juanjauso@gmail.com</Input>
            </View>
        </SafeAreaView>
    )
}