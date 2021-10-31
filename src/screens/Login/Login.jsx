import React from 'react';
import {View, Text} from 'react-native';
import { Button } from 'react-native';

export default function Login ({navigation}) {
    return(
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text>Hola soy el Login</Text>
            <Button
            style={{marginTop: 20}}
                title="Go To Home"
                onPress={()=>navigation.navigate('TabBar')}
            />

        </View>
    )
}