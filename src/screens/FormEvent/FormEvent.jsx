import React, { useState, useEffect } from "react";
import { Alert, View, Platform, Image, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, CheckBox, Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./FormStyles";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Event from '../../../api/firebase/models/event'

// Validate Function
function validate (form) {
  let errorsValidate = {}
  if (!form.title) {
    errorsValidate.title = 'Tu evento debe tener un nombre.'
  }
  if (form.title.length > 30) {
    errorsValidate.titleL = 'El nombre de tu evento no puede tener más de 30 carácteres.'
  }
  if(!form.description) {
    errorsValidate.description = 'Tu evento debe tener una descripción.'
  }
  if(form.description.length > 140) {
    errorsValidate.descriptionL = 'La descripción no puede tener más de 140 carácteres.'
  }
  // if(!form.locationText) {
  //   errorsValdiate.LocationText = 'Debes ingresar una ubicación para tu evento.'
  // }
  if(!/^[0-9]+$/.test(form.fee)) {
    errorsValidate.fee = 'La tarifa debe ser un número.'
  } 
  if(form.fee < 0) {
    errorsValidate.feeM = 'La tarifa no puede ser menor a 0.'
  }
  if(!form.category) {
    errorsValidate.category = 'Debes seleccionar una categoría.'
  }
  if(!form.start.date || !form.start.time) {
    errorsValidate.start = 'Tu evento debe tener una fecha y hora de inicio.'
  }
  if(!form.end.date || !form.end.time) {
    errorsValidate.end = 'Tu evento debe tener una fecha y hora de finalización.'
  }
  if(!form.photo) {
    errorsValidate.photo = 'Debes ingresar un link con una foto.'
  }
  // if(errorsMsg) {
  //   errorsValidate.location = 'Debes permitir el acceso a tu ubicación.'
  // }
  return errorsValidate;
}

const FormEvent = ({ navigation }) => {
  const [errors, setErrors] = useState({});
  // form states
  const [locationText, setLocationText] = useState('')



  //Location states
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // En este useEffect pedimos acceso a la ubicación actual del usuario.
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Los permisos fueron denegados');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    Alert.alert('ESTE EVENTO SERÁ CREADO EN TU UBICACIÓN ACTUAL');

    })();
  }, []);

  if(errorMsg){
    Alert.alert(errorMsg)
  }

  // Event Handlers




  const handleLocationText = (text) => {
    setLocationText(text);
  };



 





 


  async function handleSubmit () {
    // Esto es un parche, no va a estar en el futuro.
    if(!isPublic && !isPrivate) return Alert.alert('Selecciona un tipo de evento.')  

    // Form validation
    let errorsForm = validate({
      title,
      description,
      fee,
      isPublic: isPublic? true : false,
      photo,
      category: categories,
      start: {
        date: dateValueStart,
        time: timeValueStart
      },
      end: {
        date: textDateEnd,
        time: textTimeEnd
      },
      location: {
        lat: location.coords.latitude,
        long: location.coords.longitude
      }
    })

    if (Object.keys(errorsForm).length === 0) {
      let feeNum = Number(fee)
      Event.create({
        title,
        description,
        fee: feeNum,
        isPublic: isPublic? true : false,
        photo,
        category: categories,
        start: {
          date: dateValueStart,
          time: timeValueStart
        },
        end: {
          date: dateValueEnd,
          time: timeValueEnd
        },
        location: {
          lat: location.coords.latitude,
          long: location.coords.longitude
        }
    });
    } else {
      return Alert.alert('Error en la información ingresada.')
    }
    if(fee === 0) Alert.alert('Tu evento será gratuito')
    Alert.alert('Evento creado');

    // Navegamos a Login porque no tenemos a Home en el Navigator, pero en el futuro navegaremos a Home.
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.textAndImg}>
        <Text h4 style={styles.titleText}>Crea tu Evento</Text>
        <Image source={require('../../assets/Logo.png')} style={styles.logoImage} />
      </View>

      <ScrollView style={styles.scrollView}>
        <Input 
        label="Nombre" 
        placeholder="Nombre del evento"
        onChangeText={handleTitle} 
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputCont}/>

        <Input 
        label="Tarifa" 
        placeholder="Tarifa"
        inputStyle={styles.input}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputCont}
        onChangeText={handleFee}/>

        <Input 
          label="Ubicación" 
          placeholder="Ingresar dirección" 
          onChangeText={handleLocationText} 
          inputStyle={styles.input}
          labelStyle={styles.label}
          inputContainerStyle={styles.inputCont}
        />

        
        {/* FINISH CATEGORIES CHECKBOXES */}
        <View style={styles.btnsContainer}>
          <TouchableOpacity title="Crear Evento" onPress={handleSubmit} style={styles.btn}>
            <Text style={styles.textBtn}>Crear Evento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormEvent;