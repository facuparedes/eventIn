import React from 'react';
import { Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { KEY_MAPS } from "@env";
import styles from './EventsMapsStyles';
import CustomPin from '../../assets/CurrentLocationIcon.png'
import { colorPallete } from '../Onboarding/styles';
import { NavigationContainer } from '@react-navigation/native';

export default function EventsMaps({navigation}) {
    const events = useSelector(state => state.events);
    console.log(events[0].attachments)
    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                initialRegion={{
                    latitude: -32.8743912574068, 
                    longitude: -68.84203730663921,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0321,
                }}
                provider="google"
            >
                <Marker
                    title="Aca estás vos"
                    image={CustomPin}
                    coordinate={{
                        latitude: -32.8743912574068, 
                        longitude: -68.84203730663921
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
                                    <Text>{e.title}</Text>
                                    <Text>Categoría: {e.category}</Text>
                                    <Text>Precio: ${e.fee}</Text>
                                </Callout>
                            </Marker>
                        )
                    })
                }
                <Circle 
                    center={{
                        latitude: -32.8743912574068, 
                        longitude: -68.84203730663921
                    }}
                    radius={1500} 
                    strokeWidth={2}
                    strokeColor={colorPallete.second}
                ></Circle>
            </MapView>
        </View>
    );
}