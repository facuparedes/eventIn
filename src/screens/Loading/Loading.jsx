import React from "react";
import { ActivityIndicator, View, Image, Text } from "react-native";
import { styles } from "./styles";
import {useSelector} from "react-redux";


export default function Loading({ navigation }) {
  const allEvents = useSelector((state) => state.events)

  const timer = function () {
    setTimeout(() => {
      navigation.replace("TabBar");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {allEvents.length > 0 ? timer() : null}
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}





