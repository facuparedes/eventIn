import React from "react";
import { View, Text } from "react-native";
import CardsFlat from "../../common/components/CardsFlat/CardsFlat";
import Loading from "../Loading/Loading";

export default function Home() {
  return (
    //<Loading loading={allEvent.length > 0 ? false : true} >
      <View>
        <Text>HOME - EVENTOS</Text>
        <CardsFlat />
        <Text>otro componente</Text>
      </View>
    //</Loading>
  );
}
