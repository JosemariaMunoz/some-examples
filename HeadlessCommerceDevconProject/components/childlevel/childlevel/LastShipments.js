import React, { useState } from 'react';

import { apiRequest, logout } from '../../../common/services/liferay/api';

import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

const LastShipments = (props) => { 

  const { idChannel, idAccount } = props;

  const [shipments, setShipments] = useState('');
  const [sCheck, setScheck] = useState('0');

  
  const getLastShipments = async(idChannel, idAccount) => {
    console.log('/o/headless-commerce-admin-shipment/v1.0/shipments');
    return apiRequest('Sales Rep ', 
    {
      method: 'GET'
    }).then(res => {
      console.log("getLastShipments");
      console.log(res);
      let cShipments = [];
      for (let ckey in res.items){
        console.log(idAccount);
        console.log(res.items[ckey].accountId);
        if(idAccount == res.items[ckey].accountId ) {
          cShipments.push(res.items[ckey]);
        }
      }
      setShipments(cShipments);
      setScheck('1');
    })
    .catch(async e => {return false});    
  }

  if(idAccount && shipments.length==0 && sCheck==0){
    getLastShipments(idChannel, idAccount);
  }

  if (!idAccount || shipments.length==0) {
    return (
      <>
        <Text style={stylesLastOrders.message}>
            Nothing to show
        </Text>
      </>
    );
  }

  return ( 
    <>
      <View style={stylesLastOrders.profileDetail}>
        <SafeAreaView style={stylesLastOrders.container}>
          <ScrollView horizontal={false} contentContainerStyle={stylesLastOrders.contentContainer}>
            {(shipments).map((item, key) => (
                  <View key={key} style={stylesLastOrders.order}>
                    <Text style={stylesLastOrders.title}>Shipment Id.: {item.id}</Text>
                    <Text style={stylesLastOrders.count}>TrackingNumber: {item.trackingNumber}</Text>
                  </View>
              ))}
          </ScrollView> 
        </SafeAreaView>     
      </View>     
    </>
  );
}

const stylesLastOrders = StyleSheet.create({
  message: {
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 25,
    marginVertical: 25,
    marginBottom: 50,
    fontSize: 20,
    alignItems: 'center',
    color: 'orange',
  },
  title: {
    color: "#000000",
  },
  count: {
    color: "#9fa6ad",
  },
  profileDetail: {
    flex: 1,
    margin: 0,
    backgroundColor: '#ffffff',
    marginBottom: 30,
  },
  order: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dadde1',
  },
  container: {
    flex: 1,
    paddingTop: 0,
  },
  contentContainer: {
    paddingVertical: 0,
  }
});

export default LastShipments;
