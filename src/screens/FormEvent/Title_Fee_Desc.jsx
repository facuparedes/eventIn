import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEventInfo } from "../../common/redux/actions";
import styles from "./FormStyles";
import { Alert, View, Image, ScrollView, FlatList } from "react-native";
import { Input, Text, LinearProgress, CheckBox } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker"; ///
import { categoryArray } from "./../../common/categories";

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

        <Input label="Nombre:" placeholder="Nombre del evento" onChangeText={handleTitle} inputStyle={styles.input} labelStyle={styles.label} inputContainerStyle={styles.inputCont} />

        <Input label="Descripción:" placeholder="Descripción..." onChangeText={handleDescription} inputStyle={styles.input} labelStyle={styles.label} inputContainerStyle={styles.inputCont} />

        <Input label="Tarifa:" placeholder="Tarifa" inputStyle={styles.input} labelStyle={styles.label} inputContainerStyle={styles.inputCont} onChangeText={handleFee} />

        <View style={styles.photosContainer}>
          <Text style={styles.photosText}>Fotos y Videos:</Text>
          {attachments.length === 1 && <Text style={styles.selectedPhotosText}>Seleccionaste {attachments.length} foto/video</Text>}
          {attachments.length > 1 && <Text style={styles.selectedPhotosText}>Seleccionaste {attachments.length} fotos/videos</Text>}
          <View style={styles.multimediaBtns}>
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.photoBtn}>
              <Text style={styles.textPhotoBtn}>Selecciona una foto</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openVideoPickerAsync} style={styles.videoBtn}>
              <Text style={styles.textVideoBtn}>Selecciona un video</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.textType}>Tipo de evento:</Text>
        <View style={styles.checkBox}>
          {!isPublic && !isPrivate ? (
            <View style={styles.checkBox}>
              <CheckBox title="Público" onPress={handleIsPublic} size={20} checked={isPublic} containerStyle={styles.boxCont} />
              <CheckBox title="Privado" onPress={handleIsPrivate} checked={isPrivate} containerStyle={styles.boxCont} />
            </View>
          ) : isPublic ? (
            <CheckBox title="Publico" onPress={handleIsPublic} size={20} checked={isPublic} containerStyle={styles.boxCont} />
          ) : (
            <CheckBox title="Privado" onPress={handleIsPrivate} checked={isPrivate} containerStyle={styles.boxCont} />
          )}
        </View>

        <View style={styles.category}>
          <Text style={styles.textType}>Categoría del evento:</Text>
          <View style={styles.container_picker}>
          <Picker
            style={styles.picker}
            selectedValue={categ}
            onValueChange={(value, index) => {
              setCateg(value);
            }}
            mode="dropdown" // Android only
            //style={styles.picker}
          >
            {categoryArray.map((item, i) => {
              return <Picker.Item style={{ color: "black" }} key={i} value={item} label={item} />;
            })}
          </Picker>
          </View>
        </View>

        <View style={styles.btnsContainer}>
          <TouchableOpacity
            title="Siguiente..."
            onPress={handleNext}
            style={[
              styles.btn,
              {
                flexDirection: "row",
              },
            ]}
          >
            <Text style={[styles.textBtn, { marginLeft: 40 }]}>Siguiente</Text>
            <Ionicons name="arrow-forward" size={28} color="#fff" style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Title_Fee_Desc;
