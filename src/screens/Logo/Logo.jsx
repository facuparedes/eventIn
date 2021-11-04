import React from "react";
import { Image, View } from "react-native";
import { styles } from "./styles";
import { useDispatch } from 'react-redux';
import { isLogged } from "../../common/redux/actions";
import { onAuthStateChanged } from "@firebase/auth";
import auth from "../../../api/firebase/services/AuthService";

export default function Logo({ navigation }) {
  const dispatch = useDispatch();

  const timer = function () {
    setTimeout(() => {
      const subscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('USER UID', user.uid);
          const uid = user.uid;
          dispatch(isLogged(uid))
          navigation.replace('TabBar');
        } else {
          navigation.replace("Onboarding");
        }
    });
    return subscribe;
    }, 1500);
  };

  return (
    <View style={styles.view}>
      {timer()}
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />
    </View>
  );
}
