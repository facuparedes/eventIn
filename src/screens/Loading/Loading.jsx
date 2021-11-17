import React, { useEffect } from "react";
import { ActivityIndicator, View, Image, Text } from "react-native";
import { styles } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, changeIsLogged } from "../../common/redux/actions";
import auth from "../../../api/firebase/services/AuthService";
import { onAuthStateChanged } from "firebase/auth";

export default function Loading({ navigation }) {
  const allEvents = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const presentUser = {
          uid: user.uid,
          email: user.email,
          username: user.displayName,
        };
        dispatch(changeIsLogged(presentUser));
      }
    });
    dispatch(getEvents());
    return subscribe;
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
