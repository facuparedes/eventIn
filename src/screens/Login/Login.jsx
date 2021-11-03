import React, { useState } from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, Text, View, Image } from 'react-native';
import styles from './LoginStyles';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import auth from '../../../api/firebase/services/AuthService';


export default function Login ({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function signIn () {
        signInWithEmailAndPassword(auth, email, password)
            .then(res=>{
                console.log(res);
                navigation.replace('TabBar')
            })
            .catch(e=> {
                const errorCode = e.code;
                const errorMessage = e.message;
                alert(errorMessage)
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
                    onPress={() => { navigation.navigate('Home') }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                
            </View>
        </KeyboardAvoidingView>
    )
}