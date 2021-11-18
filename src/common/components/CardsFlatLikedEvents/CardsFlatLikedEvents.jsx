import React from "react";
import { View, FlatList } from "react-native";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";


export default function CardsFlatLikedEvents() {
  const navigation = useNavigation();

  const likedEvents = useSelector((state) => state.likedEvents);

  return (
    <View>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={likedEvents}
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
            likedBefore={true}
        />}
      />
    </View>
  );
}
