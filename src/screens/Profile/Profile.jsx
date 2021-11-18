import React, { useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import { getLikedEvents, getCreatedEvents } from "../../common/redux/actions";
import auth from "../../../api/firebase/services/AuthService";
import { useEffect } from "react";
import CardsFlatLikedEvents from "../../common/components/CardsFlatLikedEvents/CardsFlatLikedEvents";
import CardsFlatCreatedEvents from "../../common/components/CardsFlatCreatedEvents/CardsFlatCreatedEvents";
import { colorPallete } from "../Onboarding/styles";

export default function Profile() {
  const user = useSelector((state) => state.isLogged);
  const likedEvents = useSelector((state) => state.likedEvents);
  const createdEvents = useSelector((state) => state.createdEvents);
  const [eventsFlat, setEventsFlat] = useState("liked");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (auth.currentUser) {
      dispatch(getLikedEvents(auth.currentUser.uid));
    }
  }, [dispatch, auth]);

  function handleEventChange(mode) {
    if (mode === "liked") {
      setEventsFlat("liked");
    }
    if (mode === "created") {
      dispatch(getCreatedEvents(auth.currentUser.uid));
      setEventsFlat("created");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      <View style={styles.profileInfo}>
        <Image style={styles.image} source={{ uri: "https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" }} />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={{ fontFamily: "Gotham-LightItalic", color: "grey" }}>{user.email}</Text>
      </View>
      <View style={styles.favs}>
        <View style={styles.btnsCont}>
          <View style={[styles.eventBtn, eventsFlat === "liked" ? { backgroundColor: colorPallete.third } : { backgroundColor: colorPallete.fifth }]}>
            <TouchableOpacity onPress={() => handleEventChange("liked")}>
              <Text style={[styles.textBtn, eventsFlat === "liked" ? { color: "#F9F9F9" } : { color: colorPallete.second }]}>Eventos favoritos</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.eventBtn1, eventsFlat === "created" ? { backgroundColor: colorPallete.third } : { backgroundColor: colorPallete.fifth }]}>
            <TouchableOpacity onPress={() => handleEventChange("created")}>
              <Text style={[styles.textBtn, eventsFlat === "created" ? { color: "#F9F9F9" } : { color: colorPallete.second }]}>Eventos creados</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerFlatList}>
          {eventsFlat === "liked" && likedEvents && likedEvents.length ? <CardsFlatLikedEvents /> : null}
          {eventsFlat === "created" && createdEvents && createdEvents.length ? <CardsFlatCreatedEvents /> : null}
        </View>
      </View>
    </SafeAreaView>
  );
}
