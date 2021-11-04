import React, { useState } from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, Text, View, Image, Alert } from 'react-native';
import styles from './LoginStyles';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import auth from '../../../api/firebase/services/AuthService';

function validate (user) {
    let errors = {}; 
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(!user.email) {
        errors.email = 'Debes ingresar un email.'
    }
    if(!emailPattern.test(user.email)) {
        errors.email = 'Por favor, ingresa un email válido.'
    }
    if(!user.password) {
        errors.password = 'Debes ingresar una contraseña.'
    }

    return errors;
}

export default function Login ({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function signIn () {
        if(!email || !password) {
            return Alert.alert('Debes ingresar tu email y contraseña.');
        }

        const validation = validate({email: email, password: password});

        if(Object.keys(validation).length === 0) {
            signInWithEmailAndPassword(auth, email, password)
                .then(data=>{
                    const user = data;
                    Alert.alert(`Bienvenido, ${user.user.displayName}!`);
                    navigation.replace('TabBar');
                })
                .catch(e=> {
                    console.log(e.message);
                    const errorMessage = e.message;
                    if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
                        Alert.alert('Contraseña incorrecta.')
                    }
                    if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
                        Alert.alert('Usuario inexistente.');
                    }
                });
        } else {
            return Alert.alert(`${Object.values(validation)[0]}`);
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
            
            <TouchableOpacity style={styles.btnFgtPass} onPress={()=>{navigation.navigate('ForgotPass')}}>
                <Text style={styles.forgotPass}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={signIn}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>navigation.navigate('Register')}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('TabBar') }}
                >
                    <Text style={styles.mainPage}>Ir a la página principal</Text>
                </TouchableOpacity>
                
            </View>
        </KeyboardAvoidingView>
    )
}