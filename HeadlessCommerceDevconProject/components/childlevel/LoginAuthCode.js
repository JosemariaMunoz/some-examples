import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ValidateSessionWithCode, code_challenge } from '../../common/services/liferay/api';
import { WebView } from 'react-native-webview';
import { loginStore } from '../../common/state/store';

const REACT_APP_API_PATH = 'http://192.168.1.183:8080';
//const REACT_APP_API_PATH = 'http://192.168.50.190:8080';
const REACT_APP_AUTH = 'id-9282c91f-18b7-a99d-3459-c8d3f74f3371';
const uri = REACT_APP_API_PATH + "/o/oauth2/authorize" +
    "?response_type=code&client_id=" + REACT_APP_AUTH + 
    "&code_challenge=" + code_challenge;
    
const LoginAuthCode = (props) => {
    const [stateUri, setStateUri] = useState(uri);

    const checkLoggedIn = () => {
        if(loginStore.getState().loggedIn){
            props.navigation.navigate('Home');
        }
    };

    loginStore.subscribe(() => checkLoggedIn());

    useEffect(checkLoggedIn, []);

    const checkPortletState = (url) => {
        if(url.includes('p_p_state=maximized')){
            setStateUri(url.replace('p_p_state=maximized', 'p_p_state=normal'));
        }
    }

    return (
        <View style={styles.centeredView}>
            <WebView
                incognito={true}
                source={{ uri: stateUri }}
                onNavigationStateChange={async (navState) => {
                    if(!navState.loading){
                        checkPortletState(navState.url);
                        if(navState.url.startsWith(REACT_APP_API_PATH + "/home")){
                            const regex = /[?&]([^=#]+)=([^&#]*)/g;
                            let params = {}, match;
    
                            console.log("params");
                            console.log(params);
                            console.log("navState.url");
                            console.log(navState.url);
                            while (match = regex.exec(navState.url)) {
                                params[match[1]] = match[2];
                                console.log("match[1]");
                                console.log(match[1]);
                                console.log("match[2]");
                                console.log(match[2]);
                            }
                            console.log("params.code");
                            console.log(params.code);
                            await ValidateSessionWithCode(params.code);
                        }
                    }                    
                }}
            />
        </View>        
    );
}

const styles = StyleSheet.create(
    {
        centeredView: {
            flex: 1,
            justifyContent: "center",
            marginHorizontal: 0
        },
        modalView: {
            backgroundColor: "white",
            borderRadius: 20,
            padding: 50,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        button: {
            marginTop: 25,
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            backgroundColor: "#2196F3"
        }
    }
);

export default LoginAuthCode;