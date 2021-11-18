import React, { useState } from "react";
import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

export default function EditProfile({ navigation }) {
  const user = useSelector((state) => state.isLogged);

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
        {/* <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="check" size={30} color="black" />
        </TouchableOpacity> */}
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
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>{user.username}</Text>
      </View>

      <View style={styles.profileInfo}>
        {/* <Image
          style={styles.image}
          source={{ uri: selectedImage !== null ? selectedImage.localUri : "https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" }}
        /> */}
        {/* <View>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <Text style={{ color: "#306BAC", fontWeight: "bold" }}>Cambia tu foto de perfil</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.containerInput}>
          <FontAwesome name="user-o" size={20} color="black" />
          <TextInput label="Nombre" placeholder="Escribe tu nombre" placeholderTextColor="#666666" style={styles.textInput} autoCorrect={false}>
            {user.username}
          </TextInput>
        </View>
        <View style={styles.containerInput}>
          <FontAwesome name="envelope-o" size={20} color="black" />
          <TextInput label="Mail" placeholder="Escribe tu mail" style={styles.textInput} autoCorrect={false} keyboardType="email-address">
            {user.email}
          </TextInput>
        </View>
      </View>
      <View style={styles.btnSubir}>
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          {/* <View style={styles.containerIcon}>
            <MaterialIcons name="system-update" size={24} color="white" />
          </View> */}
          <View style={styles.containerTxt}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Actualizar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
