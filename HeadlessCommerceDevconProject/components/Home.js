import React, { useState } from 'react';
import { Divider } from "@react-native-material/core";
import { checkRole, logout } from '../common/services/liferay/api';
import { loadingStore, loginStore, rolesStore, userStore } from '../common/state/store';
import { LogBox, StyleSheet, Text, View, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const Home = (props) => {
    const [update, forceUpdate] = useState(true);
    const [loggedIn, setLoggedIn] = useState(loginStore.getState().loggedIn);
    const [userName, setUserName] = useState(userStore.getState().userName);
    const [adminRole, setAdminRole] = useState(checkRole("Administrator"));

    loginStore.subscribe(() => setLoggedIn(loginStore.getState().loggedIn));
    userStore.subscribe(() => setUserName(userStore.getState().userName));
    rolesStore.subscribe(() => setAdminRole(checkRole("Administrator")));

    const font = Platform.select({
        ios: 'GillSans-light',
        android: 'sans-serif-thin'
      });
   
    return (
        <ImageBackground
            source={require('../assets/logo.png')}
            style={[styles.background, { width: '100%', height: '100%' }]}
        >
            <SafeAreaView style={stylesBG.safe}>
            {
            loggedIn ?
                (
                    <>
                        <View>
                            <Text style={[stylesHeading.text, { fontFamily: font }]}> 
                                Welcome, {userName}!
                            </Text>

                            <Divider style={styles.divider} leadingInset={32} trailingInset={32} />
                        
                            <View style={stylesMenu.container}>
                                {adminRole &&
                                    <View>
                                        <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => props.navigation.navigate('Accounts')}
                                        style={[styles.button, { backgroundColor: "#2196F3" }]}
                                        >
                                            <Text style={styles.buttonText}>My Accounts</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => props.navigation.navigate('Accounts')}
                                        style={[styles.button, { backgroundColor: "#2196F3" }]}
                                        >
                                            <Text style={styles.buttonText}>DISCOUNTS</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>                        
                        </View>
                        <View style={stylesButton.view} >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {                                   
                                        logout().then(() => {
                                            forceUpdate(!update);
                                        }
                                    )}}
                                style={[stylesTouch.buttonBox, { backgroundColor: "#0d63ce" }]}
                            >
                                <Text style={stylesTouch.text}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ):
                (
                    <>
                        <Text style={[stylesHeading.text, { fontFamily: font }]}> 
                            Please, Log In
                        </Text>
                        <View style={stylesButton.view} >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => props.navigation.navigate('LoginAuthCode')}
                                style={[stylesTouch.buttonBox, { backgroundColor: "#0d63ce" }]}
                            >
                                <Text style={stylesTouch.text}>Log In (OAuth)</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
            }
            </SafeAreaView>
        </ImageBackground>
    );
}

const stylesBG = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 40,
      paddingHorizontal: 10,
      paddingBottom: 10,
      justifyContent: 'center',
    },
    safe: {
      flex: 1
    }
});

const styles = StyleSheet.create({
    mainView: {
        flex:1,
        margin: 25       
    },
    text: {
        color: "black"
    },  
    button: {
        alignItems: 'center',
        padding: 20,
        elevation: 2,
        backgroundColor: "#2196F3",
        elevation: 6,
        borderRadius: 10,
        marginHorizontal: 40,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        textTransform: "uppercase",
    },
    divider: {
        marginTop: 60,
        marginBottom: 20,
    }
});

const stylesButton = StyleSheet.create({
    view: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      alignSelf: 'flex-end',
      flexDirection: 'row',
      margin: 0
    }
});

const stylesTouch = StyleSheet.create({
    text: {
      color: 'white',
    },
    buttonBox: {
      height: 50,
      flex: 1,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center'
    }
});

const stylesHeading = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 32,
        marginTop: 120,
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 20,
    }
});

const stylesMenu = StyleSheet.create({
    container: {

    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
});

export default Home;