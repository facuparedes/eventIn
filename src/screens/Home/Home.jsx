import React, { useState } from "react";
import { View, Text } from "react-native";
import Card from "../../common/components/Card/Card";

const eventsProve = [
  {
    title: "7 Mujeres",
    description:
      "Siete mujeres contemporáneas, cada una en un monólogo interior perfectamente exteriorizado, sin inhibiciones ni tapujos, hablándose frente a sí mismas. Diciéndose cosas que han estado guardadas mucho tiempo, contando su historia: sus sueños, sus miedos, sus obsesiones, sus objetivos, desnudándose desde sus miserias humanas hasta su costado más pleno y puro.",
    date: new Date("Noviembre 10, 18:00"),
    attachments: [
      {
        uri: "https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/1j8jh28yV5uGYykpw6j7orY4q1M=/300x300/arc-anglerfish-arc2-prod-lanacionar.s3.amazonaws.com/public/MFKW7SQYY5BJ7EPIWVIH7XKLVU.jpg",
      },
    ],
  },
  {
    title: "Divididos",
    description: "La vuelta de Divididos a los escenarios, sumando los estrenos de las canciones “Insomnio” y “Cabalgata Deportiva”",
    date: new Date("Noviembre 15, 21:00"),
    attachments: [
      {
        uri: "https://www.telam.com.ar/advf/imagenes/2021/02/60317215594b3_1004x565.jpg",
      },
    ],
  },
];

export default function Home() {
  const [data, setData] = useState(eventsProve);

  return (
    <View>
        <Text>Hola soy el home</Text>
        <FlatList data={data} 
            renderItem={({ item }) => 
                <Card title={item.title} 
                    description={item.description} 
                    date={item.date} 
                    attachments={item.attachments[0]} />} 
        />
    </View>
  );
}
