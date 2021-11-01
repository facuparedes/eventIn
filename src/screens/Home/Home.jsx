import React from "react";
import { View, Text } from "react-native";
import CardsFlat from "../../common/components/CardsFlat/CardsFlat";

export default function Home() {
  return (
    <View>
      <Text>HOME - EVENTOS</Text>
      <CardsFlat style={{flex: 1}}/>
      <Text>otro componente</Text>
    </View>
  );
}
