import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { getEventsByDate } from "../../redux/actions";

export default function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log("Fecha elegida: ", date);
    dispatch(getEventsByDate(date));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => showMode("date")}>
        <MaterialIcons name="date-range" size={70} color="#29adbf" style={{marginLeft: "30%"}} />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          //is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
