import React from 'react';
import { FlatList, View, Text } from 'react-native';

export default function App() {
  //ejemplo de flat list
  let a = [{name:'andy'},{name:'cris'},{name:'chris'}]
  
  return (
    <View>
      <Text>Goodbye World!</Text>
      <FlatList
        data={a}
        renderItem={({item}) => <Text style={{fontSize:200}}>Name: {item.name}</Text>}      
      />
    </View>
  );
}

