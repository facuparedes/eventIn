import React, { useState } from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, Text, View, Image, Alert } from 'react-native';
import styles from './RegisterStyles';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from '../../../api/firebase/services/AuthService'
import { AntDesign } from '@expo/vector-icons';

function validate (user) {
    let errors = {};
}

export default function Register ({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    function registerUser () {
        if(!username || !email || !password) {
            return Alert.alert('Por favor, llená todos los campos requieridos.')
        };

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Esto devuelve el register! ', userCredential);
                const user = userCredential.user;

                updateProfile(auth.currentUser, {  
                    displayName: username    
                });

                console.log('Esto devuelve el register! ', userCredential);

                Alert.alert('Registro exitoso, bienvenido ', user.email)
                navigation.replace('TabBar');
            })
            .catch(e=> {
                console.log(e);
                Alert.alert('Por favor, ingresa un email válido.')
            })
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