import React, { useState } from "react";
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

  const handleSubmit = () => {};

  return (
    //titulo -description - $fee - date - isPublic - location = {lat, long} - attachments - createdAt

    <View style={styles.container}>
      <ScrollView>
        <Input 
        label="Titulo" 
        placeholder="Nombre del evento..."
        onChangeText={(text) => handleTitle(text)} 
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
        inputContainerStyle={styles.inputcont}/>

        <Input 
        label="Fecha del evento" 
        placeholder="Fecha..." 
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputcont}/>
       
        <Text h4>Tipo de evento</Text>
        <View style={styles.checkBox}>
          <CheckBox title="Publico" onPress={handleIsPublic} size={20}/>
          <CheckBox title="Privado" onPress={handleIsPrivate} />
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
