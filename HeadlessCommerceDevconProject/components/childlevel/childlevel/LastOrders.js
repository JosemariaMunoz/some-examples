import React, { useState } from 'react';

import { apiRequest, logout } from '../../../common/services/liferay/api';

import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';


const LastOrders = (props) => { 

  const { idChannel, idAccount } = props;

  const [orders, setOrders] = useState('');
  const [cIdChannel, setCIdChannel] = useState('');

  
  const getLastOrders = async(idChannel, idAccount) => {
    console.log('/o/headless-commerce-delivery-order/v1.0/channels/'+idChannel+'/accounts/'+idAccount+'/placed-orders');
    return apiRequest('/o/headless-commerce-delivery-order/v1.0/channels/'+idChannel+'/accounts/'+idAccount+'/placed-orders', 
    {
      method: 'GET'
    }).then(res => {
      console.log("Get Account Detail Request");
      console.log(res);
      setOrders(res.items);
      setCIdChannel(idChannel);
    })
    .catch(async e => { await logout(); return false});
    
  }

  if(idChannel && idAccount && (orders==='' || idChannel!==cIdChannel)){
    getLastOrders(idChannel, idAccount);
  }

  if (!idChannel || !idAccount || orders.length==0) {
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
            {(orders).map((item, key) => (
                <View key={key} style={stylesLastOrders.innerContainer}>
                  <View style={stylesLastOrders.order}>
                    <Text style={stylesLastOrders.title}>Order Id.: {item.id}</Text>
                    <Text style={stylesLastOrders.count}>Total: {item.summary.totalFormatted}</Text>
                  </View>
                  <View
                    style={[
                      stylesLastOrders.orderStatus,
                      (item.orderStatusInfo.label_i18n==="Pending") && stylesLastOrders.orderStatusPending,
                      (item.orderStatusInfo.label_i18n==="Completed") && stylesLastOrders.orderStatusCompleted
                    ]}>
                    <Text 
                      style={[
                        stylesLastOrders.status,
                        (item.orderStatusInfo.label_i18n==="Pending") && stylesLastOrders.orderStatusPending,
                        (item.orderStatusInfo.label_i18n==="Completed") && stylesLastOrders.orderStatusCompleted
                      ]}
                    >{item.orderStatusInfo.label_i18n}</Text>
                  </View>
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
  },
  innerContainer:{  
    flex: 1,  
    flexDirection: "row",  
    justifyContent: "space-between",  
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#dadde1',  
    padding: 10,
  },  
  order: {
    flex: 0.7, 
  },
  orderStatus: {
    flex: 0.3,
    borderWidth: 1,
    borderColor: '#dadde1',
    alignItems: 'center',
    borderRadius: 5,
    padding: 4,
  },
  orderStatusPending: {
    color: '#2e5aac',
    borderColor: '#2e5aac',
  },
  orderStatusCompleted: {
    color: '#5aca75',
    borderColor: '#5aca75',
  },
  container: {
    flex: 1,
    paddingTop: 0,
  },
  contentContainer: {
    paddingVertical: 0,
  }
});

export default LastOrders;
