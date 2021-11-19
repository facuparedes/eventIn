import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEventInfo } from "../../common/redux/actions";
import styles from "./FormStyles";
import { Alert, View, Image, ScrollView, FlatList } from "react-native";
import { Input, Text, LinearProgress, CheckBox } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { categoryArray } from "./../../common/categories";
import { colorPallete } from "../Onboarding/styles";

// Validate Function
function validate(form) {
  let errorsValidate = {};
  if (!form.title) {
    errorsValidate.title = "Tu evento debe tener un nombre.";
  }
  if (form.title.length > 30) {
    errorsValidate.titleL = "El nombre de tu evento no puede tener más de 30 carácteres.";
  }
  if (!form.description) {
    errorsValidate.description = "Tu evento debe tener una descripción.";
  }
  if (form.description.length > 140) {
    errorsValidate.descriptionL = "La descripción no puede tener más de 140 carácteres.";
  }
  // if(!form.locationText) {
  //   errorsValdiate.LocationText = 'Debes ingresar una ubicación para tu evento.'
  // }
  if (!/^[0-9]+$/.test(form.fee)) {
    errorsValidate.fee = "La tarifa debe ser un número.";
  }
  if (form.fee < 0) {
    errorsValidate.feeM = "La tarifa no puede ser menor a 0.";
  }
  if (form.category === "Categoría") {
    errorsValidate.category = "Debes seleccionar una categoría.";
  }

  if (form.attachments.length === 0) {
    errorsValidate.photo = "Debes seleccionar una foto de tu galería.";
  }
  return errorsValidate;
}

const Title_Fee_Desc = ({ navigation }) => {
  const dispatch = useDispatch();

  const [categ, setCateg] = useState("Categoría"); ///

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState(0);

  const [attachments, setAttachments] = useState([]);

  const [isPublic, setIsPublic] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleTitle = (text) => {
    setTitle(text);
  };

  const handleDescription = (text) => {
    setDescription(text);
  };

  const handleFee = (value) => {
    setFee(value);
  };

  const handleIsPublic = () => {
    setIsPublic(!isPublic);
  };

  const handleIsPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("El permiso es requerido");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    await setAttachments([...attachments, pickerResult.uri]);
  };

  let openVideoPickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("El permiso es requerido");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Videos",
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    await setAttachments([...attachments, pickerResult.uri]);
  };

  function handleNext() {
    if (!isPublic && !isPrivate) return Alert.alert("Selecciona un tipo de evento.");

    let errorsForm = validate({
      title,
      description,
      fee,
      attachments: attachments,
      category: categ,
    });

    if (Object.keys(errorsForm).length === 0) {
      let feeNum = Number(fee);
      const partialEvent = {
        title,
        description,
        fee: feeNum,
        attachments,
        isPublic: isPublic ? true : false,
        category: categ,
      };
      dispatch(addEventInfo(partialEvent));
      navigation.navigate("FormDatePicker");
    } else {
      return Alert.alert(`${Object.values(errorsForm)[0]}`);
    }
    if (fee === 0) Alert.alert("Tu evento será gratuito, podés volver atrás para cambiarlo.");
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleFilter(e) {
    Alert.alert("Eliminar imagen", "¿esta seguro que desea eliminar esta imagen?", [{ text: "Si", onPress: () => setAttachments(attachments.filter((img) => img !== e)) }, { text: "No" }]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LinearProgress color={colorPallete.third} variant="determinate" value={0.2} style={{ height: 10 }} />
        <View style={styles.header}>
          <Text style={styles.textHeader}>Paso 1 de 5</Text>
        </View>

        <View style={styles.subcontainer}>
          <View style={styles.textAndImg}>
            <Text style={styles.titleText}>Crea tu Evento</Text>
            <Image source={require("../../assets/Logo.png")} style={styles.logoImage} />
          </View>

          <View style={styles.inputs}>
            <Input label="Nombre" placeholder="Nombre del evento..." onChangeText={handleTitle} inputStyle={styles.input} labelStyle={styles.label} />

            <Input label="Descripción" placeholder="Descripción..." onChangeText={handleDescription} inputStyle={styles.input} labelStyle={styles.label} />

            <Input label="Precio de la entrada" placeholder="$" inputStyle={styles.input} labelStyle={styles.label} onChangeText={handleFee} />
          </View>

          <View style={styles.photosContainer}>
            <Text style={styles.photosText}>Imagen</Text>
            {attachments.length === 1 && <Text style={styles.selectedPhotosText}>Seleccionaste {attachments.length} foto</Text>}
            {attachments.length > 1 && <Text style={styles.selectedPhotosText}>Seleccionaste {attachments.length} fotos</Text>}
            <View>
              <TouchableOpacity onPress={openImagePickerAsync} style={styles.photoBtn}>
                <Text style={styles.textPhotoBtn}>Selecciona una o más imágenes</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal>
              <View style={{ flexDirection: "row" }}>
                {attachments.length !== 0 &&
                  attachments.map((img, i) => (
                    <View key={i}>
                      <TouchableOpacity
                        style={styles.btnX}
                        onPress={() => {
                          handleFilter(img);
                        }}
                      >
                        <Image source={{ uri: img }} style={styles.pickedImg} />
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.typeEvent}>
            <Text style={styles.textType}>Tipo de evento:</Text>
            <View style={styles.checkBox}>
              {!isPublic && !isPrivate ? (
                <View style={styles.checkBox}>
                  <CheckBox title="Público" onPress={handleIsPublic} size={22} checked={isPublic} containerStyle={styles.boxCont} />
                  <CheckBox title="Privado" onPress={handleIsPrivate} size={22} checked={isPrivate} containerStyle={styles.boxCont} />
                </View>
              ) : isPublic ? (
                <CheckBox title="Publico" onPress={handleIsPublic} size={22} checked={isPublic} containerStyle={styles.boxCont} />
              ) : (
                <CheckBox title="Privado" onPress={handleIsPrivate} size={22} checked={isPrivate} containerStyle={styles.boxCont} />
              )}
            </View>
          </View>

          <View style={styles.categoryContainer}>
            <Text style={[styles.textType, { marginBottom: 5 }]}>Categoría del evento:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={categ}
                onValueChange={(value, index) => {
                  setCateg(value);
                }}
                mode="dropdown" // Android only
              >
                {categoryArray.map((item, i) => {
                  return <Picker.Item style={{ color: "black" }} key={i} value={item} label={item} />;
                })}
              </Picker>
            </View>
          </View>

          <View style={styles.btnsContainer}>
            <TouchableOpacity title="Atras" onPress={handleBack} style={styles.btnExit}>
              <AntDesign name="arrowleft" size={24} color="#fff" />
              <Text style={styles.textBtn}> Salir</Text>
            </TouchableOpacity>
            <TouchableOpacity title="Siguiente..." onPress={handleNext} style={styles.btnContinue}>
              <Text style={styles.textBtn}>Siguiente </Text>
              <AntDesign name="arrowright" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Title_Fee_Desc;
