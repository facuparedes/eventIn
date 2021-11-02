import React, { useState } from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, Text, View, Image } from 'react-native';
import styles from './RegisterStyles';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from '../../../api/firebase/services/AuthService'

export default function Register ({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function registerUser () {
        createUserWithEmailAndPassword(auth, email, password)
            .then(res=> {
                console.log(res);
                navigation.replace('TabBar');
            })
            .catch(e=>console.log(e))
        // .then((userCredential) => {
        //     // Signed in 
        //     const user = userCredential.user;
        //     updateProfile(auth.currentUser, {
        //         displayName: name,
        //         photoURL: imageURL === ""? imageURL : 
        //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgJMFsyQlqFwvHOYF0fEijnJjaNRsNDBfi1Q&usqp=CAU",
        //       }).then(() => {
        //         // Profile updated!
        //         // ...
        //     }).catch((error) => {
        //         // An error occurred
        //         // ...
        //       });
        // })
        // .catch((error) => {
        //     const errorMessage = error.message;
        //     alert(errorMessage)
        // });
        // cambia el top por el parámetro que le pase a replace()
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behaviour="padding"
        >
            <Image style={styles.logoImage} source={require('../../assets/Logo.png')} />

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                />
            </View>

            <View style={styles.buttonContainer}>
              

                <TouchableOpacity
                    style={[styles.button, styles.buttonOutline]}
                    onPress={registerUser}
                >
                    <Text style={styles.buttonOutlineText}>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('Home') }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>

                <View style={styles.loginTxts}>
                    <Text style={styles.textCta}>¿Ya tenés una cuenta?</Text>
                    <Text 
                        onPress={() => navigation.navigate('Login')}
                        style={styles.textToLg}
                    >
                        Iniciá sesión</Text>
                </View>
                
            </View>
        </KeyboardAvoidingView>
    )
}