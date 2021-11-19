import React, { useState } from "react";
import { TouchableOpacity, TextInput, Text, View, Image, Alert } from "react-native";
import styles from "./RegisterStyles";
import User from "../../../api/firebase/models/user";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithRedirect, signInWithPopup, sendEmailVerification } from "firebase/auth";
import auth from "../../../api/firebase/services/AuthService";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

function validate(user) {
  let errors = {};
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!user.username) {
    errors.username = "Debes ingresar un nombre de usuario.";
  }
  if (user.username.length < 4) {
    errors.username = "Tu nombre de usuario debe tener al menos 4 caracteres.";
  }
  if (!user.email) {
    errors.email = "Debes ingresar un email.";
  }
  if (!emailPattern.test(user.email)) {
    errors.email = "Por favor, ingresa un email válido.";
  }
  if (!user.password) {
    errors.password = "Debes ingresar una contraseña.";
  }
  if (user.password.length < 8) {
    errors.passwordLength = "La contraseña debe contener al menos 8 carácteres.";
  }

  return errors;
}

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);
  const [colorPass, setColorPass] = useState("");
  const [secureDataEntry, setSecureDataEntry] = useState(true);

  function updateSecureDataEntry() {
    setSecureDataEntry(!secureDataEntry);
  }

  const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.$%^&*])(?=.{8,})");

  function onChangeEmail(text) {
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(text)) {
      setEmail(text);
      setCheckEmail(true);
    } else {
      setEmail(text);
      setCheckEmail(false);
    }
  }

  function onChangePassword(text) {
    if (text.length < 8 && text.length > 0) {
      setPassword(text);
      setCheckPassword(false);
      setColorPass("red");
    } else if (text.length > 8 && strongPassword.test(text)) {
      setPassword(text);
      setCheckPassword(true);
      setColorPass("green");
    } else if (text.length >= 8) {
      setPassword(text);
      setCheckPassword(true);
      setColorPass("yellow");
    } else {
      setPassword(text);
      setCheckPassword(false);
      setColorPass("");
    }
  }

  function onChangeUsername(text) {
    if (text.length >= 4) {
      setUsername(text);
      setCheckUsername(true);
    } else {
      setUsername(text);
      setCheckUsername(false);
    }
  }

  function registerUser() {
    if (!username || !email || !password) {
      return Alert.alert("Por favor, llená todos los campos requieridos.");
    }

    const validation = validate({ username: username, email: email, password: password });

    if (Object.keys(validation).length === 0) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userCred = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: username,
          });

          User.create({ uuid: auth.currentUser.uid });

          sendEmailVerification(userCred);

          Alert.alert("Registro exitoso.", "Te enviamos un email con un link de confirmación."); // o user.displayName (si no es asíncrono, sino .then())
          navigation.replace("Login");
        })
        .catch((e) => {
          if (e === "Firebase: Error (auth/email-already-in-use).") {
            return Alert.alert("Ya existe un usuario registrado con ese email.");
          }
          console.log(e);
          Alert.alert("Algo salió mal.");
        });
    } else {
      return Alert.alert(`${Object.values(validation)[0]}`);
    }
  }

  // const googleProvider = new GoogleAuthProvider();

  function signInWithGoogle() {
    Alert.alert("Coders trabajando, vuelva prontos!");
    // console.log('GOOGLE PROVIDER', googleProvider)
    // console.log('SIGN IN WITH POPUP', signInWithPopup);
    // console.log('SIGN IN WITH REDIRECT', signInWithRedirect)
    // signInWithPopup(auth, googleProvider)
    // .then(res=>{
    //     console.log(res)
    // })
  }

  return (
    <SafeAreaView style={styles.container} behaviour="padding">
      <Image style={styles.logoImage} source={require("../../assets/Logo.png")} />

      <View style={styles.inputContainer}>
        <View style={styles.inputAndIcon}>
          <TextInput 
            placeholder="Nombre de Usuario" 
            value={username} 
            onChangeText={(text) => onChangeUsername(text)} 
            style={styles.input} />
          { 
            checkUsername ? <Feather name="check-circle" color="green" size={24} style={styles.icon} /> 
            : null
          }
        </View>

        <View style={styles.inputAndIcon}>
          <TextInput 
            placeholder="Email" 
            value={email} 
            onChangeText={(text) => onChangeEmail(text)} 
            style={styles.input} />
          {
            checkEmail ? 
            <Feather name="check-circle" color="green" size={24} style={styles.icon} /> 
            : null
          }
        </View>

        <View style={styles.inputAndIcon}>
          <TextInput 
            placeholder="Contraseña" 
            secureTextEntry={secureDataEntry ? true : false} 
            value={password} 
            onChangeText={(text) => onChangePassword(text)} 
            style={styles.input} />
          <TouchableOpacity 
            onPress={updateSecureDataEntry} 
            style={[styles.eyeBtn, colorPass && { marginRight: 30 }]}>
            {
              secureDataEntry ? <Feather name="eye-off" color="grey" size={18} /> 
            : <Feather name="eye" color="grey" size={18} />}
          </TouchableOpacity>
          {
            checkPassword ? 
            <Feather 
             name="check-circle"
             color={colorPass === "yellow" ? "#ffb400" : "green"} 
             size={24} style={styles.icon} />
            : null
          }
          {
            colorPass === "red" && 
            <AntDesign name="closecircleo" size={24} color="#b70000" style={styles.icon} />}
        </View>
        {
          colorPass === "yellow" && 
          <Text style={styles.passWarnYellow}>Contraseña de seguridad media.</Text>
        }
        {
          colorPass === "green" && 
          <Text style={styles.passWarnGreen}>Contraseña segura.</Text>
        }
        {
          colorPass === "red" && 
          <Text style={styles.passWarnRed}>Contraseña muy débil.</Text>
        }
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <Text style={styles.buttonOutlineText}>Registrarse</Text>
        </TouchableOpacity>

        {/* <View style={styles.viewLine}></View>
        <Text style={styles.oText}>O</Text> */}

        {/* <TouchableOpacity
                    onPress={signInWithGoogle}
                    style={[styles.button, styles.buttonOutline, styles.googleLog]}
                >
                    <AntDesign name="google" size={20} color="#00BD9D" style={styles.googleIcon} />
                    <Text style={styles.buttonText}>Iniciá sesión con Google</Text>
                </TouchableOpacity> */}

        <View style={styles.loginTxts}>
          <Text style={styles.textCta}>¿Ya tenés una cuenta?</Text>
          <Text onPress={() => navigation.navigate("Login")} style={styles.textToLg}>
            Iniciá sesión
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
