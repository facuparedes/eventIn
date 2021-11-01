import React from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../../../api/firebase/config";
import { Text, View, Image } from "react-native";

export default function CardDetail() {
  //   const { eventId } = route.params;
  //   const infoDb = doc(db, "Event", eventId);
  //   const allInfo = await getDoc(infoDb);
  //   const { title, description, fee, isPublic, photo, category, start, end, location, createdAt } = allInfo;
  return (
    <View>
      <Text>Holaa</Text>
    </View>
  );
}
