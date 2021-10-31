import React from "react";
import { SafeAreaView, Image, View, Text, TouchableOpacity, Animated } from "react-native";
import { colorPallete, styles, width, height } from "./styles";

const slides = [
  {
    id: 1,
    image: require("../../assets/onboarding1.png"),
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

export default function OnBoarding({ navigation }) {
  const scrollX = new Animated.Value(0);

  const RenderContent = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ height: height * 0.75 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
      >
        {slides.map((item, index) => (
          <View key={index} style={{ width: width }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Image source={item.image} resizeMode="contain" style={{ width: "80%", height: "80%" }} />
            </View>
            <View style={{ position: "absolute", bottom: "10%", left: 40, right: 40 }}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  const RenderButtons = () => {
    return (
      <View style={{ height: height * 0.25, justifyContent: "space-between", paddingHorizontal: 30, marginBottom: 10 }}>
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity style={styles.btnStart} onPress={() => navigation.replace("Loading")}>
            <Text style={{ fontSize: 28, color: colorPallete.third, textAlign: "center", marginTop: 4 }}>Empezar</Text>
          </TouchableOpacity>
          <View style={{ height: 15 }} />
          <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.replace("Login")}>
            <Text style={{ fontSize: 28, color: colorPallete.third, textAlign: "center", marginTop: 4 }}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <View style={{ height: 15 }} />
          <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.replace("Register")}>
            <Text style={{ fontSize: 28, color: "white", textAlign: "center", marginTop: 4 }}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const RenderDots = () => {
    const dotPosition = Animated.divide(scrollX, width);

    return (
      <View style={styles.dotContainer}>
        {slides.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [8, 17, 8],
            extrapolate: "clamp",
          });

          return <Animated.View key={`dot-${index}`} opacity={opacity} style={[styles.dot, { width: dotSize, height: dotSize }]}></Animated.View>;
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colorPallete.fifth }}>
      <View>
        <RenderContent />
        <RenderButtons />
      </View>
      <View style={styles.dotRootContainer}>
        <RenderDots />
      </View>
    </SafeAreaView>
  );
}
