import React from "react";
import { View, Text, Image, SafeAreaView, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import auth from "../../../api/firebase/services/AuthService";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "@firebase/auth";
import { useState } from "react";
import { Input } from "react-native-elements";
import styles from "./styles";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
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
  const [secureDataEntry, setSecureDataEntry] = useState(true);
  const navigation = useNavigation();

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
  }

  return (
    <SafeAreaView>
      <View style={styles.all}>
        <View style={{ marginBottom: 50, marginLeft: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}
            style={{
              flexDirection: "row",
              }}
          >
            <AntDesign name="left" size={20} color="black"
            />
            <Text style={{ fontSize: 15 }}>Atras</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerInput}>
          <FontAwesome5 name="user-lock" size={20} color="black" />
          <TextInput secureTextEntry={true} placeholder="Escribe tu contraseña actual" onChangeText={(text) => setOldPassword(text)} style={styles.textInput}/>
        </View>
        <View style={styles.containerInput}>
          <FontAwesome5 name="user-lock" size={20} color="black" />
          <TextInput secureTextEntry={true} placeholder="Escribe tu contraseña nueva" onChangeText={(text) => setNewPassword(text)} style={styles.textInput}/>
        </View>
        <View style={styles.display}>
          <TouchableOpacity style={styles.updateBtn} onPress={changePassword}>
            <Text style={styles.textStyle}>Actualizar contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
