import React from "react";
import { View, FlatList } from "react-native";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";


export default function CardsFlatCreatedEvents() {
  const navigation = useNavigation();

  const createdEvents = useSelector((state) => state.createdEvents);

  return (
    <View>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={createdEvents}
        renderItem={({ item }) => 
          <Card 
            id={item.id} 
            navigation={navigation} 
            title={item.title} 
            description={item.description} 
            dateStart={item.start} 
            attachments={item.attachments[0]} 
            likedActive={item.likedActive && item.likedActive}
        />}
      />
    </View>
  );
}
