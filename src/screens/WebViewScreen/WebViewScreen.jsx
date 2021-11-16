import React, { useRef, useState, useEffect } from "react";
import { View, Alert } from 'react-native';
import { useSelector } from "react-redux";
import { WebView } from 'react-native-webview';
import WVSNavigation from "../../common/components/WVSNavigation/WVSNavigation";
import * as Progress from 'react-native-progress';
import Event from '../../../api/firebase/models/event'
import { URL } from 'react-native-url-polyfill';

// TEST CREDIT CARD NUMBER = 4013 5406 8274 6260
export default function WebViewScreen ({navigation, redirectUrl}) {
    const eventInfo = useSelector((state) => state.eventForm);
    const webViewRef = useRef();

    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    console.log('URLLLLLLLLLLL', redirectUrl);

    const handleBackPress = () => {
        webViewRef.current.goBack();
    }

    const handleForwardPress = () => {
        webViewRef.current.goForward();
    }

    useEffect(() => {
        if (currentUrl.includes('/success')) {
            // console.log('URL SUCCESS', currentUrl);
            let paramsUrl = (new URL(currentUrl)).searchParams;
            let payment_id = paramsUrl.get('payment_id');
            let payment_status = paramsUrl.get('status');

            const eventInfoDB = {...eventInfo, payment_id, payment_status};
            // console.log('FINAL EVENT', eventInfoDB);
            
            Event.create(eventInfoDB)
                .then(res=>{
                    console.log(res);
                    Alert.alert('Tu evento ha sido creado', 'Te enviamos un email con la información.');
                    navigation.replace('TabBar', currentUrl);
                })
                .catch(e=> {
                    console.log(e);
                    Alert.alert('Ha ocurrido un error.');
                    navigation.replace('TabBar', currentUrl);
                }); 
        }
        if (currentUrl.includes('/cancel')) {
            // console.log('URL FAILURE', currentUrl);
            Alert.alert('El pago ha sido rechazado.');
            navigation.replace('TabBar', currentUrl);
        }
    }, [currentUrl, eventInfo, Event]);

    return (
        <View style={{flex: 1, resizeMode: 'contain'}}>
            { !loaded && 
                <Progress.Bar 
                    progress={progress} 
                    width={null} 
                    borderWidth={0}
                    borderRadius={0}
                    color={'black'}
                />
            }
            <WebView 
                ref={webViewRef}
                style={{width: '100%', height: '100%', alignSelf: 'center'}}
                source={{ uri: redirectUrl }} 
                // onError={event => alert(`WebView Error ${event.nativeEvent.description}`)}
                onLoadEnd={() => setLoaded(true)}
                onLoadProgress={event => setProgress(event.nativeEvent.progress)}
                onNavigationStateChange={state => {
                    // console.log('STATE', state.url);
                    const url = state.url;
                    setCurrentUrl(url);
                    const back = state.canGoBack;
                    const forward = state.canGoForward;
                    setCanGoBack(back);
                    setCanGoForward(forward);
                }}
            />
            <WVSNavigation 
                onBackPress={handleBackPress} 
                onForwardPress={handleForwardPress}
            />
        </View>
    )
}