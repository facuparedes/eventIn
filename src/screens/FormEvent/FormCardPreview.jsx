import React, {useState} from "react";
import { View, Image, Alert, Modal } from "react-native";
import { Input, Text, LinearProgress } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import formStyles from "./FormStyles";
import Event from "../../../api/firebase/models/event";
import moment from "moment";
import estilos from "./CardPreviewStyles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import styles from "./FormStyles";
import { WebView } from 'react-native-webview';
import axios from "axios";

const FormCardPreview = ({ navigation }) => {
  const eventInfo = useSelector((state) => state.eventForm);

  const diff = moment(moment.now()).diff(eventInfo.start.date, "hours");
  const isToday = diff < 24 && diff >= 0;

  const [pay, setPay] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  const handleResponse = (data) => {
    if(data.includes('/success')){
      setPay(false);
      Alert.alert('Su evento ha sido creado.');
      navigation.replace("TabBar");
      Event.create(eventInfo);
    }
    if(data.includes('/cancel')){
      setPay(false);
      Alert.alert('El pago ha sido rechazado.');
      navigation.replace("TabBar");
    }
  }

  const handleAccept = async () => {
    const post = await axios.post('http://192.168.0.4:3001/checkout', { title: eventInfo.title });//tengo que pasarle la cantidad de dias para calcular el monto
    await console.log(post.data);
    await setRedirectUrl(post.data); // or sth like that
    setPay(true);
  };

  const handleCancel = () => {
    Alert.alert("¿Estás seguro de que deseas salir?", "Se perderán todos los cambios.", [{ text: "Si", onPress: () => navigation.popToTop() }, { text: "No" }]);
  };

  function handleBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={estilos.container}>
      <LinearProgress color="#00BD9D" variant="determinate" value={0.9} style={{height:10}} />
      <View style={estilos.header}>
        <Text style={estilos.textHeader}>Paso 4 de 4</Text>
        </View>
        <Modal
          visible={pay}
          onRequestClose={() => setPay(false)}
        >
          <WebView
            source={{ uri: redirectUrl }}
            onNavigationStateChange={(data) => handleResponse(data.url)}
          />
        </Modal>
      <View style={estilos.textAndImg}>
        <Text h4 style={estilos.titleText}>
          Vista previa del Evento:
        </Text>
        <Image source={require("../../assets/Logo.png")} style={[estilos.logoImage, { marginLeft: 40 }]} />
      </View>

      <View style={estilos.cardContainer}>
        {/*CARD PREVIEW*/}

        <View style={estilos.card_header}>
          <View style={estilos.cardItems}>
            <Text style={estilos.card_header_title}>{eventInfo.title}</Text>
            <Text numberOfLines={3} style={estilos.card_header_description}>
              {eventInfo.description}
            </Text>
          </View>
          <View style={estilos.card_body}>
            <Image source={{ uri: eventInfo.attachments[0] }} style={estilos.card_body_image} resizeMode={"cover"} />
            <Text style={[estilos.card_body_date, isToday ? estilos.card_body_date_active : ""]}>{moment(eventInfo.start.date).fromNow()}</Text>
          </View>

          <View style={estilos.card_boton}>
            <TouchableOpacity>
              <AntDesign name="heart" size={24} color="#E64141" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share-social" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={formStyles.btnsContainer}>
      <TouchableOpacity 
                title="Atras" 
                onPress={handleBack}
                style={[
                  styles.btnCancelarPrewiew,
                  {
                    flexDirection: 'row',
                    backgroundColor:'gray',
                    marginRight: 10,
                  }
                ]} 
                >
                  
                  <AntDesign name="arrowleft" size={28} color="#fff" style={{marginLeft: 15}} />
                  <Text style={[styles.textBtn, {marginRight: 10}]}>Atras</Text>
                </TouchableOpacity>
        <TouchableOpacity title="Pago" onPress={handleAccept} style={formStyles.btnAceptarPrewiew}>
          <Text style={formStyles.textBtn}>Aceptar</Text>
        </TouchableOpacity>

        <TouchableOpacity title="Pago" onPress={handleCancel} style={formStyles.cancelBtn}>
          <Text style={formStyles.cancelTextBtn}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FormCardPreview;


<WebView
          style={{width: '100%', height: '100%', alignSelf: 'center', position: 'absolute'}}
          source={{uri:"http://192.168.0.4:3001/chekout"}}
          />