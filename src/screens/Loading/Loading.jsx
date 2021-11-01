import React from "react";
import { ActivityIndicator, View, Image, Text } from "react-native";
import { styles } from "./styles";



export default function Loading({ navigation }) {
  const timer = function () {
    setTimeout(() => {
      navigation.replace("TabBar");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {timer()}
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}





