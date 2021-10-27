import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "./src/common/redux/store.js";
import TabBar from "./src/routes/TabBar";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabBar />
      </NavigationContainer>
    </Provider>
  );
}
