import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
// import { getEventsByName } from "../../../store/actions/events";


export default function Search() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");


  function handleInputChange(text) {
    setTitle(text);
    console.log('soy el input', title);
  }

  // function handleSubmit(){
  //   dispatch(getEventsByName(title));
  //   console.log('el boton', search);
  //   setSearch("");
  // }

  return (
    <View style={styles.container}>
      <TextInput 
      style={styles.textInput} 
      placeholder="Search" 
      placeholderTextColor="#fff" 
      onChangeText={handleInputChange}
      />
      <TouchableOpacity style={styles.touchableOpacity} onPress={handleSubmit} >
      <Feather name="search" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
}
