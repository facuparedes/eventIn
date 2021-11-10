import moment from "moment";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { View, Text, Image, TouchableOpacity, Button, Alert } from "react-native";
import { styles } from "./styles.js";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Event from "../../../../api/firebase/models/event.js";

export default function Card({ id, title, description, date, attachments, navigation }) {
  const admin = useSelector(state => state.isLogged)
  const diff = moment(date).diff(moment.now(), "hours");
  const isToday = diff < 24 && diff >= 0;

  const [liked, setLiked] = useState(false);

  const addFavourite = () => {
    console.log(id);
    setLiked(!liked);
    //acá iría el dispatch a addFavourite
  };

  const shared = () => {
    //acá se abriría las opciones para compartir
  };

  const deleteEvent = () => {
    Alert.alert('Advertencia', 'Estás seguro de que deseas eliminar este evento?', [
      {text: 'Aceptar', onPress: () => {
        try {
          Event.delete(id);
          Alert.alert(`El evento con id ${id} ha sido eliminado`)
        } catch(e) {
          console.log('DELETE EVENT ERROR', e);
        }
      }},
      {text: 'Cancelar'}
    ])
  }

  return (
    <View style={styles.card}>
      <View style={styles.btn_container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CardDetail", {
              id: id,
            })
          }
        >
          <View style={styles.card_header}>
            <Text style={styles.card_header_title}>{title}</Text>
            <Text numberOfLines={3} style={styles.card_header_description}>
              {description}
            </Text>
            {
              admin.email === 'admin@gmail.com' && <Button title='X' onPress={deleteEvent}/>
            }
          </View>
          <View style={styles.card_body}>
            <Image source={{ uri: attachments }} style={styles.card_body_image} resizeMode={"cover"} />
            <Text style={[styles.card_body_date, isToday ? styles.card_body_date_active : ""]}>{moment(date).fromNow()}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.card_footer}>
        <TouchableOpacity onPress={addFavourite}>
          <AntDesign name={liked ? "heart" : "hearto"} size={24} color={liked ? "#E64141" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shared} style={{ marginLeft: 10 }}>
          <Ionicons name="share-social" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
