import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { apiRequest } from '../../common/services/liferay/api';
import { loginStore } from '../../common/state/store';

import { Avatar, ApplicationProvider, Divider, List, ListItem, Button } from '@ui-kitten/components';

import * as eva from '@eva-design/eva';
import { default as theme } from '../../global/custom-theme.json';

const REACT_APP_API_PATH = 'http://192.168.1.183:8080';
//const REACT_APP_API_PATH = 'http://192.168.50.190:8080';

const Accounts = (props) => {

  const [accounts, setAccounts] = useState('');
  const [channels, setChannels] = useState([]);

  const [totalCurrentMonth, setTotalCurrentMonth] = useState([]);
  const [totalPastMonth, setTotalPastMonth] = useState([]);

  const checkLoggedIn = () => {
      if(!loginStore.getState().loggedIn){
          props.navigation.navigate('Home');
      }
  };

  useEffect(() => {
    const getAccountsLocal = async() => {  
        return apiRequest('/o/headless-commerce-admin-account/v1.0/accounts', 
        {
          method: 'GET'
        }).then(res => {
          console.log("Local Get Account Request");
          console.log(res.items);
          
          setAccounts(res.items);
        })
        .catch(async e => { await logout(); AppNavigation.navigate('LoginAuthCode'); return false});       
      }
      getAccountsLocal();
  }, []);
  
  useEffect(() => {
    const getChannels = async() => {
        console.log("/o/headless-commerce-admin-channel/v1.0/channels");
        return apiRequest('/o/headless-commerce-admin-channel/v1.0/channels', 
        {
          method: 'GET'
        }).then(res => {
          console.log("getChannels");
          console.log(res.items);
          let cChannelOptions = [];
          for (let ckey in res.items){
            let opt = {};
            opt.label = res.items[ckey].name;
            opt.value = res.items[ckey].id;
            cChannelOptions.push(opt);
          }
          setChannels(cChannelOptions);
        })
        .catch(async e => { return false});
      }
      getChannels();
  }, []);

  useEffect(() => {
    const getColorStatus = () =>{

      for (let akey in accounts){
        for (let ckey in channels){
            getColorFromPlacedOrders(channels[ckey].value, accounts[akey].id);
        }
      }

    }
    getColorStatus();

  }, [accounts]);
  

  const getColorFromPlacedOrders = async(idChannel, idAccount) => {
    //console.log('getTotalCurrentMonth/o/headless-commerce-delivery-order/v1.0/channels/'+idChannel+'/accounts/'+idAccount+'/placed-orders');
    return apiRequest('/o/headless-commerce-delivery-order/v1.0/channels/'+idChannel+'/accounts/'+idAccount+'/placed-orders', 
    {
      method: 'GET'
    }).then(res => {

      for (let ckey in res.items){
        let cTotal = res.items[ckey].summary.total;
        let modifiedDate = new Date(res.items[ckey].modifiedDate);
        let cDate = new Date();

        let arrTemp = {};
        arrTemp.id = idAccount;

        if(cDate.getMonth() == modifiedDate.getMonth() && cDate.getFullYear() == modifiedDate.getFullYear()) {
            arrTemp.totalCM = cTotal;

            setTotalCurrentMonth(current => [...current, arrTemp]);          
        }
        if(cDate.getMonth()-1 == modifiedDate.getMonth() && cDate.getFullYear() == modifiedDate.getFullYear()) {
            arrTemp.totalPM = cTotal;

            setTotalPastMonth(current => [...current, arrTemp]);      
        }
      }
    })
    .catch(async e => {  return false});
  }
    
  const RenderItemImage = (props) => (
    <Avatar
        {...props}
        style={[stylesAvatar.itemImage]}
        source={{
            uri: REACT_APP_API_PATH + props.logoURL,
        }}
    />
  );

  loginStore.subscribe(() => checkLoggedIn());
  useEffect(checkLoggedIn, []);

  const accountColor = (id) => {

    let cTotalCurrentMonth = 0;
    let cTotalPastMonth = 0;

    totalCurrentMonth.forEach(item => {
      if(item.id === id) {
        cTotalCurrentMonth += item.totalCM;
      }
    })

    totalPastMonth.forEach(item => {
      if(item.id === id) {
        cTotalPastMonth += item.totalPM;
      }
    })

    if(cTotalCurrentMonth>cTotalPastMonth){
        return 'green';
    }
    if(cTotalCurrentMonth<cTotalPastMonth){
        return 'red';
    }
    return 'yellow';
  };

  const renderItemAccessory = (color): React.ReactElement => (

    <View style={listStyles.containerShape}>
      <View style={[
        listStyles.CircleShape,
        (color==="red") && listStyles.CircleShapeRed,
        (color==="green") && listStyles.CircleShapeGreen
      ]} />
    </View>
    );

  return (
      <View style={listStyles.container}>
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
              <List
                  style={stylesKitten.container}
                  ItemSeparatorComponent={Divider}
                  data={accounts}
                  renderItem={({ item, index }) => (               
                      <ListItem
                          title={item.name}
                          description={item.customFields.Description}
                          onPress={() => props.navigation.navigate('AccountDetail', {idAccount: item.id})}
                          accessoryLeft={(props) => RenderItemImage({...{logoURL: item.logoURL}, ...props})}
                          accessoryRight={renderItemAccessory(accountColor(item.id))}
                      />
                  )}
                  />
          </ApplicationProvider>
      </View>       
  );
}

const stylesKitten = StyleSheet.create({
  container: {

    },
});

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  containerShape: {

  },
  CircleShape: {
      width: 10,
      height: 10,
      borderRadius: 10 / 2,
      backgroundColor: '#FF9800',
      marginTop: 10,
  },
  CircleShapeRed: {
      backgroundColor: 'red',
  },
  CircleShapeGreen: {
      backgroundColor: 'green',
  },
});

const stylesAvatar = StyleSheet.create({
  itemImage: {
    
  },
});
  
export default Accounts;