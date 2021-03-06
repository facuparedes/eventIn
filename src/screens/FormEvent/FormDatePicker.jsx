import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEventInfo } from "../../common/redux/actions";
import { Alert, View, Image, ScrollView } from "react-native";
import { Input, Text, LinearProgress } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./FormStyles";
import { MaterialIcons, Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import { colorPallete } from "../Onboarding/styles";

// Validate Function
function validate(form) {
  let errorsValidate = {};

  if (!form.start.date || !form.start.time) {
    errorsValidate.start = "Tu evento debe tener una fecha y hora de inicio.";
  }
  if (!form.end.date || !form.end.time) {
    errorsValidate.end = "Tu evento debe tener una fecha y hora de finalización.";
  }

  return errorsValidate;
}

const FormDatePicker = ({ navigation }) => {
  const dispatch = useDispatch();
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
    let minutes = tempTime.getMinutes();
    let hours = tempTime.getHours();
    if (minutes.toString().length === 1) minutes = "0" + minutes.toString();
    if (hours < 10) hours = "0" + hours.toString();
    let fTime = hours + ":" + minutes;
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
    let minutes = tempTime.getMinutes();
    let hours = tempTime.getHours();
    if (minutes.toString().length === 1) minutes = "0" + minutes.toString();
    if (hours < 10) hours = "0" + hours.toString();
    let fTime = hours + ":" + minutes;
    setTextTimeEnd(fTime);
    setTimeValueEnd(tempTime);
    setShowTimeEnd(false);
  };

  function handleNext() {
    // Form validation
    let errorsForm = validate({
      start: {
        date: textDateStart,
        time: textTimeStart,
      },
      end: {
        date: textDateEnd,
        time: textTimeEnd,
      },
    });

    if (Object.keys(errorsForm).length === 0) {
      const partialEvent = {
        start: {
          date: dateValueStart,
          time: timeValueStart,
        },
        end: {
          date: dateValueEnd,
          time: timeValueEnd,
        },
      };
      dispatch(addEventInfo(partialEvent));
      navigation.replace("FormMaps");
    } else {
      return Alert.alert(`${Object.values(errorsForm)[0]}`);
    }
  }
  function handleBack() {
    navigation.replace("Form");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LinearProgress color={colorPallete.third} variant="determinate" value={0.4} style={{ height: 10 }} />
        <View style={styles.header}>
          <Text style={styles.textHeader}>Paso 2 de 5</Text>
        </View>

        <View style={styles.subcontainer}>
          <View style={styles.textAndImg}>
            <Text style={styles.titleText}>Selecciona fecha y hora de tu Evento</Text>
          </View>
          <View style={styles.dateContainer}>
            <View style={styles.horaCont}>
              <Input
                label="Fecha de Inicio"
                placeholder="Fecha"
                onFocus={() => showMode("date")}
                showSoftInputOnFocus={false}
                inputStyle={styles.input}
                labelStyle={styles.label}
                inputContainerStyle={styles.inputHoraContainer}
                value={textDateStart}
              />
              <TouchableOpacity onPress={() => showMode("date")}>
                <MaterialIcons name="date-range" size={40} color="black" style={styles.reloj} />
              </TouchableOpacity>
            </View>

            <View style={styles.horaCont}>
              <Input
                label="Hora de Inicio"
                placeholder="Hora"
                onFocus={() => showMode("time")}
                showSoftInputOnFocus={false}
                inputStyle={styles.input}
                labelStyle={styles.label}
                inputContainerStyle={styles.inputHoraContainer}
                value={textTimeStart}
              />
              <TouchableOpacity onPress={() => showMode("time")}>
                <Feather name="clock" size={40} color="black" style={styles.reloj} />
              </TouchableOpacity>
            </View>

            <View style={styles.horaCont}>
              <Input
                label="Fecha de Finalización"
                placeholder="Fecha"
                onFocus={() => showMode("dateEnd")}
                showSoftInputOnFocus={false}
                inputStyle={styles.input}
                labelStyle={styles.label}
                inputContainerStyle={styles.inputHoraContainer}
                value={textDateEnd}
              />
              <TouchableOpacity onPress={() => showMode("dateEnd")}>
                <MaterialIcons name="date-range" size={40} color="black" style={styles.reloj} />
              </TouchableOpacity>
            </View>

            <View style={styles.horaCont}>
              <Input
                label="Hora de Finalización"
                placeholder="Hora"
                onFocus={() => showMode("timeEnd")}
                showSoftInputOnFocus={false}
                inputStyle={styles.input}
                labelStyle={styles.label}
                inputContainerStyle={styles.inputHoraContainer}
                value={textTimeEnd}
              />
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

          <View style={styles.btnsContainer}>
            <TouchableOpacity title="Atras" onPress={handleBack} style={styles.btnExit}>
              <AntDesign name="arrowleft" size={24} color="#fff" />
              <Text style={styles.textBtn}> Volver</Text>
            </TouchableOpacity>
            <TouchableOpacity title="Siguiente..." onPress={handleNext} style={styles.btnContinue}>
              <Text style={styles.textBtn}>Siguiente </Text>
              <AntDesign name="arrowright" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormDatePicker;
