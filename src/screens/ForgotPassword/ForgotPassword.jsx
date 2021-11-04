import React, { useState } from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, Text, View, Image, Alert } from 'react-native';
import styles from './ForgotPasswordStyles';
import auth from '../../../api/firebase/services/AuthService';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

function validate (email) {
    let errors = {}; 
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(!email) {
        errors.email = 'Debes ingresar un email.'
    }
    if(!emailPattern.test(email)) {
        errors.email = 'Por favor, ingresa un email válido.'
    }

    return errors;
}

export default function ForgotPass ({navigation}) {
    const [email, setEmail] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);

    function onChangeEmail(text){
        if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(text)) {
            setEmail(text);
            setCheckEmail(true);
        } else {
            setEmail(text);
            setCheckEmail(false);
        }
    }
    
    function handleNext(){
        const validation = validate(email);

        if(Object.keys(validation).length === 0) {
            sendPasswordResetEmail(auth, email);
            Alert.alert('Correo enviado.')
            navigation.navigate('Login');
        } else {
            return Alert.alert(`${Object.values(validation)[0]}`);
        }
    }

    return (
        <SafeAreaView
            style={styles.container}
            behaviour="padding"
        >

            <View style={styles.goBackBtn}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={42} color="#00BD9D" />
                </TouchableOpacity>
            </View>

            <Image style={styles.logoImage} source={require('../../assets/Logo.png')} />

            <Text style={styles.miniText}>
                Te enviaremos un link para cambiar tu contraseña.
                </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => onChangeEmail(text)}
                    style={styles.input}
                />
                {
                    checkEmail ? (
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                        style={styles.icon}
                    />
                    ) : null
                }
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity
                    onPress={handleNext}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Enviar email</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}