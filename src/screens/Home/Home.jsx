import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { changeIsLogged, getEvents, getEventsByCategory } from '../../common/redux/actions';
import { onAuthStateChanged } from 'firebase/auth';
import { View, Button, Alert, Text } from "react-native";
import { styles } from "./styles.js";
import { Picker } from "@react-native-picker/picker";
import auth from "../../../api/firebase/services/AuthService";
import CardsFlat from "../../common/components/CardsFlat/CardsFlat";
import { signOut } from "@firebase/auth";

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.isLogged)

  const [categ, setCateg] = useState("Categoría");
  const category = ["Categoría", "Bar", "Deportes", "Fiesta", "Musica", "Teatro"];

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          dispatch(changeIsLogged(uid));
        }
    });
    return subscribe;
  })

  function handleFilterCategory(value) {
    setCateg(value);
    if (value === "Categoría") {
      dispatch(getEvents());
    } else {
      dispatch(getEventsByCategory(value));
    }
  }

  function logOut () {
      signOut(auth);
      dispatch(changeIsLogged(''));
      Alert.alert('Sesión cerrada.');
      navigation.replace('Onboarding'); // Acá vamos a tener que navegar desde el Stack y no desde el Tab, porque sino va a mostrar el TabBar
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }} >
      {
        logged ?
          <Button title="Logout" onPress={logOut}/>  
          : null
      }
      
      <View>
        <Picker
          selectedValue={categ}
          onValueChange={(value, index) => handleFilterCategory(value)}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          {category.map((item, i) => {
            return <Picker.Item key={i} value={item} label={item} />;
          })}
        </Picker>
        {/* <Text>Seleccionada: {categ}</Text> */}
      </View>

      <CardsFlat />

    </View>
  );
}
