import React, { useState } from "react";
import { Image, View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const colorPallete = { first: "#2968c0", second: "#298bc4", third: "#29adbf", fourth: "#6ad5ce", fifth: "#d7eae9" };

const slides = [
  {
    id: 1,
    image: require("../../assets/location.png"),
    title: "¡Todos los eventos en un solo lugar!",
  },
  {
    id: 2,
    image: require("../../assets/Agendar.png"),
    title: "¡Agendá los que más te gusten!",
  },
  {
    id: 3,
    image: require("../../assets/post.png"),
    title: "¡Creá tu propio evento!",
  },
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: "center", margin: 36 }}>
      <Image source={item.image} style={{ height: "65%" }} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

export default function OnBoarding({ navigation }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const Footer = () => {
    return (
      <View style={{ height: height * 0.35, justifyContent: "space-between", paddingHorizontal: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: colorPallete.fourth,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
        <View style={{ marginBottom: 30 }}>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity style={styles.btnStart} onPress={() => navigation.navigate("TabBar")}>
              <Text style={{ fontSize: 28, color: colorPallete.third, textAlign: "center", marginTop: 4 }}>Empezar</Text>
            </TouchableOpacity>
            <View style={{ height: 15 }} />
            <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate("Login")}>
              <Text style={{ fontSize: 28, color: colorPallete.third, textAlign: "center", marginTop: 4 }}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <View style={{ height: 15 }} />
            <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate("Register")}>
              <Text style={{ fontSize: 28, color: "white", textAlign: "center", marginTop: 4 }}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetx = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetx / width);
    setCurrentSlideIndex(currentIndex);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colorPallete.fifth }}>
      <StatusBar backgroundColor={colorPallete.fifth} />
      <FlatList
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        contentContainerStyle={{ height: height * 0.75 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginTop: 50,
    textAlign: "center",
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    marginBottom: 20,
    borderRadius: 2,
  },
  btnStart: {
    height: 50,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  btnLogin: {
    height: 50,
    borderRadius: 30,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colorPallete.third,
    backgroundColor: "transparent",
  },
  btnRegister: {
    height: 50,
    borderRadius: 30,
    backgroundColor: colorPallete.third,
  },
});

// import Onboarding from "react-native-onboarding-swiper";

// export default function OnBoarding({ navigation }) {
//   return (
//     <Onboarding
//       nextLabel="Siguiente"
//       skipLabel="Omitir"
//       onSkip={() => navigation.navigate("TabBar")}
//       onDone={() => navigation.navigate("TabBar")}
//       pages={[
//         {
//           backgroundColor: "#d7eae9",
//           image: <Image style={styles.image} source={require("../../assets/location.png")} />,
//           title: <Text></Text>,
//           subtitle: <Text style={styles.subTitle}>¡Encuentra todo tipo de eventos cerca tuyo!</Text>,
//         },
//         {
//           backgroundColor: "#d7eae9",
//           image: <Image style={styles.image} source={require("../../assets/Agendar.png")} />,
//           title: <Text></Text>,
//           subtitle: <Text style={styles.subTitle}>¡Agendá tus eventos favoritos!</Text>,
//         },
//         {
//           backgroundColor: "#d7eae9",
//           image: <Image style={styles.image} source={require("../../assets/post.png")} />,
//           title: <Text></Text>,
//           subtitle: <Text style={styles.subTitle}>¡Creá tus propios eventos!</Text>,
//         },
//       ]}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   subTitle: {
//     fontSize: 20,
//   },
//   image: {
//     width: 320,
//     height: 320,
//   },
// });
