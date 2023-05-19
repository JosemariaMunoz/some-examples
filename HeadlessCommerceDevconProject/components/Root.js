import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import LoginAuthCode from './childlevel/LoginAuthCode';
import Accounts from './childlevel/Accounts';
import AccountDetail from './childlevel/childlevel/AccountDetail';

const Stack = createNativeStackNavigator();

const Root = (props) => {
    
    return (    
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: "#0d63ce" },
            }}
        >            
            <Stack.Screen name="Home"
                options={{
                    headerShown: false,
                }}
            >
                {propsAux => <Home {...propsAux} />}
            </Stack.Screen>

            <Stack.Screen name="LoginAuthCode"
                options={{
                    headerTitle: 'Please Log In',
                }}
            >
                {propsAux => <LoginAuthCode {...propsAux} />}
            </Stack.Screen>

            <Stack.Screen name="Accounts" 
                options={{
                    headerTitle: 'My Accounts',
                }}
            >
                {propsAux => <Accounts {...propsAux} />}
            </Stack.Screen>

            <Stack.Screen name="AccountDetail" 
                options={{
                    headerTitle: 'Account Detail',
                }}
            >
                {propsAux => <AccountDetail {...propsAux} />}
            </Stack.Screen>

        </Stack.Navigator>
    );
}

export default Root;