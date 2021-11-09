import React, { useState } from "react";
import { View , Text, Image, SafeAreaView, Alert } from "react-native";
import { Input } from "react-native-elements";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles"
import { Feather , AntDesign } from '@expo/vector-icons'; 
import * as ImagePicker from "expo-image-picker"
import { useSelector } from 'react-redux';
import auth from "../../../api/firebase/services/AuthService";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "@firebase/auth";

function validate (passwords) {
    let errors = {};
    if (!passwords.oldPassword) {
        errors.oldPassword = 'Por favor, ingresa tu contraseña actual.'
    }
    if (passwords.oldPassword.length < 8) {
        errors.oldPasswordLength = 'Error en tu contraseña actual.'
    }
    if(!passwords.newPassword) {
        errors.newPassword = 'Debes ingresar una nueva contraseña.'
    }
    if(passwords.newPassword.length < 8) {
        errors.newPasswordLength = 'Tu contraseña nueva debe contener al menos 8 carácteres.'
    }
    return errors;
}

export default function EditProfile({navigation}) {
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const user = useSelector(state=>state.isLogged);

    const [selectedImage, setSelectedImage] = useState(null)
    let openImagePickerAsync = async()=>{
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(permissionResult.granted === false){
            alert("El permiso es requerido");
            return;
        }
        let pickerResult =await ImagePicker.launchImageLibraryAsync()
        if(pickerResult.cancelled=== true){
            return
        }
        setSelectedImage({localUri: pickerResult.uri})
        }


    const changePassword = () => {

        const validation = validate({oldPassword: oldPassword, newPassword: newPassword});

        if (Object.keys(validation).length === 0) {
            
            const authCredential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);

            reauthenticateWithCredential(auth.currentUser, authCredential)
            .then(res => {
                updatePassword(auth.currentUser, newPassword)
            })
            .then(res => {
                return Alert.alert('Contraseña actualizada.');
            })
            .catch(e => {
                const errorMessage = e.message;
                if (errorMessage === 'Firebase: Error (auth/internal-error).') {
                    return Alert.alert('Por favor, ingresa tu contraseña actual.');
                }
                if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
                    return Alert.alert('Contraseña actual incorrecta.');
                }
            })
        } else {
            return Alert.alert(`${Object.values(validation)[0]}`);
        }
    }
    
    
    return(
        <SafeAreaView>
            <View style={styles.btn}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}><Feather name="x" size={30} color="black" /></TouchableOpacity>
            <TouchableOpacity><AntDesign name="check" size={30} color="black" /></TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
            <Image style={styles.image} source={{uri:selectedImage!==null? selectedImage.localUri:"https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"}}/>
            <View >
            <TouchableOpacity onPress={openImagePickerAsync}><Text style={{color:"#306BAC", fontWeight: 'bold'}} >Cambia tu foto de perfil</Text></TouchableOpacity>
            </View>
            <Input label="Nombre" placeholder="Escribe tu nombre">{user.username}</Input>
            <Input label="Mail" placeholder="Escribe tu mail">{user.email}</Input>
            </View>
            <View style={{alignSelf: 'center'}}>
                <TextInput 
                    placeholder='Contraseña actual' 
                    onChangeText={(text) => setOldPassword(text)}
                    />
            </View>
            <View style={{alignSelf: 'center'}}>
                <TextInput 
                    placeholder='Contraseña nueva' 
                    onChangeText={(text) => setNewPassword(text)}
                    />
            </View>
            <TouchableOpacity style={{alignSelf: 'center', margin: 10, borderWidth: 2}}onPress={changePassword}>
                <Text>Cambiar contraseña</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}