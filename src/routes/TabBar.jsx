import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, Text, Image, StyleSheet, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux';

import Home from "../screens/Home/Home";
import Search from "../common/components/Search/Search";

import Profile from "../screens/Profile/Profile";
import { View } from "react-native";
import {styles} from './styles'

const Tab = createBottomTabNavigator();

const windowHeight = Dimensions.get("window").height;

export default function TabBar({ navigation }) {
  const logged = useSelector(state=>state.isLogged)

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
                  width: windowHeight / 12,
                  marginHorizontal: 10,
                  alignSelf: "flex-start",
                }}
                source={require("../assets/Logo.png")}
              />
            </SafeAreaView>
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <Search/>
            <TouchableOpacity>
              <Text onPress={handleGoToForm} style={{ fontSize: 40, marginRight: 20 }}>
                +
              </Text>
            </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <AntDesign name="user" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
