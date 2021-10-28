import React, { useState } from "react";
import { View,FlatList } from "react-native";
import Card from "../Card/Card";
import {eventsProve} from './eventsData.js'


  export default function CardsFlat() {
    const [data, setData] = useState(eventsProve);
  
  return (
    <View>
         <FlatList style={{width: 500,height: 700 }}
            data={data} 
            //horizontal
            renderItem={({ item }) => (
                <Card title={item.title} 
                    description={item.description} 
                    date={item.date} 
                    attachments={item.attachments} />)} 
        />
    </View>
  );
    }