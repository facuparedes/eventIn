import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { getEventsByName, getEvents } from "../../redux/actions";

export default function Search() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  console.log("soy el title", title);

  function handleInputChange(text) {
    setTitle(text);
    //console.log('soy el input', title);
  }

  function handleSubmit() {
    if (title === "todos") {
      dispatch(getEvents());
    } else {
      dispatch(getEventsByName(title));
    }
    console.log("el boton", title);
    setTitle("");
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} placeholder="Search" placeholderTextColor="#fff" onChangeText={handleInputChange} />
      <TouchableOpacity style={styles.touchableOpacity} onPress={handleSubmit}>
        <Feather name="search" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
}
