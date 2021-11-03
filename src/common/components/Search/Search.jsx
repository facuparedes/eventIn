import React from "react";
import { View, TextInput, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Search() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} placeholder="Search" placeholderTextColor="#fff" />
      <Feather name="search" style={styles.iconStyle} />
    </View>
  );
}
