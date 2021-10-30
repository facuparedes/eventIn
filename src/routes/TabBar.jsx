import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";

import Home from "../screens/Home/Home";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import FormEvent from "../screens/FormEvent/FormEvent";

const Tab = createBottomTabNavigator();

export default function TabBar({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopColor: "transparent",
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: "#91c7fb",
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <Entypo name="home" color={color} size={size} />,
          headerRight: () => (
            <TouchableOpacity>
              <Text
                onPress={()=>navigation.navigate('FormEvent')}
                style={{fontSize: 40, marginRight: 20}}
                >
                +
                </Text>
            </TouchableOpacity>
          )
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
        name="FormEvent"
        component={FormEvent}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <AntDesign name="form" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}