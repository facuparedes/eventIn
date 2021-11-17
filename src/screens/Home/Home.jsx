import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeIsLogged, getEvents, getEventsByCategory } from "../../common/redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { View, SafeAreaView, RefreshControl, ScrollView, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles.js";
import { Picker } from "@react-native-picker/picker";
import auth from "../../../api/firebase/services/AuthService";
import CardsFlat from "../../common/components/CardsFlat/CardsFlat";
import DatePicker from "../../common/components/DatePicker/DatePicker";
import { categoryArray } from "../../common/categories";
import event from "../../../api/firebase/models/event";

export default function Home() {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getEvents());
    wait(2000).then(() => setRefreshing(false));
    setCateg("Categoría");
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
  }, []);

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
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
          <CardsFlat />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

{/* <TouchableOpacity onPress={() => {
  event.create({
    attachments: [
      "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540andyfrank%252Fproyecto-grupal/ImagePicker/a9ad3ae9-3aff-48b5-8697-27696cd77a29.jpg",
    ],
    category: "Académico",
    createdBy: "sDYSwFOTjJScO6lngjYkW5QZbzH3",
    description: "BBBBBBBBBBB",
    end: {
      date: new Date(),
      time: new Date(),
    },
    fee: 999999,
    isPublic: true,
    location: {
      lat: -34.4528335,
      long: -58.8974308,
    },
    payment_id: "1243490651",
    payment_price: 400,
    payment_status: "approved",
    publishDate: {
      date: new Date(),
      time: new Date()
    },
    start: {
      date: new Date(),
      time: new Date(),
    },
    title: "Aaaaaaa",
  }).then(res=>console.log(res))

}}>
  <Text>EVENT</Text>
</TouchableOpacity> */}