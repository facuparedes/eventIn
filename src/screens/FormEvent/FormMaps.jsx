import React, { useState } from "react";
import { View } from "react-native";
import { Input, Text, LinearProgress } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./FormStyles";

const FormMaps = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearProgress color="lightgreen" variant="determinate" value={0.6} />

      <Text>FORM MAP</Text>
      <View style={styles.btnsContainer}>
        <TouchableOpacity title="Siguiente..." onPress={() => navigation.navigate("FormCardPreview")} style={styles.btn}>
          <Text style={styles.textBtn}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FormMaps;
