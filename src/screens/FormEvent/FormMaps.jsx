import React, { useState } from "react";
import { View ,StyleSheet,Button} from "react-native";
import { Input, Text, LinearProgress } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./FormStyles";
import MapView, { Callout, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// IMPORTANTE-- TODAVIA NO ANDA LA BARRA DE BUSQUEDA,SOLO ANDA NAVEGANDO EN EL MAPA Y PONIENDO EL PIN
//              EN EL LUGAR DESEADO
const FormMaps = ({ navigation }) => {
const [showMap, setShowMap] = useState(false);
const [pin, setPin] = useState({
      latitude: -34.667270557115565,
      longitude: -58.368570803061345});
      const [region, setRegion] = useState({
        latitude: -34.667270557115565,
        longitude: -58.368570803061345,
        latitudeDelta: 0.0000000000000004,
        longitudeDelta: 0.003421,});

const handleShowMap = () => {
        setShowMap(true)
      }

const handleHideMap = () => {
        setShowMap(false)
      }
  return (
    <SafeAreaView style={styles.container}>
      <LinearProgress color="lightgreen" variant="determinate" value={0.6} />

      <Text>FORM MAP</Text>
      {/* <ScrollView> */}
      <View style={{marginTop:50}}>
      <TouchableOpacity title="elegir ubicacion" onPress={handleShowMap} style={styles.btn2}>
      <Text>elegir ubicacion en el mapa</Text>
      </TouchableOpacity>
      <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.0000000000000004,
          longitudeDelta: 0.003421

        })
      }}
      fetchDetails={true}
      GooglePlacesSearchQuery={{rankby:'distance'}}
      query={{
        key: 'AIzaSyDHw9p6ttvBYzEy148PIWBnhdNd59jqxjo',
        language: 'en',
        components:'country:argentina',
        types:'establishment',
        radius:30000,
        location:`${region.latitude},${region.longitude}`
      }}
      styles={{
        container : {flex:0,width:'100%',zIndex:1},
        listView:{backgroundColor:'white'}}}
        />
    {showMap &&  <MapView style={estilos.map}
         initialRegion={{
           
           latitude: -34.667270557115565,
           longitude: -58.368570803061345,
           latitudeDelta: 0.0000000000000004,
           longitudeDelta: 0.003421,
          }} 
          provider='google'
          >
          <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}}> 
          <Callout>
                <Text> estadio </Text>
              </Callout>
              </Marker>

          <Marker 
          coordinate={pin}
          draggable={true}
          onDragStart={(e) => {
              console.log("Drag start", e.nativeEvent.coordinate);
            }}
            onDragEnd={(e) => {
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              })
            }}
            
            >
              <Callout>
                <Text>el mejor estadio del mundo</Text>
              </Callout>
            </Marker>
        </MapView>
          
        }
    
    <TouchableOpacity title="sacar mapa" onPress={handleHideMap} style={styles.btn2}>
      <Text>sacar mapa</Text>
      </TouchableOpacity>
    
    </View>
      <View style={styles.btnsContainer}>
        <TouchableOpacity title="Siguiente..." onPress={() => navigation.navigate("FormCardPreview")} style={styles.btn}>
          <Text style={styles.textBtn}>Siguiente</Text>
        </TouchableOpacity>
      </View>
{/* </ScrollView> */}
    </SafeAreaView>
  );
};
const estilos = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height:400,
  },
});
export default FormMaps;
