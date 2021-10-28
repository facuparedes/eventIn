import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import store from "./src/common/redux/store.js";
// import TabBar from "./src/routes/TabBar";
import OnBoarding from "./src/screens/Onboarding/OnBoarding";
import Home from "./src/screens/Home/Home";
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Register/Register";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Onboarding" component={OnBoarding} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
        {/* <TabBar />  lo comento porque no sabemos como implementarlo pero si funciona */}
      </NavigationContainer>
    </Provider>
  );
}
