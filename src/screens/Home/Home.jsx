import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeIsLogged, getEvents, getEventsByCategory } from "../../common/redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { View, SafeAreaView, RefreshControl, ScrollView } from "react-native";
import { styles } from "./styles.js";
import { Picker } from "@react-native-picker/picker";
import auth from "../../../api/firebase/services/AuthService";
import CardsFlat from "../../common/components/CardsFlat/CardsFlat";
import DatePicker from "../../common/components/DatePicker/DatePicker";
import { categoryArray } from "../../common/categories";

export default function Home() {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getEvents());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [categ, setCateg] = useState("Categoría");
  var categArray2 = [...categoryArray];
  categArray2.splice(1, 0, "Todas");

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const presentUser = {
          uid: user.uid,
          email: user.email,
          username: user.displayName,
        };
        dispatch(changeIsLogged(presentUser));
      }
    });
    return subscribe;
  });

  function handleFilterCategory(value) {
    setCateg(value);
    if (value === "Categoría" || value === "Todas") {
      dispatch(getEvents());
    } else {
      dispatch(getEventsByCategory(value));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      
        <View style={styles.filtersContainer}>
          <View style={styles.viewPicker}>
            <Picker
              selectedValue={categ}
              onValueChange={(value, index) => handleFilterCategory(value)}
              mode="dropdown" // Android only
              style={styles.picker}
            >
              {categArray2.map((item, i) => {
                return <Picker.Item key={i} value={item} label={item} />;
              })}
            </Picker>
          </View>
          <View style={styles.datePicker}>
            <DatePicker />
          </View>
        </View>

        <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
          <CardsFlat />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
