import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Text, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearProgress } from "react-native-elements";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker"; 
import axios from "axios";
import styles from './PaymentCalcStyles';

function validate (data) {
    let errors = {};
    if(!data.date) {
        errors.date = 'Elige una fecha de publicación para tu evento.'
    }
    if(!data.price) {
        errors.price = 'Valor incorrecto.'
    }
    return errors;
}

export default function PaymentCalc({ navigation }) {
    const eventInfo = useSelector(state => state.eventForm);
    const dispatch = useDispatch();

    const [showCalendar, setShowCalendar] = useState(false);
    const [dateValue, setDateValue] = useState(new Date());
    const [textDate, setTextDate] = useState("");
    const [date, setDate] = useState(new Date());
    const [days, setDays] = useState(0);
    const [price, setPrice] = useState(100);

    const daysArray = ['1 día', '3 días', '5 días', '7 días', '14 días', '30 días', '60 días', '90 días']

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
    
        setShowCalendar(Platform.OS === "ios"); // why this?
        setDate(currentDate);
    
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
        setTextDate(fDate);
        setDateValue(tempDate);
        setShowCalendar(false);
    };

    const handlePickerChange = (value) => {
        setDays(value);
        if (value === '1 día') {
            setPrice(100);
        }
        if (value === '3 días') {
            setPrice(200);
        }
        if (value === '5 días') {
            setPrice(300);
        }
        if (value === '7 días') {
            setPrice(400);
        }
        if (value === '14 días') {
            setPrice(700);
        }
        if (value === '30 días') {
            setPrice(1200);
        }
        if (value === '60 días') {
            setPrice(2000);
        }
        if (value === '90 días') {
            setPrice(3000);
        }
    }

    const handleAccept = async () => {

        const validation = validate({date: textDate, price: price});

        if (Object.keys(validation).length === 0) {
            // const partialEvent = {
            //     publishDate: date,
            //     price: price
            // };

            // dispatch(addEventInfo(partialEvent));

            const post = await axios.post('https://eventin-app.herokuapp.com/checkout', { 
                title: eventInfo.title,
                price: price
            });
            // await console.log(post.data);
            const redirectUrl = post.data;
            navigation.navigate('MercadoPagoCard', redirectUrl);
        } else {
            return Alert.alert(`${Object.values(validation)[0]}`);
        }
    };

    const handleCancel = () => {
        console.log('HOLAAAAA', textDate);
        Alert.alert("¿Estás seguro de que deseas salir?", "Se perderán todos los cambios.", [
            { text: "Si", onPress: () => navigation.popToTop() },
            { text: "No" }
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearProgress color="#00BD9D" variant="determinate" value={0.8} style={{height:10}} />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Paso 5 de 5</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={42} color="#00BD9D" />
            </TouchableOpacity>

                <Text h4 style={styles.titleText}>Detalles de Facturación</Text>

            <View style={styles.dateCont}>
                <Input
                    label="Fecha de publicación de tu evento"
                    placeholder="Fecha"
                    onFocus={() => setShowCalendar(true)}
                    showSoftInputOnFocus={false}
                    inputStyle={styles.input}
                    labelStyle={styles.label}
                    inputContainerStyle={styles.dateInput}
                    value={textDate}
                />
                <TouchableOpacity onPress={() => setShowCalendar(true)}>
                    <MaterialIcons name="date-range" size={40} color="black" style={styles.calendar} />
                </TouchableOpacity>
            </View>

            { showCalendar &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    minimumDate={new Date()}
                    onChange={onChangeDate}
                />
            }

            <View style={styles.daysCont}>   
                <Text style={styles.txts}>Cantidad de días</Text>

                <View style={styles.pickerContainer}>
                    <Picker
                    style={styles.picker}
                    selectedValue={days}
                    onValueChange={(value, index) => {
                        handlePickerChange(value)
                    }}
                    mode="dropdown" // Android only
                    >
                    {daysArray.map((item, i) => {
                        return <Picker.Item style={{ color: "black" }} key={i} value={item} label={item} />;
                    })}
                    </Picker>
                </View>
            </View>

            <Text style={styles.txtValue}>${price}</Text>

            <View style={styles.btnsContainer}>
                <TouchableOpacity
                    style={styles.btn} 
                    onPress={handleAccept}   
                >
                    <Text style={styles.textBtn}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, {backgroundColor: 'gray'}]}
                    onPress={handleCancel}
                >
                    <Text style={styles.textBtn}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}