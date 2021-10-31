import React, { useState } from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, Text, View, Image } from 'react-native';
import styles from './RegisterStyles';


export default function Register ({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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