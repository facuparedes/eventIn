import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import { getLikedEvents } from "../../common/redux/actions";
import auth from "../../../api/firebase/services/AuthService";
import { useEffect } from "react";
import CardsFlatLikedEvents from "../../common/components/CardsFlatLikedEvents/CardsFlatLikedEvents";

export default function Profile() {
  const user = useSelector((state) => state.isLogged);
  const likedEvents = useSelector((state) => state.likedEvents);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (auth.currentUser) {
      dispatch(getLikedEvents(auth.currentUser.uid));
    }
  }, [dispatch, auth]);

  return (
    <SafeAreaView>
      <View style={styles.profileInfo}>
        <Image style={styles.image} source={{ uri: "https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" }} />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={{ color: "lightgrey" }}>{user.email}</Text>
      </View>
      {/* {likedEvents.length ? ( */}
      <View style={styles.favs}>
        <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 5 }}>
          <Text>Eventos favoritos:</Text>
        </View>
        <View style={styles.containerFlatList}>
          <CardsFlatLikedEvents />
          {/* <FlatList
            // style={{ width: "100%", height: "100%" }}
            showsHorizontalScrollIndicator={false}
            data={likedEvents}
            horizontal
            renderItem={(itemData) => (
              <View style={styles.borderF}>
                <View style={{ flex: 2, paddingHorizontal: 10, paddingTop: 7 }}>
                  <Text style={styles.title}>{itemData.item.title}</Text>
                  <Text style={styles.description}>{itemData.item.description}</Text>
                </View>
                <View style={{ flex: 6, paddingTop: 3 }}>
                  <Image source={{ uri: `${itemData.item.attachments[0]}` }} style={styles.imgFlat} />
                </View>
              </View>
            )}
          /> */}
        </View>
      </View>

      {/* ) : (
          <View>
            <Text>No existe ningun evento</Text>
          </View>
        )} */}
    </SafeAreaView>
  );
}
