import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screens/Login.jsx";
import Register from "./src/screens/Register.jsx";
import store from "./src/common/redux/store.js";

//BORRAR LUEGO
import FormEvent from "./src/screens/FormEvent/FormEvent.jsx";
export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="form" component={FormEvent} />

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
