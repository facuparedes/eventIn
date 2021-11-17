import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from "react-native";
import { getDetails } from "../../common/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardDetailStyles";
import { AntDesign, FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";
import user from "../../../api/firebase/models/user";
import auth from '../../../api/firebase/services/AuthService';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function CardDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);
  const logged = useSelector(state => state.isLogged);
  const [liked, setLiked] = useState(false);
  const { id } = route.params;

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

  // console.log('latitud',details[0].location.latitude)
  // console.log('longitud',details[0].location.longitude)

  const addLike = () => {
    if (logged) {
      if(!liked) {
        user.addRelation('events', 'liked', {eventUUID: id, userUUID: auth.currentUser.uid})
          .then(res=> console.log(res))
          .catch(e=>console.log(e));
        setLiked(!liked);
      } else {
        user.include('events', 'liked', auth.currentUser.uid).find()
          .then(data => {
            let likedEvent = data["events-liked"].find(e => e.eventUUID === id);
            let docId = likedEvent.id;
            user.deleteRelation('events', 'liked', auth.currentUser.uid, docId);
          })
          .then(res => console.log(res))
          .catch(e => console.log(e));

        setLiked(!liked);
      }
    } else {
      Alert.alert("Hola invitado", "Tenés que iniciar sesión para likear un evento.", [
        { text: "Ahora no" }, 
        { text: "Iniciar sesión", onPress: () => navigation.navigate("Login") }
      ])
    }
  };

  const share = () => {
    //llevar a compartir
  };

  const attachments = details.length && details[0].attachments.slice(1, details[0].attachments.length);
console.log(attachments)
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
                    <Text style={styles.location}>Acá iría la dirección</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center", borderRadius: 10, elevation: 10, backgroundColor: "white" }}>
                    <TouchableOpacity onPress={() => navigation.navigate("MapDetail", { id: id })}>
                      <Image style={styles.maps} source={require("../../assets/maps.jpg")} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.descContent}>
                  <Text style={styles.subTitle}>Descripción</Text>
                  <Text style={styles.textBody}>{details[0].description}</Text>
                  <Text style={styles.subTitle}>Categoría</Text>
                  <Text style={styles.textBody}>{details[0].category}</Text>
                  <Text style={styles.subTitle}>Galería del evento</Text>
                  {attachments.length ? (
                    
                     <ScrollView horizontal={true}> 
                     <View style={{flexDirection:'row'}}>
                     {
              attachments.length !== 0 && attachments.map((vid,i) => 
              <View key={i}>
              <View style={{flexDirection:'row'}}>
              <View style={{flexDirection:'row'}}>
                <Image style={{width: 200,height: 200,margin:5}} source={{uri: vid}}  resizeMode="contain" />
              </View>
              <View style={{flexDirection:'row'}}>
                <Video style={{width: 200,height: 200,margin:5}} source={{uri: vid}} useNativeControls resizeMode="contain" isLooping/>
              </View>
              </View>
              </View>
              )}
               </View>
               </ScrollView>
                    
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
