import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { changeIsLogged } from '../../common/redux/actions';
import { onAuthStateChanged } from 'firebase/auth';
import { View, Button, Alert } from "react-native";
import auth from "../../../api/firebase/services/AuthService";
import CardsFlat from "../../common/components/CardsFlat/CardsFlat";
import { signOut } from "@firebase/auth";

export default function Home({navigation, isLogged}) {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.isLogged)

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          dispatch(changeIsLogged(uid));
        }
    });
    return subscribe;
  })

  function logOut () {
      signOut(auth);
      dispatch(changeIsLogged(''));
      Alert.alert('Sesión cerrada.');
      navigation.replace('Login'); // Acá vamos a tener que navegar desde el Stack y no desde el Tab, porque sino va a mostrar el TabBar
  }

  return (
    <View>
      {
        logged ?
          <Button title="Logout" onPress={logOut}/>  
          : null
      }
      {/* <Text>ACA IRIAN LOS FILTROS??</Text> */}
      <CardsFlat />
    </View>
  );
}
