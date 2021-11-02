import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import { getDetails } from "../../common/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardDetailStyles";

export default function CardDetail({ route }) {
  const dispatch = useDispatch();
  const { id } = route.params;
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

  const details = useSelector((state) => state.detail);

  return (
      <View style={styles.view}>
      {
        details.length ? (
          <View>
            <View style={styles.viewLine}></View>
            <Text style={styles.title}>{details[0].title.toUpperCase()}</Text>
            <Image style={styles.img} source={{ uri: `${details[0].photo}` }} />

            <View style={styles.textConts}>
              <View style={styles.viewCont}>
                <Text style={styles.bold}>Sobre este evento </Text><Text>{details[0].description}</Text>
              </View>

              <View style={styles.viewCont}>
                <Text style={styles.bold}>Valor </Text><Text>${details[0].fee}</Text>
              </View>
              
              <View style={styles.viewCont}>
                <Text style={styles.bold}>Categoría </Text><Text>{details[0].category}</Text>
              </View>

              <View style={styles.viewCont}>
                <Text style={[styles.bold, {paddingBottom: 12}]}>Fecha </Text><Text>{details[0].start.toString().slice(4, 15)} {details[0].start.toString().slice(16, 24)}</Text>
              </View>
              <View style={styles.viewContLine}></View> 
              <View style={styles.viewLine}></View>
            </View>

          </View>
        ) : (
          <Text>Loading...</Text>
      )}
      </View>
  );
}