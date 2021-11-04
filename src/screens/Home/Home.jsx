import React, { useState } from "react";
import { View, Text } from "react-native";
import CardsFlat from "../../common/components/CardsFlat/CardsFlat";
import { styles } from "./styles.js";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { getEvents, getEventsByCategory } from "../../common/redux/actions";

export default function Home() {
  const [categ, setCateg] = useState("Categoría");
  const category = ["Categoría", "Bar", "Deportes", "Fiesta", "Musica", "Teatro"];
  const dispatch = useDispatch();

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
      <View>
        <Picker
          selectedValue={categ}
          onValueChange={(value, index) => handleFilterCategory(value)}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          {category.map((item) => {
            return <Picker.Item value={item} label={item} />;
          })}
        </Picker>
        {/* <Text>Seleccionada: {categ}</Text> */}
      </View>

      <CardsFlat category={categ} />
    </View>
  );
}
