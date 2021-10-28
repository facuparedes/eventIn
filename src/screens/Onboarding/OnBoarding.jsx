import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default function OnBoarding({ navigation }) {
  return (
    <Onboarding
      nextLabel="Siguiente"
      skipLabel="Omitir"
      onSkip={() => navigation.navigate("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "#F7F7F7",
          image: <Image style={styles.logo} source={require("../../assets/Logo.png")} />,
          title: <Text style={styles.title1}>Logo</Text>,
          subtitle: <Text style={styles.subTitle1}>¡Les presentamos nuestro logo oficial!</Text>,
        },
        {
          backgroundColor: "#F7F7F7",
          image: <Image style={styles.image} source={require("../../assets/Calendario.png")} />,
          title: <Text style={styles.title2}>Calendario</Text>,
          subtitle: <Text style={styles.subTitle2}>¡Agendá tus eventos favoritos!</Text>,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  title1: {
    fontSize: 36,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 50,
  },
  subTitle1: {
    fontSize: 20,
  },
  subTitle2: {
    fontSize: 20,
    marginBottom: 100,
  },
  logo: {
    marginBottom: 120,
    width: 320,
    height: 142,
  },
  image: {
    marginBottom: 10,
    width: 300,
    height: 300,
  },
});
