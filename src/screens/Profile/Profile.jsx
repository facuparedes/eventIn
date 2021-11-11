import React, { createRef } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import ActionSheet from "react-native-actions-sheet";

export default function Profile() {
  const user = useSelector((state) => state.isLogged);
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.profileInfo}>
        <Image style={styles.image} source={{ uri: "https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" }} />
        <View style={styles.info}>
          <Text>{user.username}</Text>
          <Text style={{ color: "lightgrey" }}>{user.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
