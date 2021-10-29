import React from "react";
import { Image, View, StyleSheet } from "react-native";

export default function Logo({ navigation }) {
  const timer = function () {
    setTimeout(() => {
      navigation.navigate("Onboarding");
    }, 3000);
  };

  return (
    <View style={styles.view}>
      {timer()}
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 325,
    height: 145,
  },
  view: {
    backgroundColor: "#d7eae9",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
