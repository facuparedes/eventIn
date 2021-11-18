import React from "react";
import { Image, View } from "react-native";
import { styles } from "./styles";
import { useDispatch } from 'react-redux';
import { changeIsLogged } from "../../common/redux/actions";
import { onAuthStateChanged } from "@firebase/auth";
import auth from "../../../api/firebase/services/AuthService";

export default function Logo({ navigation }) {
  const dispatch = useDispatch();

  const timer = function () {
    setTimeout(() => {
      const subscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const presentUser = {
            uid: user.uid,
            email: user.email,
            username: user.displayName,
          };
          dispatch(changeIsLogged(presentUser));
          navigation.replace('Loading');
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
