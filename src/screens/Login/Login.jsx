import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEvents } from '../../common/redux/actions';
import { TouchableOpacity, TextInput, Text, View, Image, Alert } from 'react-native';
import styles from './LoginStyles';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import auth from '../../../api/firebase/services/AuthService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import user from '../../../api/firebase/models/user';

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
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureDataEntry, setSecureDataEntry] = useState(true);

    function updateSecureDataEntry() {
        setSecureDataEntry(!secureDataEntry);
    }

    function signIn () {
        if(!email || !password) {
            return Alert.alert('Debes ingresar tu email y contraseña.');
        }

        const validation = validate({email: email, password: password});

        if(Object.keys(validation).length === 0) {
            signInWithEmailAndPassword(auth, email, password)
                .then(data=>{
                    const userCred = data;
                    console.log(userCred);
                    Alert.alert(`Bienvenido, ${userCred.user.displayName}!`);
                    
                    navigation.replace('Loading');
                })
                .catch(e=> {
                    console.log(e.message);
                    const errorMessage = e.message;
                    if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
                        Alert.alert('Contraseña incorrecta.')
                    }
                    if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
                        Alert.alert('Usuario no registrado.', '', [
                            {text: 'Registrarme', onPress: () => navigation.navigate('Register')},
                            {text: 'OK'}
                        ]);
                    }
                });
        } else {
            return Alert.alert(`${Object.values(validation)[0]}`);
        }
    }

    return (
        <SafeAreaView
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
                <View style={styles.passContainer}>
                    <TextInput
                        placeholder="Contraseña"
                        secureTextEntry={secureDataEntry ? true : false}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                    />
                    <TouchableOpacity
                        onPress={updateSecureDataEntry}
                        style={styles.eyeBtn}
                    >
                    {
                        secureDataEntry ? 
                            <Feather 
                                name="eye-off"
                                color="grey"
                                size={18}
                            />
                            :
                            <Feather 
                                name="eye"
                                color="grey"
                                size={18}
                            />
                    }
                    </TouchableOpacity>
                </View>
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
                    onPress={() => {navigation.navigate('TabBar'); dispatch(getEvents())}}
                >
                    <Text style={styles.mainPage}>Ir a la página principal</Text>
                </TouchableOpacity>              
                
            </View>
        </SafeAreaView>
    )
}