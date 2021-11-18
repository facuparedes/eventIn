import moment from "moment";
import React, { useState } from "react";
import { getLikedEvents } from "../../redux/actions.js";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, TouchableOpacity, Button, Alert } from "react-native";
import { styles } from "./styles.js";
import { AntDesign } from "@expo/vector-icons";
import Event from "../../../../api/firebase/models/event.js";
import user from "../../../../api/firebase/models/user.js";
import auth from "../../../../api/firebase/services/AuthService";

export default function Card({ id, title, description, dateStart, attachments, navigation, likedActive, latlng }) {
  const logged = useSelector((state) => state.isLogged); 
  const dispatch = useDispatch();

  const diffStart = moment(dateStart).diff(moment.now(), "hours");
  const isToday = diffStart < 24 && diffStart >= 0;
  var today = new Date();

  const [liked, setLiked] = useState(likedActive);

  const addLike = () => {
    if (logged) {
      if (!liked) {
        user
          .addRelation("events", "liked", { eventUUID: id, userUUID: auth.currentUser.uid })
          .then(() => dispatch(getLikedEvents(auth.currentUser.uid)))
          .catch((e) => console.log(e));
        setLiked(!liked);
      } else {
        user
          .include("events", "liked", auth.currentUser.uid)
          .find()
          .then((data) => {
            let likedEvent = data["events-liked"].find((e) => e.eventUUID === id);
            let docId = likedEvent.id;
            user.deleteRelation("events", "liked", auth.currentUser.uid, docId);
          })
          .then(() => dispatch(getLikedEvents(auth.currentUser.uid)))
          .catch((e) => console.log(e));

        setLiked(!liked);
      }
    } else {
      Alert.alert("Hola invitado", "Tenés que iniciar sesión para likear un evento.", [{ text: "Ahora no" }, { text: "Iniciar sesión", onPress: () => navigation.navigate("Login") }]);
    }
  };

  const shared = () => {
    //acá se abriría las opciones para compartir
  };

  const deleteEvent = () => {
    Alert.alert("Advertencia", "Estás seguro de que deseas eliminar este evento?", [
      {
        text: "Aceptar",
        onPress: () => {
          try {
            Event.delete(id);
            Alert.alert(`El evento con id ${id} ha sido eliminado`);
          } catch (e) {
            console.log("DELETE EVENT ERROR", e);
          }
        },
      },
      { text: "Cancelar" },
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.btn_container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CardDetail", {
              likedAct: liked,
              id: id,
              latlng: latlng,
            })
          }
        >
          <View style={styles.card_header}>
            <Text style={styles.card_header_title}>{title}</Text>
            <Text numberOfLines={3} style={styles.card_header_description}>
              {description}
            </Text>
            {logged.email === "admin@gmail.com" && <Button title="X" onPress={deleteEvent} />}
          </View>
          <View style={styles.card_body}>
            <Image source={{ uri: attachments }} style={styles.card_body_image} resizeMode={"cover"} />

            {dateStart > today ? (
              <Text style={[styles.card_body_date, isToday ? styles.card_body_date_active : ""]}>{moment(dateStart).fromNow()}</Text>
            ) : (
              <Text style={[styles.card_body_date, styles.card_body_date_active]}>en curso</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.card_footer}>
        <TouchableOpacity onPress={addLike}>
          <AntDesign name={liked ? "heart" : "hearto"} size={27} color={liked ? "#E64141" : "black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
