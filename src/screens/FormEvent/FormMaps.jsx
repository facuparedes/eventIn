import React, { useState, useEffect } from "react";
import { addEventInfo } from "../../common/redux/actions";
import { View, StyleSheet, Alert, ScrollView, Image } from "react-native";
import { Input, Text, LinearProgress } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./FormStyles";
import MapView, { Callout, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { KEY_MAPS } from "@env";
import { colorPallete } from "../Onboarding/styles";

// IMPORTANTE-- TODAVIA NO ANDA LA BARRA DE BUSQUEDA,SOLO ANDA NAVEGANDO EN EL MAPA Y PONIENDO EL PIN
//              EN EL LUGAR DESEADO
const FormMaps = ({ navigation }) => {
  const dispatch = useDispatch();
  //Location states
  const [showMap, setShowMap] = useState(false);
  const [pin, setPin] = useState({
    latitude: -34.667270557115565,
    longitude: -58.368570803061345,
  });
  // console.log("esta es la ubicacion actual", pin);
  const [region, setRegion] = useState({
    latitude: -34.667270557115565,
    longitude: -58.368570803061345,
    latitudeDelta: 0.300000000004,
    longitudeDelta: 0.302421,
  });

  const [errorMsg, setErrorMsg] = useState(null);

  // En este useEffect pedimos acceso a la ubicación actual del usuario.
  useEffect(() => {
    (async () => {
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
    })();
  }, []);
  if (errorMsg) {
    Alert.alert(errorMsg);
  }

  const handleShowMap = () => {
    setShowMap(true);
    Alert.alert("Importante!", "Para mover el pin debes mantenerlo presionado.");
  };

  const handleHideMap = () => {
    setShowMap(false);
  };

  const handleNext = () => {
    const partialEvent = {
      location: {
        lat: pin.latitude,
        long: pin.longitude,
      },
    };
    dispatch(addEventInfo(partialEvent));
    navigation.navigate("FormCardPreview");
  };

  function handleBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearProgress color={colorPallete.third} variant="determinate" value={0.6} style={{ height: 10 }} />
      <View style={styles.headerMap}>
        <Text style={styles.textHeader}>Paso 3 de 5</Text>
      </View>

      <View style={styles.subcontainer}>
        <View style={styles.textAndImgMaps}>
          <Text style={styles.titleText}>Elige una ubicación</Text>
          <Image source={require("../../assets/Logo.png")} style={styles.logoImage} />
        </View>
        <View style={styles.body}>
          <TouchableOpacity title="elegir ubicacion" onPress={handleShowMap} style={styles.btn2}>
            <Text style={styles.textMaps}>Mostrar mapa</Text>
          </TouchableOpacity>
          <GooglePlacesAutocomplete
            placeholder="Buscar..."
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // console.log(data, details)
              setPin({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.3422,
                longitudeDelta: 0.3421,
              });
            }}
            query={{
              key: KEY_MAPS,
              language: "es",
              components: "country:arg",
              types: "establishment",
              radius: 30000,
              location: `${region.latitude}, ${region.longitude}`,
            }}
            styles={{
              container: { flex: 0, position: "relative", width: "100%", zIndex: 1, borderWidth: 1, borderWidth: 1, borderRadius: 6 },
              listView: { backgroundColor: "white" },
            }}
          />
          {/* styles={{
            container: { 
              flex: 0, 
              position:'relative',
              width: "100%", 
              zIndex: 1, 
              borderWidth: 1, 
              borderRadius: 6, 
              height: 50 ,
            },
            listView: { backgroundColor: "white" },
          }} */}
          <View style={styles.containerMap}>
            {showMap && (
              <MapView
                style={estilos.map}
                initialRegion={{
                  latitude: pin.latitude,
                  longitude: pin.longitude,
                  latitudeDelta: 0.340000000004,
                  longitudeDelta: 0.342421,
                }}
                provider="google"
              >
                <Marker
                  coordinate={pin}
                  pinColor="black"
                  draggable={true}
                  onDragStart={(e) => {
                    console.log("Drag start", e.nativeEvent.coordinates);
                  }}
                  onDragEnd={(e) => {
                    setPin({
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    });
                  }}
                >
                  <Callout>
                    <Text>I'm here</Text>
                  </Callout>
                </Marker>
              </MapView>
            )}
          </View>
          {showMap && (
            <TouchableOpacity title="sacar mapa" onPress={handleHideMap} style={styles.btn2}>
              <Text style={styles.textMaps}>Ocultar mapa</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.btnsContainer}>
          <TouchableOpacity title="Atras" onPress={handleBack} style={styles.btnExit}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
            <Text style={styles.textBtn}> Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity title="Siguiente..." onPress={handleNext} style={styles.btnContinue}>
            <Text style={styles.textBtn}>Siguiente </Text>
            <AntDesign name="arrowright" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const estilos = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    marginVertical: 15,
    width: "100%",
    height: 250,
  },
});
export default FormMaps;
