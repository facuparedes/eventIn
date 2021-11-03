import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addEventInfo } from "../../common/redux/actions";
import styles from "./FormStyles";
import { Alert, View, Image, ScrollView } from "react-native";
import { Input, Text, LinearProgress, CheckBox } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const Title_Fee_Desc = ({ navigation }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState(0);
  const [photo, setPhoto] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  // Categories states (not form)
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState("");
  const [bar, setBar] = useState(false);
  const [deportes, setDeportes] = useState(false);
  const [fiesta, setFiesta] = useState(false);
  const [teatro, setTeatro] = useState(false);
  const [musica, setMusica] = useState(false);

  const handleTitle = (text) => {
    setTitle(text);
  };

  const handleDescription = (text) => {
    setDescription(text);
  };

  const handleFee = (value) => {
    setFee(value);
  };

  const handlePhoto = (text) => {
    setPhoto(text);
  };

  const handleIsPublic = () => {
    setIsPublic(!isPublic);
  };

  const handleIsPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const handleCategories = () => {
    setShowCategories(!showCategories);
  };

  function handleNext () {
      const partialEvent = {
        title,
        description,
        fee,
        photo,
        isPublic: isPublic? true : false,
        category: categories
      }
      dispatch(addEventInfo(partialEvent));
      navigation.navigate("FormDatePicker");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LinearProgress color="lightgreen" variant="determinate" value={0} />

        <View style={styles.textAndImg}>
          <Text h4 style={styles.titleText}>
            Crea tu Evento
          </Text>
          <Image source={require("../../assets/Logo.png")} style={styles.logoImage} />
        </View>

        <Input 
          label="Nombre" 
          placeholder="Nombre del evento" 
          onChangeText={handleTitle} 
          inputStyle={styles.input} 
          labelStyle={styles.label} 
          inputContainerStyle={styles.inputCont} 
          />

        <Input 
          label="Descripción" 
          placeholder="Descripción..." 
          onChangeText={handleDescription} 
          inputStyle={styles.input} 
          labelStyle={styles.label} 
          inputContainerStyle={styles.inputCont}
           />

        <Input 
          label="Tarifa" 
          placeholder="Tarifa" 
          inputStyle={styles.input} 
          labelStyle={styles.label} 
          inputContainerStyle={styles.inputCont} 
          onChangeText={handleFee}
        />

        <Input 
          label="Fotos" 
          placeholder="Añadir link de la foto" 
          inputStyle={styles.input} 
          labelStyle={styles.label} 
          inputContainerStyle={styles.inputCont} 
          onChangeText={handlePhoto} 
        />

        <Text style={styles.textType}>Tipo de evento:</Text>
        <View style={styles.checkBox}>
          {!isPublic && !isPrivate ? (
            <View style={styles.checkBox}>
              <CheckBox 
                title="Público" 
                onPress={handleIsPublic}
                size={20} 
                checked={isPublic} 
                containerStyle={styles.boxCont} 
              />
              <CheckBox 
                title="Privado" 
                onPress={handleIsPrivate} 
                checked={isPrivate} 
                containerStyle={styles.boxCont} 
              />
            </View>
          ) : isPublic ? (
            <CheckBox 
              title="Publico" 
              onPress={handleIsPublic} 
              size={20} 
              checked={isPublic}
              containerStyle={styles.boxCont} 
            />
          ) : (
            <CheckBox 
              title="Privado"
              onPress={handleIsPrivate} 
              checked={isPrivate} 
              containerStyle={styles.boxCont}
            />
          )}
        </View>

        <TouchableOpacity style={styles.btnCategories} onPress={handleCategories}>
          <View style={styles.categoriesView}>
            <Text style={styles.textCat}>Categorias</Text>
            <MaterialIcons name="arrow-drop-down" size={30} color="black" style={styles.catIcon} />
          </View>

        </TouchableOpacity>
        {showCategories && !bar && !deportes && !musica && !teatro && !fiesta ? (
          <View>
            <CheckBox
              title="Bar"
              onPress={() => {
                setCategories("Bar");
                setBar(!bar);
                if (bar) return setCategories("");
              }}
              checked={bar}
              containerStyle={styles.boxCont}
            />
            <CheckBox
              title="Deportes"
              onPress={() => {
                setCategories("Deportes");
                setDeportes(!deportes);
                if (deportes) return setCategories("");
              }}
              checked={deportes}
              containerStyle={styles.boxCont}
            />
            <CheckBox
              title="Fiesta"
              onPress={() => {
                setCategories("Fiesta");
                setFiesta(!fiesta);
                if (fiesta) return setCategories("");
              }}
              checked={fiesta}
              containerStyle={styles.boxCont}
            />
            <CheckBox
              title="Musica"
              onPress={() => {
                setCategories("Musica");
                setMusica(!musica);
                if (musica) return setCategories("");
              }}
              checked={musica}
              containerStyle={styles.boxCont}
            />
            <CheckBox
              title="Teatro"
              onPress={() => {
                setCategories("Teatro");
                setTeatro(!teatro);
                if (teatro) return setCategories("");
              }}
              checked={teatro}
              containerStyle={styles.boxCont}
            />
          </View>
        ) : bar ? (
          <CheckBox
            title="Bar"
            onPress={() => {
              setCategories("Bar");
              setBar(!bar);
              if (bar) return setCategories("");
            }}
            checked={bar}
            containerStyle={styles.boxCont}
          />
        ) : deportes ? (
          <CheckBox
            title="Deportes"
            onPress={() => {
              setCategories("Deportes");
              setDeportes(!deportes);
              if (deportes) return setCategories("");
            }}
            checked={deportes}
            containerStyle={styles.boxCont}
          />
        ) : fiesta ? (
          <CheckBox
            title="Fiesta"
            onPress={() => {
              setCategories("Fiesta");
              setFiesta(!fiesta);
              if (fiesta) return setCategories("");
            }}
            checked={fiesta}
            containerStyle={styles.boxCont}
          />
        ) : musica ? (
          <CheckBox
            title="Musica"
            onPress={() => {
              setCategories("Musica");
              setMusica(!musica);
              if (musica) return setCategories("");
            }}
            checked={musica}
            containerStyle={styles.boxCont}
          />
        ) : teatro ? (
          <CheckBox
            title="Teatro"
            onPress={() => {
              setCategories("Teatro");
              setTeatro(!teatro);
              if (teatro) return setCategories("");
            }}
            checked={teatro}
            containerStyle={styles.boxCont}
          />
        ) : null}

        <View style={styles.btnsContainer}>
          <TouchableOpacity 
            title="Siguiente..." 
            style={styles.btn}
            onPress={handleNext}
            >
            <Text style={styles.textBtn}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Title_Fee_Desc;
