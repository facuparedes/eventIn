import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './WVSNavigationStyles';

export default function WVSNavigation ({ onBackPress, onForwardPress }) {
    const back = '<';
    const forward = '>';

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={onBackPress}>
                <Text style={styles.btnText}>{back}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={onForwardPress}>
                <Text style={styles.btnText}>{forward}</Text>
            </TouchableOpacity>
        </View>
    )
}