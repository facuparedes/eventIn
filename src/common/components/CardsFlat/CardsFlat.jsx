import React, { useEffect, useState } from "react";
import { View,FlatList } from "react-native";
import Card from "../Card/Card";
import { getEvents } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

  export default function CardsFlat() {
    
    const dispatch = useDispatch();
    const allEvents = useSelector((state) => state.events);
    const [data, setData] = useState(allEvents);
    
    useEffect(() => {
      dispatch(getEvents())  
    },[])
    console.log(allEvents)
  return (
    <View>
         <FlatList style={{width: 500,height: 700 }}
            data={data} 
            //horizontal
            renderItem={({ item }) => (
                <Card title={item.data().title} 
                    description={item.data().description} 
                    date={item.date} 
                    attachments={item.attachments} />)} 
        />
    </View>
  );
    }