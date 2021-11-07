import React from "react";
import { View, Image, Alert} from "react-native";
import { Input, Text, LinearProgress } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import formStyles from "./FormStyles";
import Event from '../../../api/firebase/models/event'
import moment from "moment";
import estilos from "./CardPreviewStyles";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const FormCardPreview = ({ navigation }) => {
  const eventInfo = useSelector((state) => state.eventForm);

  const diff = moment(moment.now()).diff(eventInfo.start.date, "hours");
  const isToday = diff < 24 && diff >= 0;

  const handleAccept = async () => {
    Event.create(eventInfo);
    // ESTO HAY QUE SACARLO CUANDO PONGAMOS PASARELA DE PAGO!! ES SOLO PARA LA SEGUNDA DEMO.
    Alert.alert('Tu evento ha sido creado!');
    navigation.replace('TabBar');
  }


  return (
    <SafeAreaView style={estilos.container}>
      <LinearProgress color="lightgreen" variant="determinate" value={0.9} />
      <View style={(estilos.textAndImg)}>
        <Text h4 style={estilos.titleText}>
          Vista previa del Evento:
        </Text>
        <Image source={require("../../assets/Logo.png")} style={[estilos.logoImage, {marginLeft: 40}]} />
      </View>
      
      <View style={estilos.cardContainer}>
      {/*CARD PREVIEW*/}
      
        <View style={estilos.card_header}>
        <View style={estilos.cardItems}>
          <Text style={estilos.card_header_title}>{eventInfo.title}</Text>
          <Text numberOfLines={3} style={estilos.card_header_description}> {eventInfo.description}</Text>
        </View>
        <View style={estilos.card_body}>
          <Image source={{ uri: eventInfo.attachments[0] }} style={estilos.card_body_image} resizeMode={"cover"} />
          <Text style={[estilos.card_body_date, isToday ? estilos.card_body_date_active : ""]}>{moment(eventInfo.start.date).toNow()}</Text>
        </View>

    <View style={estilos.card_boton}>
        <TouchableOpacity >
          <AntDesign name= "heart"  size={24} color="#E64141"  />
        </TouchableOpacity>
        <TouchableOpacity >
          <Ionicons name="share-social" size={24} color="black" />
        </TouchableOpacity>
    </View>

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
