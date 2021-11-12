import React, { useRef, useState, useEffect } from "react";
import { View, Alert } from 'react-native';
import { useSelector } from "react-redux";
import { WebView } from 'react-native-webview';
import WVSNavigation from "../../common/components/WVSNavigation/WVSNavigation";
import * as Progress from 'react-native-progress';
import Event from '../../../api/firebase/models/event'

// CREDIT CARD NUMBER = 4013 5406 8274 6260
export default function WebViewScreen ({navigation, redirectUrl}) {
    const eventInfo = useSelector(state => state.eventInfo);
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
            console.log(currentUrl);
            Alert.alert('Tu evento ha sido creado.')<
            navigation.replace('TabBar', currentUrl);
            Event.create(eventInfo);
        }
        if (currentUrl.includes('/cancel')) {
            console.log(currentUrl);
            Alert.alert('El pago ha sido rechazado.');
            navigation.replace('TabBar', currentUrl);
        }
    }, [currentUrl]);

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
                onError={event => alert(`WebView Error ${event.nativeEvent.description}`)}
                onLoadEnd={() => setLoaded(true)}
                onLoadProgress={event => setProgress(event.nativeEvent.progress)}
                onNavigationStateChange={state => {
                    console.log('STATE', state.url);
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

// const handleResponse = (data) => {
//     if(data.includes('/success')){
//       setPay(false);
//       Alert.alert('Su evento ha sido creado.');
//       navigation.replace("TabBar");
//       Event.create(eventInfo);
//     }
//     if(data.includes('/cancel')){
//       setPay(false);
//       Alert.alert('El pago ha sido rechazado.');
//       navigation.replace("TabBar");
//     }
//   }

//    {/* <Modal
//           visible={pay}
//           onRequestClose={() => setPay(false)}
//         >
//           <WebView
//             source={{ uri: redirectUrl }}
//             onNavigationStateChange={(data) => handleResponse(data.url)}
//           />
//         </Modal> */}