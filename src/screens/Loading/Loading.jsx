import React from "react";
import { ActivityIndicator, StyleSheet, View, Image, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: 100,
    width: 320,
    height: 142,
  },
  text: {
    fontSize: 20,
    marginTop: 10,
  },
});

function Loading() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

export default Loading;
