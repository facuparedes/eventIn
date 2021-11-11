import React from "react";
import { View, Text, Image, SafeAreaView, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import auth from "../../../api/firebase/services/AuthService";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "@firebase/auth";
import { useState } from "react";

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

  return (
    <View>
      <View style={{ justifyContent: "center", marginTop: 100 }}>
        <View style={{ alignSelf: "center" }}>
          <TextInput placeholder="Contraseña actual" onChangeText={(text) => setOldPassword(text)} />
        </View>
        <View style={{ alignSelf: "center" }}>
          <TextInput placeholder="Contraseña nueva" onChangeText={(text) => setNewPassword(text)} />
        </View>
        <TouchableOpacity style={{ alignSelf: "center", margin: 10, borderWidth: 2 }} onPress={changePassword}>
          <Text>Cambiar contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
