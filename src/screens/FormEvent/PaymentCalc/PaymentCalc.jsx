import React from 'react';
import { useSelector } from 'react-redux';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearProgress } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import styles from './PaymentCalcStyles';

export default function PaymentCalc({ navigation }) {
    const eventInfo = useSelector(state => state.eventForm)

    const handleAccept = async () => {
        const post = await axios.post('http://192.168.0.10:3001/checkout', { title: eventInfo.title });
        // await console.log(post.data);
        const redirectUrl = post.data;
        navigation.navigate('MercadoPagoCard', redirectUrl);
    };

    const handleCancel = () => {
        Alert.alert("¿Estás seguro de que deseas salir?", "Se perderán todos los cambios.", [
            { text: "Si", onPress: () => navigation.popToTop() },
            { text: "No" }
        ]);
    };

    return (
        <SafeAreaView>
            <LinearProgress color="#00BD9D" variant="determinate" value={0.8} style={{height:10}} />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Paso 5 de 5</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={42} color="#00BD9D" />
            </TouchableOpacity>
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