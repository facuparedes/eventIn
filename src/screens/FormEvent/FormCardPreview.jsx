import React, {useState, useEffect} from "react";
import { View, Image } from "react-native";
import { Input, Text, LinearProgress } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./FormStyles";

const FormCardPreview = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearProgress color="lightgreen" variant="determinate" value={0.9} />
      <View style={(styles.textAndImg), {marginRight: 10}}>
        <Text h4 style={styles.titleText}>
          Preview del Evento
        </Text>
        <Image source={require("../../assets/Logo.png")} style={styles.logoImage} />
      </View>
      <View style={styles.btnsContainer}>
        <TouchableOpacity title="Pago" onPress={() => navigation.navigate("Pago")} style={styles.btn}>
          <Text style={styles.textBtn}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FormCardPreview;
