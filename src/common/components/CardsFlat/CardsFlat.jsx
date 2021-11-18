import React from "react";
import { View, FlatList } from "react-native";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";


export default function CardsFlat() {
  const navigation = useNavigation();

  const allEvents = useSelector((state) => state.events);

  return (
    <View>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={allEvents}
        renderItem={({ item }) => 
          <Card 
            id={item.id} 
            navigation={navigation} 
            title={item.title} 
            description={item.description} 
            dateStart={item.start} 
            attachments={item.attachments[0]} 
            likedActive={item.likedActive && item.likedActive}
            latlng={item.location}
        />}
      />
    </View>
  );
}
