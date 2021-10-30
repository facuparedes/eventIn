import React from "react";
import { Image, View } from "react-native";
import { styles } from "./styles";

export default function Logo({ navigation }) {
  const timer = function () {
    setTimeout(() => {
      navigation.replace("Onboarding");
    }, 1500);
  };

  return (
    <View style={styles.view}>
      {timer()}
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />
    </View>
  );
}
