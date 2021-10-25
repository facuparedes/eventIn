import React from 'react';
import Login from './screens/Login';
import Register from './screens/Register';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {

  const Stack = createStackNavigator();
  
  return (
    <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

