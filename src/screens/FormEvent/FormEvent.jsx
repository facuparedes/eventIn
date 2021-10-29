import React, { useState, useEffect } from "react";
import { Alert, View, TextInput, Platform } from "react-native";
import { Input, CheckBox, Text, Button } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./FormStyles";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { addDoc, collection} from "firebase/firestore"; 
import db from "../../../api/firebase/config";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';


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
    errorsValidate.descriptionL = 'La descripción no puede tener más de 140 carácteres'
  }
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
  // if(errorsMsg) {
  //   errorsValidate.location = 'Debes permitir el acceso a tu ubicación.'
  // }
  return errorsValidate;
}

const FormEvent = ({ navigation }) => {
  const [errors, setErrors] = useState({});
  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState(0);
  const [isPublic, setIsPublic] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [photo, setPhoto] = useState("");
  // DateTime states (also form)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date());
  const [textDateStart, setTextDateStart] = useState('');
  const [textDateEnd, setTextDateEnd] = useState('');
  const [textTimeStart, setTextTimeStart] = useState('');
  const [textTimeEnd, setTextTimeEnd] = useState('');
    // DateTime states (not form)
  const [showDateStart, setShowDateStart] = useState(false);
  const [showDateEnd, setShowDateEnd] = useState(false);
  const [showTimeStart, setShowTimeStart] = useState(false);
  const [showTimeEnd, setShowTimeEnd] = useState(false);
  // Categories Checkboxes states
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState('');
  const [bar, setBar] = useState(false);
  const [deportes, setDeportes] = useState(false);
  const [fiesta, setFiesta] = useState(false);
  const [teatro, setTeatro] = useState(false);
  const [musica, setMusica] = useState(false);
  // Location states
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Función para pedir acceso a la ubicación del usuario dentro del useEffect
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

  const handlePhoto = (text) => {
      setPhoto(text)
  }

  const handleCategories = () => {
    setShowCategories(!showCategories)
  }

 
    // DateTime handler 1
  const showMode = (currentMode) => {
    if (currentMode === 'date') {
        setShowDateStart(true);
    }
    if(currentMode === 'dateEnd'){
      setShowDateEnd(true)
    }
    if (currentMode === 'time') {
        setShowTimeStart(true);
    }
    if (currentMode === 'timeEnd') {
      setShowTimeEnd(true);
    }
  };
  
    // DateTime handler 2
  const onChangeDateStart = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShowDateStart(Platform.OS === 'ios'); // why this? 
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setTextDateStart(fDate);

    setShowDateStart(false);
}
    // DateTime handler 3
  const onChangeDateEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    
    setShowDateEnd(Platform.OS === 'ios'); // why this?
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setTextDateEnd(fDate);
    
    setShowDateEnd(false)
  }

  // dateTime handler 4
  const onChangeTimeStart = (event, selectedTime) => {
    const currentTime = selectedTime || time;

    setShowTimeStart(Platform.OS === 'ios'); // why this?
    setTime(currentTime);

    let tempTime = new Date(currentTime);
    let fTime = tempTime.getHours() + ':' + tempTime.getMinutes();
    setTextTimeStart(fTime);

    setShowTimeStart(false)
    }

  const onChangeTimeEnd = (event, selectedTime) => {
    const currentTime = selectedTime || time;

    setShowTimeEnd(Platform.OS === 'ios'); // why this?
    setTime(currentTime);

    let tempTime = new Date(currentTime);
    let fTime = tempTime.getHours() + ':' + tempTime.getMinutes();
    setTextTimeEnd(fTime);

    setShowTimeEnd(false)
  }

  async function handleSubmit () {
    // Todavía tenemos algunos temas con esta prop. El if no va a estar en el futuro, es un parche.
    if(!isPublic && !isPrivate) return Alert.alert('Selecciona un tipo de evento.')  

    // Form Validation
    let errorsForm = validate({
      title,
      description,
      fee,
      isPublic: isPublic? true : false,
      photo,
      category: categories,
      start: {
        date: textDateStart,
        time: textTimeStart
      },
      end: {
        date: textDateEnd,
        time: textTimeEnd
      },
      location: {
        lat: location.coords.latitude,
        long: location.coords.longitude
      },
      createdAt: new Date()
    })

    // Add Form to Firebase as a document.
    if (Object.keys(errorsForm).length === 0) {
      await addDoc(collection(db, "events"), {
        title,
        description,
        fee,
        isPublic: isPublic? true : false,
        photo,
        category: categories,
        start: {
          date: textDateStart,
          time: textTimeStart
        },
        end: {
          date: textDateEnd,
          time: textTimeEnd
        },
        location: {
          lat: location.coords.latitude,
          long: location.coords.longitude
        },
        createdAt: new Date()
    });
    } else {
      // Este mensaje va a devolver un alert con el mensaje de la primer prop del estado `errors` en el futuro
      return Alert.alert('Hay errores en los campos del formulario.')
    }
    if(fee === 0) Alert.alert('Tu evento será gratuito.')
    Alert.alert('Evento creado');

    
    //Navegamos al login porque en nuestra rama no está el Home en el navigator. Pero navegaríamos a Home
    navigation.replace('Login')
  };

  return (
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

        {/* DATE/TIME PICKER */}
        <View style={{
          flex: 1,
          backgroundColor: '#298bc4',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={styles.horaCont}>
            <Input
              label="Fecha Inicio:"
              placeholder="Fecha..."
              inputStyle={styles.input}
              labelStyle={styles.label}
              inputContainerStyle={styles.inputHoraContainer}
              value={textDateStart}
            />
            <TouchableOpacity onPress={() => showMode('date')}>
              <MaterialIcons name="date-range" size={45} color="black" style={styles.reloj} />
            </TouchableOpacity>
          </View>

          <View style={styles.horaCont}>
            <Input
              label="Hora Inicio:"
              placeholder="Hora..."
              inputStyle={styles.input}
              labelStyle={styles.label}
              inputContainerStyle={styles.inputHoraContainer}
              value={textTimeStart}
            />
            <TouchableOpacity onPress={() => showMode('time')}>
              <Feather name="clock" size={45} color="black" style={styles.reloj} />
            </TouchableOpacity>
          </View>

          <View style={styles.horaCont}>
            <Input
              label="Finalización del Evento:"
              placeholder="Fecha..."
              inputStyle={styles.input}
              labelStyle={styles.label}
              inputContainerStyle={styles.inputHoraContainer}
              value={textDateEnd}
            />
            <TouchableOpacity onPress={() => showMode('dateEnd')}>
              <MaterialIcons name="date-range" size={45} color="black" style={styles.reloj} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.horaCont}>
            <Input
              label="Hora de Finalización:"
              placeholder="Hora..."
              inputStyle={styles.input}
              labelStyle={styles.label}
              inputContainerStyle={styles.inputHoraContainer}
              value={textTimeEnd}
            />
            <TouchableOpacity onPress={() => showMode('timeEnd')}>
            <Feather name="clock" size={45} color="black" style={styles.reloj} />
            </TouchableOpacity>
          </View>

            {showDateStart && (
              <DateTimePicker
                testID='dateTimePicker'
                value={date}
                mode='date'
                // is24Hour={false}
                display='default'
                minimumDate={new Date()}
                onChange={onChangeDateStart}
              />
            )}
            {showDateEnd && (
              <DateTimePicker
                testID='dateTimePicker'
                value={date}
                mode='date'
                // is24Hour={false}
                display='default'
                minimumDate={date}
                onChange={onChangeDateEnd}
              />
            )}
            {showTimeStart && (
              <DateTimePicker
                testID='dateTimePicker'
                value={time}
                mode='time'
                is24Hour={true}
                display='default'
                onChange={onChangeTimeStart}
              />
            )}
            {showTimeEnd && (
              <DateTimePicker
                testID='dateTimePicker'
                value={time}
                mode='time'
                is24Hour={true}
                display='default'
                onChange={onChangeTimeEnd}
              />
            )}
        </View>
        {/* FINISH DATE/TIME PICKER */}
        
        {/* CATEGORIES CHECKBOXES */}
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
          <Input 
            label="Fotos" 
            placeholder="Añadir link de la foto..." 
            inputStyle={styles.input}
            labelStyle={styles.label}
            inputContainerStyle={styles.inputcont}
            onChangeText={handlePhoto}
          />
          <TouchableOpacity style={styles.btn} onPress={handleCategories}>
            <Text>Mostrar Categorias</Text>
          </TouchableOpacity>     
          
        {
          showCategories && !bar && !deportes && !musica && !teatro && !fiesta?
          
            <View>
              <CheckBox 
                title="Bar" 
                onPress={()=> {
                  setCategories('Bar')
                  setBar(!bar)
                  if(bar) return setCategories('')
                }} 
                checked={bar}
                />
              <CheckBox 
                title="Deportes" 
                onPress={()=> {
                  setCategories('Deportes')
                  setDeportes(!deportes)
                  if(deportes) return setCategories('')
                }} 
                checked={deportes}
              />
              <CheckBox 
                title="Fiesta" 
                onPress={()=> {
                setCategories('Fiesta')
                setFiesta(!fiesta)
                if(fiesta) return setCategories('')
              }} 
              checked={fiesta}
              />
              <CheckBox 
                title="Musica" 
                onPress={()=> {
                  setCategories('Musica')
                  setMusica(!musica)
                  if(musica) return setCategories('')
              }} 
              checked={musica}
              />
              <CheckBox 
                title="Teatro" 
                onPress={()=> {
                  setCategories('Teatro')
                  setTeatro(!teatro)
                  if(teatro) return setCategories('')
              }} 
              checked={teatro}
              />
            </View>
            : bar? 
            <CheckBox 
              title="Bar"
              onPress={()=> {
                setCategories('Bar')
                setBar(!bar)
                if(bar) return setCategories('')
                }} 
              checked={bar}
              />
              : deportes? 
              <CheckBox 
                title="Deportes" 
                onPress={()=> {
                  setCategories('Deportes')
                  setDeportes(!deportes)
                  if(deportes) return setCategories('')
                }} 
                checked={deportes}
              />
            
            : fiesta? 
            <CheckBox 
              title="Fiesta" 
              onPress={()=> {
                setCategories('Fiesta')
                setFiesta(!fiesta)
                if(fiesta) return setCategories('')
              }} 
              checked={fiesta}
            />
          
          : musica? 
          <CheckBox 
            title="Musica" 
            onPress={()=> {
              setCategories('Musica')
              setMusica(!musica)
              if(musica) return setCategories('')
            }} 
            checked={musica}
          />
          : teatro? 
          <CheckBox 
            title="Teatro" 
            onPress={()=> {
              setCategories('Teatro')
              setTeatro(!teatro)
              if(teatro) return setCategories('')
            }} 
            checked={teatro}
          /> : null
        }
        {/* FINISH CATEGORIES CHECKBOXES */}
        
        <TouchableOpacity title="Crear Evento" onPress={handleSubmit} style={styles.btn}>
          <Text style={{color:'white'}}>Crear Evento</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default FormEvent;