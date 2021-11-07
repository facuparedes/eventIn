import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { changeIsLogged, getEvents, getEventsByCategory } from '../../common/redux/actions';
import { onAuthStateChanged } from 'firebase/auth';
import { View } from "react-native";
import { styles } from "./styles.js";
import { Picker } from "@react-native-picker/picker";
import auth from "../../../api/firebase/services/AuthService";
import CardsFlat from "../../common/components/CardsFlat/CardsFlat";
import DatePicker from "../../common/components/DatePicker/DatePicker";


export default function Home({ navigation }) {
  const dispatch = useDispatch();
  
  const [categ, setCateg] = useState("Categoría");
  const category = ["Categoría", "Todas",  "Bar", "Deportes", "Fiesta", "Musica", "Teatro"];

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Espera!", "Estás seguro de que quieres salir?", [
  //       {
  //         text: "Cancelar",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "SI!", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const presentUser = {
          uid: user.uid,
          email: user.email,
          username: user.displayName
        }
        dispatch(changeIsLogged(presentUser));
      }
    });
    return subscribe;
  });

  function handleFilterCategory(value) {
    setCateg(value);
    if (value === "Categoría" || value === "Todas") {
      dispatch(getEvents());
    } else {
      dispatch(getEventsByCategory(value));
    }  
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <View style={styles.viewPicker}>
          <Picker
            selectedValue={categ}
            onValueChange={(value, index) => handleFilterCategory(value)}
            mode="dropdown" // Android only
            style={styles.picker}
          >
            {category.map((item, i) => {
              return <Picker.Item  key={i} value={item} label={item} />;
            })}
          </Picker>
        </View>
        <View style={styles.datePicker}>
          <DatePicker />
        </View>
        </View>

      <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
        <CardsFlat />
      </View>
    </View>
  );
}
