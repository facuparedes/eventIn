import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import user from '../../../../api/firebase/models/user.js';
import auth from '../../../../api/firebase/services/AuthService';

export default function CardsFlat() {
  const navigation = useNavigation();

  const allEvents = useSelector((state) => state.events);
  console.log('ALL EVENTS CARDS FLAT', allEvents)

  // let likedEventsUUIDs= [];

  // useEffect(() => {
  //   user.include('events', 'liked', auth.currentUser.uid).find()
  //     .then(data => {
  //       likedEventsUUIDs = data["events-liked"].map(e => e.eventUUID);
  //     })
  //     .then(() => {
  //       allEvents.map(e => {
  //         let likedEvent = likedEventsUUIDs.find(id => id === e.id);
  //         if (likedEvent) {
  //           e.liked = 'true';
  //         }
  //       })
  //     })
  //     .catch(e=>console.log('ESTE ERROR ES DE LIKED X EVENTO', e));
  // }, [user, likedEventsUUIDs, allEvents]);

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
            likedEvent={item.liked && item.liked}
            // likedEvent={likedEventsUUIDs && 
            //   console.log(likedEventsUUIDs),
            //   likedEventsUUIDs
              // likedEventsUUIDs.find(e => e === item.id)
            // }
        />}
      />
    </View>
  );
}
