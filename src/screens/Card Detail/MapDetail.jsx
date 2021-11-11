import React, { useEffect, useState }  from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { View, StyleSheet, Alert,TouchableOpacity ,Text} from "react-native";
import { getDetails } from "../../common/redux/actions";

import { useDispatch, useSelector } from "react-redux";
import {Entypo} from "@expo/vector-icons";

export default function MapDetail({ route, navigation }) {
    const dispatch = useDispatch();
    const { id } = route.params;
    // console.log('el ID',id)
    useEffect(() => {
      dispatch(getDetails(id));
    }, [dispatch]);
  
    const details = useSelector((state) => state.detail);
    // console.log('LATITUD',details[0].location.latitude)
    // console.log('LONGITUD',details[0].location.longitude)
    const [pin, setPin] = useState({
        latitude: details[0].location.latitude,
        longitude: details[0].location.longitude,
      });
   
return(
            <View>
                
                <View style={estilos.btnBack}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Entypo name="chevron-left" size={30} color="rgba(0, 0, 0, 0.6)" />
                    </TouchableOpacity>
                </View>
                <MapView
                        style={estilos.map}
                        initialRegion={{
                        latitude: details[0].location.latitude,
                        longitude: details[0].location.longitude,
                        latitudeDelta: 0.0000000000000004,
                        longitudeDelta: 0.003421,
            }}
            provider="google"
          >

            <Marker
                coordinate={pin}
            >
              <Callout>
                <Text>{ details[0].title}</Text>
              </Callout>
            </Marker>
          </MapView>
            </View>
            
)

}

const estilos = StyleSheet.create({
    mapContainer: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    map: {
      width: "100%",
      height: '100%',
    },
    btnBack:{marginTop:'10%'}
  });