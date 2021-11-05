import React, { useState, useEffect } from "react";
import { View, Image, Alert } from "react-native";
import { Input, Text, LinearProgress } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import formStyles from "./FormStyles";
import {styles} from "../../common/components/Card/styles";
import Event from '../../../api/firebase/models/event'
import moment from "moment";

const FormCardPreview = ({ navigation }) => {
  const eventInfo = useSelector((state) => state.eventForm);

  const diff = moment(moment.now()).diff(eventInfo.start.date, "hours");
  const isToday = diff < 24 && diff >= 0;

  const handleAccept = async () => {
    Event.create(eventInfo);
    navigation.replace("Home")
  }
  return (
    <SafeAreaView style={formStyles.container}>
      <LinearProgress color="lightgreen" variant="determinate" value={0.9} />
      <View style={(formStyles.textAndImg, { marginRight: 10 })}>
        <Text h4 style={formStyles.titleText}>
          Preview del Evento
        </Text>
        <Image source={require("../../assets/Logo.png")} style={formStyles.logoImage} />
      </View>
      {/*CARD PREVIEW*/}
      <View style={styles.card}>
        <View style={{marginLeft: '45%'}}>
          <Text style={styles.card_header_title}>{eventInfo.title}</Text>
          <Text numberOfLines={3} style={styles.card_header_title_description}>
            {eventInfo.description}
          </Text>
        </View>
        <View style={styles.card_body}>
          <Image source={{ uri: eventInfo.photo }} style={styles.card_body_image} resizeMode={"cover"} />
          <Text style={[styles.card_body_date, isToday ? styles.card_body_date_active : ""]}>{moment(eventInfo.start.date).toNow()}</Text>
        </View>
      </View>

      <View style={formStyles.btnsContainer}>
        <TouchableOpacity title="Pago" onPress={handleAccept} style={formStyles.btn}>
          <Text style={formStyles.textBtn}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FormCardPreview;
