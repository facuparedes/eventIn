import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import Card from "../Card/Card";
import { getEvents } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function CardsFlat() {
  const dispatch = useDispatch();

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
        renderItem={({ item }) => <Card id={item.id} title={item.title} description={item.description} date={item.start} photo={item.photo} />}
      />
    </View>
  );
}
