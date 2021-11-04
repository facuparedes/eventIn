import React, { useState, useEffect } from "react";
import { Alert, View, Platform, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, CheckBox, Text, Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./FormStyles";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import Event from "../../../api/firebase/models/event";
import event from "../../../api/firebase/models/event";

// Validate Function
function validate(form) {
  let errorsValidate = {};
  if (!form.title) {
    errorsValidate.title = "Tu evento debe tener un nombre.";
  }
  if (form.title.length > 30) {
    errorsValidate.titleL = "El nombre de tu evento no puede tener más de 30 carácteres.";
  }
  if (!form.description) {
    errorsValidate.description = "Tu evento debe tener una descripción.";
  }
  if (form.description.length > 140) {
    errorsValidate.descriptionL = "La descripción no puede tener más de 140 carácteres.";
  }
  // if(!form.locationText) {
  //   errorsValdiate.LocationText = 'Debes ingresar una ubicación para tu evento.'
  // }
  if (!/^[0-9]+$/.test(form.fee)) {
    errorsValidate.fee = "La tarifa debe ser un número.";
  }
  if (form.fee < 0) {
    errorsValidate.feeM = "La tarifa no puede ser menor a 0.";
  }
  if (!form.category) {
    errorsValidate.category = "Debes seleccionar una categoría.";
  }
  if (!form.start.date || !form.start.time) {
    errorsValidate.start = "Tu evento debe tener una fecha y hora de inicio.";
  }
  if (!form.end.date || !form.end.time) {
    errorsValidate.end = "Tu evento debe tener una fecha y hora de finalización.";
  }
  if (!form.photo) {
    errorsValidate.photo = "Debes ingresar un link con una foto.";
  }
  // if(errorsMsg) {
  //   errorsValidate.location = 'Debes permitir el acceso a tu ubicación.'
  // }
  return errorsValidate;
}

const FormEvent = ({ navigation }) => {
  const [errors, setErrors] = useState({});
  // form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locationText, setLocationText] = useState("");
  const [fee, setFee] = useState(0);
  const [isPublic, setIsPublic] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [photo, setPhoto] = useState("");
  // DateTime states (also form)
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [dateValueStart, setDateValueStart] = useState(new Date());
  const [timeValueStart, setTimeValueStart] = useState(new Date());
  const [dateValueEnd, setDateValueEnd] = useState(new Date());
  const [timeValueEnd, setTimeValueEnd] = useState(new Date());
  // DateTime states (not form)
  const [showDateStart, setShowDateStart] = useState(false);
  const [showDateEnd, setShowDateEnd] = useState(false);
  const [showTimeStart, setShowTimeStart] = useState(false);
  const [showTimeEnd, setShowTimeEnd] = useState(false);
  const [textDateStart, setTextDateStart] = useState("");
  const [textDateEnd, setTextDateEnd] = useState("");
  const [textTimeStart, setTextTimeStart] = useState("");
  const [textTimeEnd, setTextTimeEnd] = useState("");
  // Categories states (not form)
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState("");
  const [bar, setBar] = useState(false);
  const [deportes, setDeportes] = useState(false);
  const [fiesta, setFiesta] = useState(false);
  const [teatro, setTeatro] = useState(false);
  const [musica, setMusica] = useState(false);
  //Location states
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // En este useEffect pedimos acceso a la ubicación actual del usuario.
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Los permisos fueron denegados");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      Alert.alert("ESTE EVENTO SERÁ CREADO EN TU UBICACIÓN ACTUAL");
    })();
  }, []);

  if (errorMsg) {
    Alert.alert(errorMsg);
  }

  // Event Handlers
  const handleTitle = (text) => {
    setTitle(text);
  };

  const handleDescription = (text) => {
    setDescription(text);
  };

  const handleLocationText = (text) => {
    setLocationText(text);
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
    setPhoto(text);
  };

  const handleCategories = () => {
    setShowCategories(!showCategories);
  };

  // DateTime handler 1
  const showMode = (currentMode) => {
    if (currentMode === "date") {
      setShowDateStart(true);
    }
    if (currentMode === "dateEnd") {
      setShowDateEnd(true);
    }
    if (currentMode === "time") {
      setShowTimeStart(true);
    }
    if (currentMode === "timeEnd") {
      setShowTimeEnd(true);
    }
  };

  // DateTime handler 2
  const onChangeDateStart = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShowDateStart(Platform.OS === "ios"); // why this?
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
    setTextDateStart(fDate);
    setDateValueStart(tempDate);
    setShowDateStart(false);
  };

  const onChangeDateEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShowDateEnd(Platform.OS === "ios"); // why this?
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
    setTextDateEnd(fDate);
    setDateValueEnd(tempDate);
    setShowDateEnd(false);
  };

  // DateTime handler 3
  const onChangeTimeStart = (event, selectedTime) => {
    const currentTime = selectedTime || time;

    setShowTimeStart(Platform.OS === "ios"); // why this?
    setTime(currentTime);

    let tempTime = new Date(currentTime);
    let fTime = tempTime.getHours() + ":" + tempTime.getMinutes();
    setTextTimeStart(fTime);
    setTimeValueStart(tempTime);
    setShowTimeStart(false);
  };

  // DateTime handler 4
  const onChangeTimeEnd = (event, selectedTime) => {
    const currentTime = selectedTime || time;

    setShowTimeEnd(Platform.OS === "ios"); // why this?
    setTime(currentTime);

    let tempTime = new Date(currentTime);
    let fTime = tempTime.getHours() + ":" + tempTime.getMinutes();
    setTextTimeEnd(fTime);
    setTimeValueEnd(tempTime);
    setShowTimeEnd(false);
  };

  async function handleSubmit() {
    // Esto es un parche, no va a estar en el futuro.
    if (!isPublic && !isPrivate) return Alert.alert("Selecciona un tipo de evento.");

    // Form validation
    let errorsForm = validate({
      title,
      description,
      fee,
      isPublic: isPublic ? true : false,
      photo,
      category: categories,
      start: {
        date: dateValueStart,
        time: timeValueStart,
      },
      end: {
        date: textDateEnd,
        time: textTimeEnd,
      },
      location: {
        lat: location.coords.latitude,
        long: location.coords.longitude,
      },
    });

    if (Object.keys(errorsForm).length === 0) {
      let feeNum = Number(fee);
      Event.create({
        title,
        description,
        fee: feeNum,
        isPublic: isPublic ? true : false,
        photo,
        category: categories,
        start: {
          date: dateValueStart,
          time: timeValueStart,
        },
        end: {
          date: dateValueEnd,
          time: timeValueEnd,
        },
        location: {
          lat: location.coords.latitude,
          long: location.coords.longitude,
        },
      });
    } else {
      return Alert.alert("Error en la información ingresada.");
    }
    if (fee === 0) Alert.alert("Tu evento será gratuito");
    Alert.alert("Evento creado");

    // Navegamos a Login porque no tenemos a Home en el Navigator, pero en el futuro navegaremos a Home.
    navigation.navigate("Home");
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    event.__upload([result.uri]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textAndImg}>
        <Text h4 style={styles.titleText}>
          Crea tu Evento
        </Text>
        <Image source={require("../../assets/Logo.png")} style={styles.logoImage} />
      </View>

      <ScrollView style={styles.scrollView}>
        <Input label="Nombre" placeholder="Nombre del evento" onChangeText={handleTitle} inputStyle={styles.input} labelStyle={styles.label} inputContainerStyle={styles.inputCont} />

        <Input label="Tarifa" placeholder="Tarifa" inputStyle={styles.input} labelStyle={styles.label} inputContainerStyle={styles.inputCont} onChangeText={handleFee} />

        {/* DATE/TIME PICKER */}
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.horaCont}>
            <Input label="Fecha de Inicio" placeholder="Fecha" inputStyle={styles.input} labelStyle={styles.label} inputContainerStyle={styles.inputHoraContainer} value={textDateStart} />
            <TouchableOpacity onPress={() => showMode("date")}>
              <MaterialIcons name="date-range" size={40} color="black" style={styles.reloj} />
            </TouchableOpacity>
          </View>

          <View style={styles.horaCont}>
            <Input label="Hora de Inicio" placeholder="Hora" inputStyle={styles.input} labelStyle={styles.label} inputContainerStyle={styles.inputHoraContainer} value={textTimeStart} />
            <TouchableOpacity onPress={() => showMode("time")}>
              <Feather name="clock" size={40} color="black" style={styles.reloj} />
            </TouchableOpacity>
          </View>

          <View style={styles.horaCont}>
            <Input label="Fecha de Finalización" placeholder="Fecha" inputStyle={styles.input} labelStyle={styles.label} inputContainerStyle={styles.inputHoraContainer} value={textDateEnd} />
            <TouchableOpacity onPress={() => showMode("dateEnd")}>
              <MaterialIcons name="date-range" size={40} color="black" style={styles.reloj} />
            </TouchableOpacity>
          </View>

          <View style={styles.horaCont}>
            <Input label="Hora de Finalización" placeholder="Hora" inputStyle={styles.input} labelStyle={styles.label} inputContainerStyle={styles.inputHoraContainer} value={textTimeEnd} />
            <TouchableOpacity onPress={() => showMode("timeEnd")}>
              <Feather name="clock" size={40} color="black" style={styles.reloj} />
            </TouchableOpacity>
          </View>

          {showDateStart && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              // is24Hour={false}
              display="default"
              minimumDate={new Date()}
              onChange={onChangeDateStart}
            />
          )}
          {showDateEnd && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              // is24Hour={false}
              display="default"
              minimumDate={new Date()}
              onChange={onChangeDateEnd}
            />
          )}
          {showTimeStart && <DateTimePicker testID="dateTimePicker" value={time} mode="time" is24Hour={true} display="default" onChange={onChangeTimeStart} />}
          {showTimeEnd && <DateTimePicker testID="dateTimePicker" value={time} mode="time" is24Hour={true} display="default" onChange={onChangeTimeEnd} />}
        </View>

        {/* FINISH DATE/TIME PICKER */}

        {/* CATEGORIES CHECKBOXES */}
        <Text style={styles.textType}>Tipo de evento:</Text>
        <View style={styles.checkBox}>
          {!isPublic && !isPrivate ? (
            <View style={styles.checkBox}>
              <CheckBox title="Público" onPress={handleIsPublic} size={20} checked={isPublic} containerStyle={styles.boxCont} />
              <CheckBox title="Privado" onPress={handleIsPrivate} checked={isPrivate} containerStyle={styles.boxCont} />
            </View>
          ) : isPublic ? (
            <CheckBox title="Publico" onPress={handleIsPublic} size={20} checked={isPublic} containerStyle={styles.boxCont} />
          ) : (
            <CheckBox title="Privado" onPress={handleIsPrivate} checked={isPrivate} containerStyle={styles.boxCont} />
          )}
        </View>

        <Input label="Descripción" placeholder="Descripción..." onChangeText={handleDescription} inputStyle={styles.input} labelStyle={styles.label} inputContainerStyle={styles.inputCont} />

        <Input label="Ubicación" placeholder="Ingresar dirección" onChangeText={handleLocationText} inputStyle={styles.input} labelStyle={styles.label} inputContainerStyle={styles.inputCont} />

        {/* <Input label="Fotos" placeholder="Añadir link de la foto" inputStyle={styles.input} labelStyle={styles.label} inputContainerStyle={styles.inputCont} onChangeText={handlePhoto} /> */}
        <Button title="Upload file" onPress={pickImage} />

        <TouchableOpacity style={styles.btnCategories} onPress={handleCategories}>
          <View style={styles.categoriesView}>
            <Text style={styles.textCat}>Categorias</Text>
            <MaterialIcons name="arrow-drop-down" size={30} color="black" style={styles.catIcon} />
          </View>
        </TouchableOpacity>
        {showCategories && !bar && !deportes && !musica && !teatro && !fiesta ? (
          <View>
            <CheckBox
              title="Bar"
              onPress={() => {
                setCategories("Bar");
                setBar(!bar);
                if (bar) return setCategories("");
              }}
              checked={bar}
              containerStyle={styles.boxCont}
            />
            <CheckBox
              title="Deportes"
              onPress={() => {
                setCategories("Deportes");
                setDeportes(!deportes);
                if (deportes) return setCategories("");
              }}
              checked={deportes}
              containerStyle={styles.boxCont}
            />
            <CheckBox
              title="Fiesta"
              onPress={() => {
                setCategories("Fiesta");
                setFiesta(!fiesta);
                if (fiesta) return setCategories("");
              }}
              checked={fiesta}
              containerStyle={styles.boxCont}
            />
            <CheckBox
              title="Musica"
              onPress={() => {
                setCategories("Musica");
                setMusica(!musica);
                if (musica) return setCategories("");
              }}
              checked={musica}
              containerStyle={styles.boxCont}
            />
            <CheckBox
              title="Teatro"
              onPress={() => {
                setCategories("Teatro");
                setTeatro(!teatro);
                if (teatro) return setCategories("");
              }}
              checked={teatro}
              containerStyle={styles.boxCont}
            />
          </View>
        ) : bar ? (
          <CheckBox
            title="Bar"
            onPress={() => {
              setCategories("Bar");
              setBar(!bar);
              if (bar) return setCategories("");
            }}
            checked={bar}
            containerStyle={styles.boxCont}
          />
        ) : deportes ? (
          <CheckBox
            title="Deportes"
            onPress={() => {
              setCategories("Deportes");
              setDeportes(!deportes);
              if (deportes) return setCategories("");
            }}
            checked={deportes}
            containerStyle={styles.boxCont}
          />
        ) : fiesta ? (
          <CheckBox
            title="Fiesta"
            onPress={() => {
              setCategories("Fiesta");
              setFiesta(!fiesta);
              if (fiesta) return setCategories("");
            }}
            checked={fiesta}
            containerStyle={styles.boxCont}
          />
        ) : musica ? (
          <CheckBox
            title="Musica"
            onPress={() => {
              setCategories("Musica");
              setMusica(!musica);
              if (musica) return setCategories("");
            }}
            checked={musica}
            containerStyle={styles.boxCont}
          />
        ) : teatro ? (
          <CheckBox
            title="Teatro"
            onPress={() => {
              setCategories("Teatro");
              setTeatro(!teatro);
              if (teatro) return setCategories("");
            }}
            checked={teatro}
            containerStyle={styles.boxCont}
          />
        ) : null}
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
