import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';


export default function Card({title, description, date, attachments}) {
    

    return (
        <View style={styles.card}>
            <Text> {title} </Text>
            <Text>{date}</Text>
            <Image source={attachments} style={{ width: 200, height: 200 }}/>
            <Text>{description}</Text>
            
        </View>
    )
}



const styles = StyleSheet.create({
    card: {
      //marginTop: 50,
      borderRadius: 6,
      elevation: 3,
      backgroundColor: '#1dc0c2',
      shadowOffset: {width: 1, height: 1},
      shadowColor: '#1d94bf',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 4,
      marginVertical: 6,
    },
    cardContent: {
    //   color: 'blue',
    //   fontWeight: 'bold',
    //   fontSize: 30,
      marginHorizontal:18,
      marginVertical: 10,
    },
    
  });


/* .color1 {color: #1a6fb7;}  PALETA PARA PROBAR
.color2 {color: #1d94bf;}
.color3 {color: #1dc0c2;}
.color4 {color: #bcefe2;}
.color5 {color: #f8efeb;}
 */
