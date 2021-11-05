import React, { useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { getDetails } from "../../common/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardDetailStyles";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import moment from "moment";

export default function CardDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const { id } = route.params;
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

  const details = useSelector((state) => state.detail);

  return (
    <View style={styles.view}>
      {details.length ? (
        <View style={styles.viewCont}>
          <View style={styles.header}>
            <Image style={styles.img} source={{ uri: `${details[0].photo}` }} />
            <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate("TabBar")}>
              <AntDesign name="leftcircle" size={30} color="rgba(255, 255, 255, 0.6)" />
            </TouchableOpacity>
            <View style={styles.btnLikeBackground}>
              <FontAwesome name="circle" size={45} color="rgba(255, 255, 255, 0.6)" style={{ marginRight: 15 }} />
              <FontAwesome name="circle" size={45} color="rgba(255, 255, 255, 0.6)" />
            </View>
            <TouchableOpacity style={styles.btnLike}>
              <AntDesign name="heart" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{details[0].title.toUpperCase()}</Text>
          <View style={styles.textConts}>
            <Text style={styles.bold}>Sobre este evento </Text>
            <Text>{details[0].description}</Text>

            <Text style={styles.bold}>Valor </Text>
            <Text>${details[0].fee}</Text>

            <Text style={styles.bold}>Categoría </Text>
            <Text>{details[0].category}</Text>

            <Text style={[styles.bold, { paddingBottom: 12 }]}>Fecha </Text>
            <Text>
              {details[0].start.toString().slice(4, 15)} {details[0].start.toString().slice(16, 24)}
            </Text>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
