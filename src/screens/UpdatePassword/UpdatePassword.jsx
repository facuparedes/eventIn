import React from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import auth from "../../../api/firebase/services/AuthService";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "@firebase/auth";
import { useState } from "react";
import { Input } from "react-native-elements";
import styles from "./styles";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

function validate(passwords) {
  let errors = {};
  if (!passwords.oldPassword) {
    errors.oldPassword = "Por favor, ingresa tu contraseña actual.";
  }
  if (passwords.oldPassword.length < 8) {
    errors.oldPasswordLength = "Error en tu contraseña actual.";
  }
  if (!passwords.newPassword) {
    errors.newPassword = "Debes ingresar una nueva contraseña.";
  }
  if (passwords.newPassword.length < 8) {
    errors.newPasswordLength = "Tu contraseña nueva debe contener al menos 8 carácteres.";
  }
  return errors;
}

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [colorPass, setColorPass] = useState("");
  const [secureDataEntry, setSecureDataEntry] = useState(true);
  const navigation = useNavigation();

  const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.$%^&*])(?=.{8,})");

  const changePassword = () => {
    const validation = validate({ oldPassword: oldPassword, newPassword: newPassword });

    if (Object.keys(validation).length === 0) {
      const authCredential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);

      reauthenticateWithCredential(auth.currentUser, authCredential)
        .then((res) => {
          updatePassword(auth.currentUser, newPassword);
        })
        .then((res) => {
          return Alert.alert("Contraseña actualizada.");
        })
        .catch((e) => {
          const errorMessage = e.message;
          if (errorMessage === "Firebase: Error (auth/internal-error).") {
            return Alert.alert("Por favor, ingresa tu contraseña actual.");
          }
          if (errorMessage === "Firebase: Error (auth/wrong-password).") {
            return Alert.alert("Contraseña actual incorrecta.");
          }
        });
    } else {
      return Alert.alert(`${Object.values(validation)[0]}`);
    }
  };

  function updateSecureDataEntry() {
    setSecureDataEntry(!secureDataEntry);
  };

  function onChangePassword(text) {
    if (text.length < 8 && text.length > 0) {
      setNewPassword(text);
      setColorPass("red");
    } else if (text.length > 8 && strongPassword.test(text)) {
      setNewPassword(text);
      setColorPass("green");
    } else if (text.length >= 8) {
      setNewPassword(text);
      setColorPass("yellow");
    } else {
      setNewPassword(text);
      setColorPass("");
    }
  }

  return (
    <SafeAreaView style={styles.container} behaviour="padding">
      <View style={styles.container2}>

        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.passContainer}>
          <View style={styles.inputViewCont}>
            <Input 
              secureTextEntry={secureDataEntry ? true : false} 
              placeholder="Contraseña actual" 
              onChangeText={(text) => setOldPassword(text)} 
              inputContainerStyle={styles.inputCont}
            />
          </View>

          <View style={styles.newPassCont}>

            <View style={styles.inputViewCont}>
              <Input 
                secureTextEntry={secureDataEntry ? true : false}
                placeholder="Contraseña nueva"
                onChangeText={(text) => onChangePassword(text)} 
                inputContainerStyle={styles.inputCont}
              />
            </View>

            <TouchableOpacity 
              onPress={updateSecureDataEntry} 
              style={styles.eyeBtn}>
              {/* style={[styles.eyeBtn, colorPass && { marginLeft: -6}]}> */}
              {
                secureDataEntry ? <Feather name="eye-off" color="grey" size={18} /> 
              : <Feather name="eye" color="grey" size={18} />
              }
            </TouchableOpacity>

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

          <TouchableOpacity style={[styles.btn, colorPass ? {marginTop: 3.5} : null ]} onPress={changePassword}>
            <Text style={styles.btnText}>Actualizar contraseña</Text>
          </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
