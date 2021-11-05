import moment from "moment";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles.js";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function Card({ id, title, description, date, photo, navigation }) {
  const diff = moment(date).diff(moment.now(), "hours");
  const isToday = diff < 24 && diff >= 0;

  const [liked, setLiked] = useState(false);

  const addFavourite = () => {
    setLiked(!liked);
    //acá iría el dispatch a addFavourite
  };

  const shared = () => {
    //acá se abriría las opciones para compartir
  };

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
          </View>
          <View style={styles.card_body}>
            <Image source={{ uri: photo }} style={styles.card_body_image} resizeMode={"cover"} />
            <Text style={[styles.card_body_date, isToday ? styles.card_body_date_active : ""]}>{moment(date).toNow()}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.card_footer}>
        <TouchableOpacity onPress={() => addFavourite}>
          <AntDesign name={liked ? "heart" : "hearto"} size={24} color={liked ? "red" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shared} style={{ marginLeft: 10 }}>
          <Ionicons name="share-social" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
