import React, { useState } from "react";
import { Alert, View, TextInput, Platform } from "react-native";
import { Input, CheckBox, Text, Button } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./FormStyles";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { addDoc, collection} from "firebase/firestore"; 
import db from "../../../api/firebase/config";
import DateTimePicker from '@react-native-community/datetimepicker';

const FormEvent = () => {
  // form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState(0);
  const [isPublic, setIsPublic] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [photo, setPhoto] = useState("");
      // dateTime states (also form)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date());
  // dateTime states (not form)
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [textDate, setTextDate] = useState('');
  const [textTime, setTextTime] = useState('');

  // Event Handlers
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
    // dateTime handler 1
  const showMode = (currentMode) => {
    if (currentMode === 'date') {
        setShowTime(false);
        setShowDate(true);
    }
    if (currentMode === 'time') {
        setShowDate(false);
        setShowTime(true);
    }
  };
  
    // dateTime handler 2
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShowDate(Platform.OS === 'ios'); // why this?
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setTextDate(fDate);

    console.log({
        Fecha: fDate,
        Hora: textTime
    }); // ERASE LATER!!!!!!!!!!
    setShowDate(false);
}

  // dateTime handler 3
const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;

    setShowTime(Platform.OS === 'ios'); // why this?
    setTime(currentTime);

    let tempTime = new Date(currentTime);
    let fTime = tempTime.getHours() + ':' + tempTime.getMinutes();
    setTextTime(fTime);

    console.log({
        Fecha: textDate,
        Hora: fTime
    });  // ERASE LATER!!!!!!!!!
    setShowTime(false)
}

  async function handleSubmit () {
    if(!title || !description || !fee || (!isPublic && !isPrivate)) return Alert.alert('No puede haber campos vacios')  
    
    await addDoc(collection(db, "events"), {
        title,
        description,
        fee,
        isPublic: isPublic? isPublic : isPrivate,
        photo,
        date
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
        label="Nombre:" 
        placeholder="Nombre del evento..."
        onChangeText={handleTitle} 
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputcont}/>

        <Input 
        label="Descripción:" 
        placeholder="Descripción..." 
        onChangeText={handleDescription} 
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputcont}/>

        <Input 
        label="Tarifa: " 
        placeholder="Tarifa..."
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputcont}
        onChangeText={handleFee}/>

        {/* dateTimePicker */}
        <View style={{
          flex: 1,
          backgroundColor: '#298bc4',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <TouchableOpacity
            onPress={() => showMode('date')}
          >
            <MaterialIcons name="date-range" size={45} color="black" style={styles.calendar} />
          </TouchableOpacity>

          <Input
            label="Fecha:"
            placeholder="Fecha..."
            inputStyle={styles.input}
            labelStyle={styles.label}
            inputContainerStyle={styles.inputcont}
            value={textDate}
          />
          <TouchableOpacity
            onPress={() => showMode('time')}
          >
            <Feather name="clock" size={45} color="black" style={styles.calendar} />
          </TouchableOpacity>
          <Input
            label="Hora:"
            placeholder="Hora..."
            inputStyle={styles.input}
            labelStyle={styles.label}
            inputContainerStyle={styles.inputcont}
            value={textTime}
          />
          
            {showDate && (
              <DateTimePicker
                testID='dateTimePicker'
                value={date}
                mode='date'
                // is24Hour={false}
                display='default'
                onChange={onChangeDate}
              />
            )}

            {showTime && (
              <DateTimePicker
                testID='dateTimePicker'
                value={date}
                mode='time'
                is24Hour={true}
                display='default'
                onChange={onChangeTime}
              />
            )}
        </View>
        
        {/* CHECKBOXES */}
        <Text style={{alignSelf:'center',marginBottom:8}} h4>Tipo de evento</Text>
        <View style={styles.checkBox}>
            {
              !isPublic && !isPrivate? 
              <View style={styles.checkBox}>
                <CheckBox 
                  title="Publico" 
                  onPress={handleIsPublic} 
                  size={20} 
                  checked={isPublic} 
                  containerStyle={styles.boxcont}
                />
                <CheckBox 
                  title="Privado" 
                  onPress={handleIsPrivate} 
                  checked={isPrivate} 
                  containerStyle={styles.boxcont}
                />
              </View>
              : isPublic? 
                <CheckBox 
                  title="Publico" 
                  onPress={handleIsPublic} 
                  size={20} 
                  checked={isPublic} 
                  containerStyle={styles.boxcont}
                />
              : <CheckBox 
                  title="Privado" 
                  onPress={handleIsPrivate} 
                  checked={isPrivate} 
                  containerStyle={styles.boxcont}
                />
            }

        </View>
        {/* <Input label="Ubicacion" placeholder="Evento location..."/> */}
        <Input 
          label="Fotos" 
          placeholder="Añadir link de la foto..." 
          inputStyle={styles.input}
          labelStyle={styles.label}
          inputContainerStyle={styles.inputcont}
          onChangeText={handlePhoto}
        />
          {/*createdAt*/}
        <TouchableOpacity title="Crear Evento" onPress={handleSubmit} style={styles.btn}>
          <Text style={{color:'white'}}>Crear Evento</Text>
        </TouchableOpacity> 
        
      </ScrollView>
    </View>
  );
};

export default FormEvent;
