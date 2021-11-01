import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import store from "./src/common/redux/store.js";
import FormEvent from "./src/screens/FormEvent/FormEvent";
import TabBar from "./src/routes/TabBar";
import Logo from "./src/screens/Logo/Logo";
import OnBoarding from "./src/screens/Onboarding/OnBoarding";
import Home from "./src/screens/Home/Home";
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Register/Register";
import Loading from "./src/screens/Loading/Loading";
import moment from "moment";
import "moment/locale/es";

export default function App() {
  const Stack = createStackNavigator();
  moment.locale("es");

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Logo" component={Logo} />
          <Stack.Screen name="Onboarding" component={OnBoarding} />
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="TabBar" component={TabBar} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Form" component={FormEvent} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
