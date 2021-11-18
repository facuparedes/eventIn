import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeIsLogged, getEvents, getEventsByCategory, getLikedEvents } from "../../common/redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { View, SafeAreaView, RefreshControl, ScrollView, TouchableOpacity, Text, Button, Alert, Platform } from "react-native";
import { styles } from "./styles.js";
import { Picker } from "@react-native-picker/picker";
import auth from "../../../api/firebase/services/AuthService";
import CardsFlat from "../../common/components/CardsFlat/CardsFlat";
import DatePicker from "../../common/components/DatePicker/DatePicker";
import { categoryArray } from "../../common/categories";
import event from "../../../api/firebase/models/event";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Home() {
  const dispatch = useDispatch();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    if (auth.currentUser) {
      dispatch(getLikedEvents(auth.currentUser.uid));
    }
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const allLikedEvents = useSelector((state) => state.likedEvents);

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
  setInterval(() => {
    const todayEvents = allLikedEvents.filter((ev) => {
      let diff = Math.abs(new Date().getTime() - ev.start.getTime());
      let days = diff / (1000 * 60 * 60 * 24);
      days = Math.floor(days);
      if (days === 0) return ev;
    });
    if (todayEvents.length > 0) {
      sendMessage(expoPushToken);
    }
  }, 3600000);

  const sendMessage = (token) => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: token,
        title: "¡Corre, no te lo pierdas!",
        body: "Uno de tus Eventos favoritos se realiza hoy!",
        data: { data: "goes here" },
        _displayInForeground: true,
      }),
    });
  };

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

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Tenes que usar un celular verdadero para recibir push-notifications salamin");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
{
  /* <TouchableOpacity onPress={() => {
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
</TouchableOpacity> */
}
