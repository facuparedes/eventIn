import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeIsLogged, getEvents, getEventsByCategory } from "../../common/redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { View, Alert, Text } from "react-native";
import { styles } from "./styles.js";
import { Picker } from "@react-native-picker/picker";
import auth from "../../../api/firebase/services/AuthService";
import CardsFlat from "../../common/components/CardsFlat/CardsFlat";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.isLogged);

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
  });

  function handleFilterCategory(value) {
    setCateg(value);
    if (value === "Categoría") {
      dispatch(getEvents());
    } else {
      dispatch(getEventsByCategory(value));
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.filterLogout}>
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
      </View>
      <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
        <CardsFlat />
      </View>
    </View>
  );
}
