import React, { useEffect } from "react";
import { ActivityIndicator, View, Image, Text } from "react-native";
import { styles } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../common/redux/actions";

export default function Loading({ navigation }) {
  const allEvents = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {allEvents.length === 0 ? null : navigation.replace("TabBar")}
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}
