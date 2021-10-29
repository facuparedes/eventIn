import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { View } from "react-native";
import { Input, CheckBox, Text, Button, Platform } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./FormStyles";
import { MaterialIcons } from '@expo/vector-icons';
import { addDoc, collection} from "firebase/firestore"; 
import db from "../../../api/firebase/config";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';


const FormEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState(0);
  const [date, setDate] = useState(new Date())
  const [isPublic, setIsPublic] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [photo, setPhoto] = useState("");
  const [show, setShow] = useState(false);
  //user location 
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      
      Alert.alert('EL EVENTO SERÁ CREADO EN SU UBICACIÓN ACTUAL')
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // HANDLES FUNCTIONS
  const handleTitle = (text) => {
    setTitle(text);
  };

  const handleDescription = (text) => {
    setDescription(text);
  };
  const handleFee = (value) => {
    setFee(Number(value));
  };

  const handleIsPublic = () => {
    setIsPublic(!isPublic);
  };

  const handleIsPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const handlePhoto = (text) => {
      setPhoto(text)
  }

  const handleMode = () => {
    setShow(true)

  }

  const handleCalendar = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false)
  }

  async function handleSubmit () {
    if(!title || !description || !fee || (!isPublic && !isPrivate)) return Alert.alert('No puede haber campos vacios')  
    
          

    await addDoc(collection(db, "events"), {
        title,
        description,
        fee,
        isPublic: isPublic? isPublic : false,
        photo,
        date,
        coords:{
          lat: location.coords.latitude,
          long: location.coords.longitude 
        }
    });

    Alert.alert('Evento creado');

    setTitle("")
    setDescription("")
    setFee(0)
    setIsPublic(false)
    setIsPrivate(false)
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
        onChangeText={handleDescription} 
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputcont}/>

        <Input 
        label="Tarifa" 
        placeholder="Tarifa..."
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputcont}
        onChangeText={handleFee}/>
        
        <View style={styles.calendarContainer}>
        <Text h4 style={{marginTop:7}}>Fecha: -{date.toDateString()}-</Text>
        <TouchableOpacity onPress={handleMode}>
        <MaterialIcons name="date-range" size={45} color="black" style={styles.calendar} />
        </TouchableOpacity>
        {show && 
          <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          display="default"
          onChange={handleCalendar}
          maximumDate={new Date(2022, 1, 1)}
          minimumDate={new Date()}
        />
        }
       </View>
        


        <Text style={{alignSelf:'center',marginBottom:8}} h4>Tipo de evento</Text>
        <View style={styles.checkBox}>
            {
                !isPublic && !isPrivate? 
                <View style={styles.checkBox}>
                    <CheckBox title="Publico" onPress={handleIsPublic} size={20} checked={isPublic} containerStyle={styles.boxcont}/>
                    <CheckBox title="Privado" onPress={handleIsPrivate} checked={isPrivate} containerStyle={styles.boxcont}/>
                </View>
                : isPublic? <CheckBox title="Publico" onPress={handleIsPublic} size={20} checked={isPublic} containerStyle={styles.boxcont}/>
                : <CheckBox title="Privado" onPress={handleIsPrivate} checked={isPrivate} containerStyle={styles.boxcont}/>
            }
        </View>
        {/* <Input label="Ubicacion" placeholder="Evento location..."/> */}
        <Input label="Fotos" placeholder="Añadir link de la foto..." 
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputcont}
        onChangeText={handlePhoto}/>
        {/*createdAt*/}
        <TouchableOpacity title="Crear Evento" onPress={handleSubmit} style={styles.btn}>
        <Text style={{color:'white'}}>Crear Evento</Text>
        </TouchableOpacity> 
      </ScrollView>
    </View>
  );
};

export default FormEvent;
