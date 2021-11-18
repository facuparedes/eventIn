import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Alert } from "react-native";
import { getDetails, getLikedEvents } from "../../common/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardDetailStyles";
import { AntDesign, FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";
import user from "../../../api/firebase/models/user";
import auth from "../../../api/firebase/services/AuthService";
import Geocoder from 'react-native-geocoder';

export default function CardDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const { id, likedAct } = route.params;
  const details = useSelector((state) => state.detail);
  const logged = useSelector((state) => state.isLogged);
  const [liked, setLiked] = useState(likedAct);

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

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

  const share = () => {
    //llevar a compartir
  };

  const attachments = details.length && details[0].attachments.slice(1, details[0].attachments.length);

  // const [pin,setPin] = useState({})
  
   const lat = details[0].location.latitude
   const lng = details[0].location.longitude
   console.log('lat',lat)
   console.log('lng',lng)
  const getAddress = async (lat,lng) =>{
  await Geocoder.fallbackToGoogle('AIzaSyDEvbPWfuQvaChx1QrpAPgj_DiXB6R-6Ys')
  try{
  let res= await Geocoder.geocodePosition({lat,lng})
    console.log('respuesta',res)
  // let addr = (res[0].formattedAddress)
    // console.log(addr)
}       
catch(e){ console.log(e)

}
    }
  return (
    <View style={styles.view}>
      {details.length ? (
        <SafeAreaView style={styles.viewCont}>
          <ScrollView>
            <View style={styles.header}>
              <Image style={styles.img} source={{ uri: `${details[0].attachments[0]}` }} />
              <View style={styles.btnBackBg}>
                <AntDesign name="leftcircle" size={35} color="rgba(255, 255, 255, 0.8)" />
              </View>
              <View style={styles.btnBack}>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
                  <Entypo name="chevron-left" size={30} color="rgba(0, 0, 0, 0.6)" />
                </TouchableOpacity>
              </View>
              <View style={styles.btnLikeBackground}>
                <FontAwesome name="circle" size={45} color="rgba(255, 255, 255, 0.8)" style={{ marginRight: 8 }} />
              </View>
              <View style={styles.btnShareBackground}>
                <FontAwesome name="circle" size={45} color="rgba(255, 255, 255, 0.8)" style={{ marginRight: 8 }} />
              </View>
              <View style={styles.btnLike}>
                <TouchableOpacity onPress={addLike}>
                  <AntDesign name={liked ? "heart" : "hearto"} size={24} color={liked ? "#E64141" : "rgba(0, 0, 0, 0.7)"} />
                </TouchableOpacity>
              </View>
              <View style={styles.btnShare}>
                <TouchableOpacity onPress={share}>
                  <Ionicons name="share-social" size={24} color="rgba(0, 0, 0, 0.7)" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.body}>
              <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
                <View style={styles.contentTitled}>
                  <View style={{ flex: 3 }}>
                    <Text style={styles.title}>{details[0].title}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.fee}>{details[0].fee === 0 ? "Gratis" : `$${details[0].fee}`}</Text>
                  </View>
                </View>
                <View style={styles.dataContain}>
                  <View style={{ flex: 3 }}>
                    <Text style={styles.textBody}>
                      <Text style={{ fontFamily: "Gotham-Medium" }}>Inicia:</Text> {details[0].start.toString().slice(4, 15)} - {details[0].start.toString().slice(16, 21)}hs
                    </Text>
                    <Text style={styles.textBody}>
                      <Text style={{ fontFamily: "Gotham-Medium" }}>Finaliza:</Text> {details[0].end.toString().slice(4, 15)} - {details[0].end.toString().slice(16, 21)}hs
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center", borderRadius: 10, elevation: 10, backgroundColor: "white" }}>
                    <TouchableOpacity onPress={() => navigation.navigate("MapDetail", { id: id })}>
                      <Image style={styles.maps} source={require("../../assets/maps.jpg")} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <TouchableOpacity onPress={()=>getAddress(lat,lng)}>
                    <Text>Ubicacion</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.descContent}>
                  <Text style={styles.subTitle}>Descripción</Text>
                  <Text style={styles.textBody}>{details[0].description}</Text>
                  <Text style={styles.subTitle}>Categoría</Text>
                  <Text style={styles.textBody}>{details[0].category}</Text>
                  <Text style={styles.subTitle}>Galería del evento</Text>
                  {attachments.length ? (
                    <View style={{ paddingVertical: 10 }}>
                      <FlatList data={attachments} horizontal renderItem={({ item, id }) => <Image source={{ uri: item }} style={styles.flatList} />} keyExtractor={(item) => item.id} />
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.textBody}>No hay contenido disponible.</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
