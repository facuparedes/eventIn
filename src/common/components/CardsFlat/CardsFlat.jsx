import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import Card from "../Card/Card";
import { getEvents } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";

export default function CardsFlat() {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  useEffect(() => {
    dispatch(getEvents());
  }, []);
  const allEvents = useSelector((state) => state.events);

  return (
    <View>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={allEvents}
        //horizontal
        renderItem={({ item }) => (
          <Card
            id={item.id}
            navigation= {navigation}
            title={item.title}
            description={item.description}
            date={item.start}
            photo={item.photo}
          />
        )}
      />
    </View>
  );
}
