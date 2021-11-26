import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { KEY_MAPS } from "@env";
import styles from './EventsMapsStyles';
import CustomPin from '../../assets/CurrentLocationIcon.png'
import { colorPallete } from '../Onboarding/styles';

export default function EventsMaps({navigation}) {
    const events = useSelector(state => state.events);

    const [pin, setPin] = useState({    
        latitude: -31.611983819172544, 
        longitude: -60.69801970282996
    });
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        getLocation();
    }, [getLocation])

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Los permisos fueron denegados");
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});

        setPin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
    }

    if (errorMsg) {
        Alert.alert(errorMsg);
    }

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                initialRegion={{
                    latitude: pin.latitude, 
                    longitude: pin.longitude,
                    latitudeDelta: 27,
                    longitudeDelta: 25.8,
                }}
                provider="google"
            >
                <Marker
                    title="Aca estás vos"
                    image={CustomPin}
                    coordinate={{
                        latitude: pin.latitude, 
                        longitude: pin.longitude
                    }}
                />

                {
                    events.map((e, i) => {
                        return (
                            <Marker
                                coordinate={{
                                    latitude: e.location.latitude, 
                                    longitude: e.location.longitude
                                }}
                            >
                                <Callout 
                                    onPress={() => navigation.navigate("CardDetail", { 
                                        id: e.id,
                                        latlng: e.location,
                                        likedAct: e.liked
                                        })}>
                                    <Text style={{fontWeight: 'bold'}}>{e.title}</Text>
                                    <Text style={{color: 'blue'}}>Categoría: {e.category}</Text>
                                    <Text>Precio: ${e.fee}</Text>
                                </Callout>
                            </Marker>
                        )
                    })
                }
                <Circle 
                    center={{
                        latitude: pin.latitude, 
                        longitude: pin.longitude
                    }}
                    radius={1500} 
                    fillColor={'rgba(100, 100, 200, 0.2)'}
                    strokeWidth={2}
                    strokeColor={colorPallete.second}
                ></Circle>
            </MapView>
        </View>
    );
}