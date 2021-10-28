import React, { useState } from "react";
import { Alert } from "react-native";
import { View } from "react-native";
import { Input, CheckBox, Text, Button } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./FormStyles";
const FormEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState(0);
  //date
  const [isPublic, setIsPublic] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  // HANDLES FUNCTIONS
  const handleTitle = (text) => {
    setTitle(text);
  };

  const handleDescription = (text) => {
    setDescription(text);
  };
  const handleFee = (value) => {
    setFee(value);
  };

  const handleIsPublic = () => {
    setIsPublic(!isPublic);
  };

  const handleIsPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const handleSubmit = () => {
    if(!title || !description || !fee || (!isPublic && !isPrivate)) return Alert.alert('No puede haber campos vacios')  
    form = {
            title,
            description,
            fee,
            isPublic: isPublic? isPublic : isPrivate
    }
  };
  
  return (
    //titulo -description - $fee - date - isPublic - location = {lat, long} - attachments - createdAt

    <View style={styles.container}>
        <Text h1>Crea tu Evento</Text>
      <ScrollView>
        <Input 
        label="Titulo" 
        placeholder="Nombre del evento..."
        onChangeText={handleTitle} 
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputcont}/>

        <Input 
        label="Descripción" 
        placeholder="Descripción..." 
        onChange={handleDescription} 
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputcont}/>

        <Input 
        label="Tarifa" 
        placeholder="Tarifa..."
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputcont}
        onChange={handleFee}/>

        <Input 
        label="Fecha del evento" 
        placeholder="Fecha..." 
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputcont}/>
       
        <Text h4>Tipo de evento</Text>
        <View style={styles.checkBox}>
            {
                !isPublic && !isPrivate? 
                <View style={styles.checkBox}>
                    <CheckBox title="Publico" onPress={handleIsPublic} size={20} checked={isPublic}/>
                    <CheckBox title="Privado" onPress={handleIsPrivate} checked={isPrivate}/>
                </View>
                : isPublic? <CheckBox title="Publico" onPress={handleIsPublic} size={20} checked={isPublic}/>
                : <CheckBox title="Privado" onPress={handleIsPrivate} checked={isPrivate}/>
            }
        </View>
        {/* <Input label="Ubicacion" placeholder="Evento location..."/> */}
        <Input label="Fotos" placeholder="Añadir link de la foto..." 
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputcont}/>
        {/*createdAt*/}
        <TouchableOpacity title="Crear Evento" onPress={handleSubmit} style={styles.btn}>
        <Text>Crear Evento</Text>
        </TouchableOpacity> 
      </ScrollView>
    </View>
  );
};

export default FormEvent;
