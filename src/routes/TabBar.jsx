import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, Text, Image, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Home from "../screens/Home/Home";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import FormEvent from "../screens/FormEvent/FormEvent";
import Profile from "../screens/Profile/Profile";

const Tab = createBottomTabNavigator();

const windowHeight = Dimensions.get("window").height;

export default function TabBar({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
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
            <SafeAreaView style={{ backgroundColor: "white" }}>
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
            <TouchableOpacity>
              <Text onPress={() => navigation.navigate("Form")} style={{ fontSize: 40, marginRight: 20 }}>
                +
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ color, size }) => <Entypo name="login" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="sign-in" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <AntDesign name="user" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
