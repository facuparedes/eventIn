import React from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../../../api/firebase/config";
import { Text, View, Image } from "react-native";
import { getDetails } from "../../common/redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function CardDetail({route}) {
     const dispatch = useDispatch()   
     const { id } = route.params;
     useEffect(() => {
      dispatch(getDetails(id));
    }, []);
    const details = useSelector((state) => state.detail);
    console.log(details)
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent:"center"}}>
      <Text>{details.title}</Text>
      <Text>{details.description}</Text>
      <Text>{details.fee}</Text>
      <Text>{details.category}</Text>
      <Text>{details.title}</Text>

    </View>
  );
}
