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
import ForgotPass from "./src/screens/ForgotPassword/ForgotPassword.jsx";
import Register from "./src/screens/Register/Register";
import Loading from "./src/screens/Loading/Loading";
import CardDetail from "./src/screens/Card Detail/CardDetail";
import moment from "moment";
import "moment/locale/es";
//imports del Form
import Title_Fee_Desc from './src/screens/FormEvent/Title_Fee_Desc'
import FormDatePicker from "./src/screens/FormEvent/FormDatePicker.jsx";
import FormMaps from "./src/screens/FormEvent/FormMaps.jsx";
import FormCardPreview from "./src/screens/FormEvent/FormCardPreview.jsx";
import Profile from "./src/screens/Profile/Profile.jsx";
import EditProfile from "./src/screens/Edit Profile/EditProfile.jsx";

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
          <Stack.Screen name="CardDetail" component={CardDetail} />
                          {/*FORM SECTION*/}
          <Stack.Screen name="Form" component={Title_Fee_Desc} />
          <Stack.Screen name="FormDatePicker" component={FormDatePicker} />
          <Stack.Screen name="FormMaps" component={FormMaps} />
          <Stack.Screen name="FormCardPreview" component={FormCardPreview} />

          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPass" component={ForgotPass} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
