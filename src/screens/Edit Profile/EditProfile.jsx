import React, { useState } from "react";
import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
import { AntDesign, FontAwesome, Entypo, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { userEdition } from "../../common/redux/actions";
import user from "../../../api/firebase/models/user";

function validate (user) {
  let errors = {};

  if (!user.name) {
    errorsValidate.name = "Por favor, ingresa tu nombre."
  }
  if (!user.lastName) {
    errorsValidate.lastName = "Por favor, ingresa tu apellido."
  }
  if (!user.age) {
    errorsValidate.age = "Por favor, ingresa tu edad."
  }
  if (!/^[0-9]+$/.test(user.age)) {
    errorsValidate.ageNaN = "Tu edad debe ser un número.";
  }
  if (!user.phoneNumber) {
    errorsValidate.phoneNumber = "Por favor, ingresa tu número de teléfono."
  }
  if (!/^[0-9]+$/.test(user.phoneNumber)) {
    errorsValidate.phoneNumberNan = "Ingresa un número de teléfono que sólo contenga números, sin espacios.";
  }
  if (user.phoneNumber.length < 7 || user.phoneNumber.length > 20) {
    errorsValidate.phoneNumberLength = "Número de teléfono inválido."
  }
  
  return errors;
} 

export default function EditProfile({ navigation }) {
  const editedUser = useSelector(state => state.userEdited)
  const logged = useSelector((state) => state.isLogged);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("El permiso es requerido");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  const handleName = (text) => {
    setName(text);
  }

  const handleLastName = (text) => {
    setLastName(text);
  }

  const handleAge = (text) => {
    setAge(text);
  }

  const handlePhoneNumber = (text) => {
    setPhoneNumber(text);
  }

  function handleSubmit() {
    let newUserData = {
      name, 
      lastName,
      age,
      phoneNumber
    }

    const validation = validate(newUserData);

    if (Object.keys(validation).length === 0) {
      user.update
    } else {
      return Alert.alert(`${Object.values(validation)[0]}`);
    } 
  }

  return (
    <SafeAreaView>
      <View style={styles.btn}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            flexDirection: "row",
          }}
        >
          <AntDesign name="left" size={20} color="black" />
          <Text style={{ fontSize: 15 }}>Atras</Text>
        </TouchableOpacity>
        
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Editar Perfil</Text>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={{ uri: selectedImage !== null ? selectedImage.localUri : "https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" }}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 60 }}
            >
              <View
                style={{
                  // flex: 1,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <FontAwesome
                  name="camera"
                  size={25}
                  color="#fff"
                  style={{
                    opacity: 0.8,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>{logged.username}</Text>
      </View>

      <View style={styles.profileInfo}>

        <View style={styles.containerInput}>
          <FontAwesome name="id-card" size={20} color="black" />
          <TextInput 
            label="Nombre" 
            placeholder="Nombre" 
            placeholderTextColor="#666666" 
            style={styles.textInput} 
            autoCorrect={false}
            onChangeText={text => handleName(text)}
          >
            {name}
          </TextInput>
        </View>

        <View style={styles.containerInput}>
          <AntDesign name="idcard" size={20} color="black" />
          <TextInput 
            label="Apellido" 
            placeholder="Apellido" 
            placeholderTextColor="#666666" 
            style={styles.textInput} 
            autoCorrect={false}
            onChangeText={text => handleLastName(text)}
          >
            {lastName}
          </TextInput>
        </View>

        <View style={styles.containerInput}>
        <FontAwesome5 name="child" size={20} color="black" />
          <TextInput 
            label="Edad" 
            placeholder="Edad" 
            placeholderTextColor="#666666" 
            style={styles.textInput} 
            autoCorrect={false}
            onChangeText={text => handleAge(text)}
          >
            {age}
          </TextInput>
        </View>

        <View style={styles.containerInput}>
          <Entypo name="phone" size={20} color="black" />
          <TextInput 
            label="phoneNumber" 
            placeholder="Teléfono" 
            placeholderTextColor="#666666" 
            style={styles.textInput} 
            autoCorrect={false}
            onChangeText={text => handlePhoneNumber(text)}
          >
            {phoneNumber}
          </TextInput>
        </View>

        <View style={styles.containerInput}>
          <FontAwesome name="user-o" size={20} color="black" />
          <TextInput 
            label="Nombre" 
            placeholder="Escribe tu nombre" 
            placeholderTextColor="#666666" 
            style={styles.textInput} 
            autoCorrect={false}
          >
            {logged.username}
          </TextInput>
        </View>

        <View style={styles.containerInput}>
          <FontAwesome name="envelope-o" size={20} color="black" />
          <TextInput 
            label="Mail" 
            placeholder="Escribe tu mail" 
            style={styles.textInput} 
            autoCorrect={false} 
            keyboardType="email-address"
          >
            {logged.email}
          </TextInput>
        </View>

      </View>
      <View style={styles.btnSubir}>
        <TouchableOpacity
          style={styles.commandButton}
          onPress={handleSubmit}
        >
          <View style={styles.containerTxt}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Actualizar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
