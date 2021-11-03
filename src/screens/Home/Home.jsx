import React from "react";
import { useDispatch } from 'react-redux';
import { isLogged } from '../../common/redux/actions';
import { View, Text, Button, Alert } from "react-native";
import auth from "../../../api/firebase/services/AuthService";
import CardsFlat from "../../common/components/CardsFlat/CardsFlat";
import { signOut } from "@firebase/auth";

export default function Home({navigation}) {
  const dispatch = useDispatch();

  function logOut () {
    signOut(auth);
    dispatch(isLogged(''));
    Alert.alert('Sesión cerrada.');
    navigation.navigate('Login'); // Acá vamos a tener que navegar desde el Stack y no desde el Tab, porque sino va a mostrar el TabBar
  }

  return (
    <View>
      <Button title="Logout" onPress={logOut}/>
      {/* <Text>ACA IRIAN LOS FILTROS??</Text> */}
      <CardsFlat />
    </View>
  );
}
