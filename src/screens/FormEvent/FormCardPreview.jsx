import React from "react";
import { View, Image, ScrollView, FlatList, Alert, Dimensions } from "react-native";
import { Text, LinearProgress } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import formStyles from "./FormStyles";
import estilos from "./CardPreviewStyles";
import styles from "../Card Detail/CardDetailStyles.js";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { colorPallete } from "../Onboarding/styles";

const { width, height } = Dimensions.get("window");

const FormCardPreview = ({ navigation }) => {
  const eventInfo = useSelector((state) => state.eventForm);

  var startDay = eventInfo.start.date.getDate() + "-" + (eventInfo.start.date.getMonth() + 1) + "-" + eventInfo.start.date.getFullYear();
  var startHour = (eventInfo.start.time.getHours() < 10 ? "0" : "") + eventInfo.start.time.getHours() + ":" + (eventInfo.start.time.getMinutes() < 10 ? "0" : "") + eventInfo.start.time.getMinutes();

  var endDay = eventInfo.end.date.getDate() + "-" + (eventInfo.end.date.getMonth() + 1) + "-" + eventInfo.end.date.getFullYear();
  var endHour = (eventInfo.end.time.getHours() < 10 ? "0" : "") + eventInfo.end.time.getHours() + ":" + (eventInfo.end.time.getMinutes() < 10 ? "0" : "") + eventInfo.end.time.getMinutes();
  var gallery = eventInfo.attachments.slice(1);

  return (
    <SafeAreaView style={formStyles.container}>
      <ScrollView>
        <LinearProgress color={colorPallete.third} variant="determinate" value={0.8} style={{ height: 10 }} />
        <View style={formStyles.header}>
          <Text style={formStyles.textHeader}>Paso 4 de 5</Text>
        </View>
        <View style={formStyles.textAndImg}>
          <Text style={formStyles.titleText}>Vista previa del Evento</Text>
          <Image source={require("../../assets/Logo.png")} style={formStyles.logoImage} />
        </View>

        {/* <Text>Detalle del Evento:</Text> */}

        <View style={estilos.cardContainer}>
          {/* DETAIL CARD */}
          <View style={[styles.header, { height: height * 0.34 }]}>
            <Image style={[styles.img, { width: "102%", marginTop: -20, borderRadius: 10 }]} source={{ uri: `${eventInfo.attachments[0]}` }} />
            <View style={[styles.btnLikeBackground, { paddingTop: height * 0.27 }]}>
              <FontAwesome name="circle" size={45} color="rgba(255, 255, 255, 0.8)" style={{ marginRight: 8.5 }} />
            </View>
            <View style={[styles.btnLike, { paddingTop: height * 0.285 }]}>
              <AntDesign name={"heart"} size={24} color={"#E64141"} />
            </View>
          </View>

          <View style={[styles.body, { width: "102%", paddingBottom: 12 }]}>
            <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
              <View style={styles.contentTitled}>
                <View style={{ flex: 3 }}>
                  <Text style={styles.title}>{eventInfo.title}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fee}>{eventInfo.fee === 0 ? "Gratis" : `$${eventInfo.fee}`}</Text>
                </View>
              </View>
              <View style={styles.dataContain}>
                <View style={{ flex: 3 }}>
                  <Text style={styles.textBody}>
                    <Text style={{ fontFamily: "Gotham-Medium" }}>Inicia: </Text> {startDay} - {startHour}hs
                  </Text>
                  <Text style={styles.textBody}>
                    <Text style={{ fontFamily: "Gotham-Medium" }}>Finaliza:</Text> {endDay} - {endHour}hs
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", borderRadius: 10, elevation: 10, backgroundColor: "white" }}>
                  <Image style={styles.maps} source={require("../../assets/maps.jpg")} />
                </View>
              </View>
              <View style={styles.descContent}>
                <Text style={styles.subTitle}>Descripción</Text>
                <Text style={styles.textBody}>{eventInfo.description}</Text>
                <Text style={styles.subTitle}>Categoría</Text>
                <Text style={styles.textBody}>{eventInfo.category}</Text>
                <Text style={styles.subTitle}>Galería del evento</Text>
                {gallery.length ? (
                  <View style={{ paddingVertical: 10 }}>
                    <FlatList data={gallery} horizontal renderItem={({ item, id }) => <Image source={{ uri: item }} style={styles.flatList} />} keyExtractor={(item) => item.id} />
                  </View>
                ) : (
                  <View>
                    <Text style={styles.textBody}>No hay contenido disponible.</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={formStyles.btnsContainer}>
          <TouchableOpacity title="Atras" onPress={() => navigation.goBack()} style={formStyles.btnExit}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
            <Text style={formStyles.textBtn}> Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity title="Siguiente..." onPress={() => navigation.navigate("PaymentCalc")} style={formStyles.btnContinue}>
            <Text style={formStyles.textBtn}>Siguiente </Text>
            <AntDesign name="arrowright" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormCardPreview;
