import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";
import { TouchableOpacity, Text, Image, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { changeIsLogged } from "../common/redux/actions";

import auth from "../../api/firebase/services/AuthService";
import { signOut } from "@firebase/auth";

import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import Search from "../common/components/Search/Search";

import { View } from "react-native";
import styles from './styles'

const Tab = createBottomTabNavigator();

const windowHeight = Dimensions.get("window").height;

export default function TabBar({ navigation }) {
  const logged = useSelector(state=>state.isLogged);
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();

  function handleGoToForm () {
    if (logged) {
      navigation.navigate("Form")
    } else {
      Alert.alert('Acceso denegado', 'Tenés que estar iniciar sesión para crear un evento.', [
        {text: 'Ahora no'},
        {text: 'Iniciar sesión', onPress: () => navigation.navigate('Login')}
      ]); 
    }
  }

  function alertLogOut() {
    Alert.alert(auth.currentUser.displayName, "¿Estas seguro de que deseas cerrar sesión?", [
      { text: "Cancelar" },
      { text: "Aceptar", onPress: () => logOut() },
    ]);
  };

  function logOut() {
    signOut(auth);
    dispatch(changeIsLogged(""));
    Alert.alert("Has cerrado sesión.");
    // Por alguna razón, sin especificar nada, de acá se navega directamente al onBoarding.
    // navigation.replace('Login'); // Acá vamos a tener que navegar desde el Stack y no desde el Tab, porque sino va a mostrar el TabBar
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#d7eae9",
          borderTopColor: "transparent",
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "",
          tabBarIcon: ({ color, size }) => <Entypo name="home" color={color} size={size} />,
          headerBackground: () => (
            <SafeAreaView style={{ backgroundColor: "#d7eae9" }}>
              <Image
                style={{
                  resizeMode: "contain",
                  height: "100%",
                  width: windowHeight / 10,
                  marginHorizontal: 16,
                  alignSelf: "flex-start",
                }}
                source={require("../assets/Logo.png")}
              />
            </SafeAreaView>
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              {
                display && <Search display={display} setDisplay={setDisplay}/>
              } 
              {
                !display && 
                  <TouchableOpacity style={styles.searchContainer} onPress={() => setDisplay(true)}>
                    <Feather name="search" style={styles.searchIcon} />
                  </TouchableOpacity>
              }
            <TouchableOpacity onPress={handleGoToForm}>
              <MaterialCommunityIcons 
                name="plus" 
                size={36} 
                color="black" 
                style={{marginRight: 12, marginTop: 2, marginLeft: -6, borderRadius: 999, backgroundColor: "#F0EEEE"}}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      { !(!logged) &&
          <Tab.Screen
          name="Perfil"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => <AntDesign name="user" color={color} size={size} />,
            headerTitle: "",
            headerBackground: () => (
              <SafeAreaView style={{ backgroundColor: "#d7eae9" }}>
                <Image
                  style={{
                    resizeMode: "contain",
                    height: "100%",
                    width: windowHeight / 10,
                    marginHorizontal: 16,
                    alignSelf: "flex-start",
                  }}
                  source={require("../assets/Logo.png")}
                />
              </SafeAreaView>
            ),
            headerRight: () => (
              <TouchableOpacity 
                  onPress={()=> alertLogOut()} 
                  style={styles.buttonLogout}   
                >
                  <Text style={styles.textLogout}>Cerrar Sesión</Text>
                </TouchableOpacity>
            )
          }}
        />
      }
      {
        !logged &&
        <Tab.Screen
          name=" "
          component={Home}
          options={{
            tabBarIcon: () => 
              <TouchableOpacity 
                onPress={()=>navigation.navigate('Login')} 
                style={styles.buttonLogin}   
              >
                <Text style={styles.textLogin}>Iniciar sesión</Text>
              </TouchableOpacity>
          }}
        />
      }
    </Tab.Navigator>
  );
}
