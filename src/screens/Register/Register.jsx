import React, { useState } from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, Text, View, Image, Alert } from 'react-native';
import styles from './RegisterStyles';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from '../../../api/firebase/services/AuthService'
import { AntDesign } from '@expo/vector-icons';

function validate (user) {
    let errors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!user.username) {
        errors.username = 'Debes ingresar un nombre de usuario.'
    }
    if(!user.email) {
        errors.email = 'Debes ingresar un email.'
    }
    if(!emailPattern.test(user.email)) {
        errors.email = 'Por favor, ingresa un email válido.'
    }
    if(!user.password) {
        errors.password = 'Debes ingresar una contraseña.'
    }
    if(user.password.length < 8) {
        errors.passwordLength = 'La contraseña debe contener al menos 8 carácteres.'
    }

    return errors;
}

export default function Register ({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    function registerUser () {
        if(!username || !email || !password) {
            return Alert.alert('Por favor, llená todos los campos requieridos.')
        };
        const validation = validate({username: username, email: email, password: password})

        if(Object.keys(validation).length === 0) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    updateProfile(auth.currentUser, {  
                        displayName: username    
                    });

                    Alert.alert('Registro exitoso, bienvenido ', user.email) // o user.displayName (si no es asíncrono, sino .then())
                    navigation.replace('Login');
                })
                .catch(e=> {
                    console.log(e);
                    Alert.alert('Algo salió mal.')
                })
        } else {
            return Alert.alert(`${Object.values(validation)[0]}`)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behaviour="padding"
        >
            <Image style={styles.logoImage} source={require('../../assets/Logo.png')} />

            <View style={styles.inputContainer}>
                    <TextInput
                    placeholder="Nombre de Usuario"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={styles.input}
                />
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
                    style={styles.button}
                    onPress={registerUser}
                >
                    <Text style={styles.buttonOutlineText}>Registrarse</Text>
                </TouchableOpacity>

                <View style={styles.viewLine}></View>
                <Text style={styles.oText}>O</Text>

                <TouchableOpacity
                    // onPress={()=>{}}
                    style={[styles.button, styles.buttonOutline, styles.googleLog]}
                >
                    <AntDesign name="google" size={20} color="#00BD9D" style={styles.googleIcon} />
                    <Text style={styles.buttonText}>Iniciá sesión con Google</Text>
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