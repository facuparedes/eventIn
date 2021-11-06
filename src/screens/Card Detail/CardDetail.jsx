import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { getDetails } from "../../common/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardDetailStyles";
import { AntDesign, FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";
import moment from "moment";

export default function CardDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const { id } = route.params;
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

  const details = useSelector((state) => state.detail);

  const [liked, setLiked] = useState(false);

  const addFavourite = () => {
    setLiked(!liked);
  };

  const share = () => {
    //llevar a compartir
  };

  return (
    <View style={styles.view}>
      {details.length ? (
        <View style={styles.viewCont}>
          <View style={styles.header}>
            <Image style={styles.img} source={{ uri: `${details[0].photo}` }} />
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
              <FontAwesome name="circle" size={45} color="rgba(255, 255, 255, 0.8)" />
            </View>
            <View style={styles.btnLike}>
              <TouchableOpacity onPress={addFavourite}>
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
                <Text style={styles.title}>{details[0].title}</Text>
                <View>
                  <Text style={styles.fee}>${details[0].fee}</Text>
                </View>
              </View>
              <View style={styles.dataContain}>
                <View>
                  <Text style={styles.textBody}>
                    {details[0].start.toString().slice(4, 15)} {details[0].start.toString().slice(16, 24)}
                  </Text>
                  <Text style={styles.location}>Acá iría la dirección</Text>
                </View>
                <View style={{ borderRadius: 10, elevation: 10, marginHorizontal: 10 }}>
                  <Image style={styles.maps} source={require("../../assets/maps.jpg")} />
                </View>
              </View>
              <View style={styles.descContent}>
                <Text style={styles.subTitle}>Descripción</Text>
                <Text style={styles.textBody}>{details[0].description}</Text>
                <Text style={styles.subTitle}>Categoría</Text>
                <Text style={styles.textBody}>{details[0].category}</Text>
                <Text style={styles.subTitle}>Galería del evento</Text>
              </View>
              <View style={styles.gallery}>
                <View style={styles.imgContent}>
                  <Image style={styles.imgIzq} source={require("../../assets/jardin.png")} />
                  <Image style={styles.imgIzq} source={require("../../assets/club.jpg")} />
                </View>
                <View style={styles.imgContent}>
                  <Image style={styles.imgDer} source={require("../../assets/playa.png")} />
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
