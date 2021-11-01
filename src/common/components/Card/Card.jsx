import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles.js";

export default function Card({ id, title, description, date, photo }) {
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <View style={styles.card}>
      <Text style={styles.title}> {title} </Text>
      <Text style={styles.text}>{`${day} de ${months[month]}, ${year}`}</Text>
      <Image source={{ uri: photo }} style={styles.image} />
      <Text style={styles.text}>{`${description.slice(0, 45)}...`}</Text>
    </View>
  );
}
