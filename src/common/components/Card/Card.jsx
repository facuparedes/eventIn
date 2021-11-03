import moment from "moment";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles.js";

export default function Card({ id, title, description, date, photo, navigation }) {
  const diff = moment(date).diff(moment.now(), "hours");
  const isToday = diff < 24 && diff >= 0;
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("CardDetail",{
        id: id
      })}>  
        <View style={styles.card_header}>
          <Text style={styles.card_header_title}>{title}</Text>
          <Text numberOfLines={3} style={styles.card_header_title_description}>
            {description}
          </Text>
        </View>
        <View style={styles.card_body}>
          <Image source={{ uri: photo }} style={styles.card_body_image} resizeMode={"cover"} />
          <Text style={[styles.card_body_date, isToday ? styles.card_body_date_active : ""]}>{moment(date).toNow()}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
