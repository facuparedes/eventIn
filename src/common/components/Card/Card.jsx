import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

// const eventPrueba= {
//     title: "7 Mujeres",
//     description: "Siete mujeres contemporáneas, cada una en un monólogo interior perfectamente exteriorizado, sin inhibiciones ni tapujos, hablándose frente a sí mismas. Diciéndose cosas que han estado guardadas mucho tiempo, contando su historia: sus sueños, sus miedos, sus obsesiones, sus objetivos, desnudándose desde sus miserias humanas hasta su costado más pleno y puro.", 
//     date:new Date('Noviembre 10, 18:00') ,
//     attachments:[{uri: "https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/1j8jh28yV5uGYykpw6j7orY4q1M=/300x300/arc-anglerfish-arc2-prod-lanacionar.s3.amazonaws.com/public/MFKW7SQYY5BJ7EPIWVIH7XKLVU.jpg"}] 
//   }


export default function Card({title, description, date, attachments}) {
    

    return (
        <View style={styles.card}>
            <Text> {title} </Text>
            <Text>{date}</Text>
            <Image source={attachments[0]} style={{ width: 200, height: 200 }}/>
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
