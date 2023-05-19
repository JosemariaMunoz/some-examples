import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView } from 'react-native';

import * as eva from '@eva-design/eva';
import { default as theme } from '../../../global/custom-theme.json';

import { apiRequest, logout } from '../../../common/services/liferay/api';
import { loginStore } from '../../../common/state/store';

import { ApplicationProvider, Avatar, Select, SelectItem} from '@ui-kitten/components';

import LastOrders from './LastOrders';
import LastShipments from './LastShipments';



const REACT_APP_API_PATH = 'http://192.168.1.183:8080';
//const REACT_APP_API_PATH = 'http://192.168.50.190:8080';
  
const AccountDetail = (props) => {

  const [name, setName] = useState('');
  const [logoURL, setLogoURL] = useState('');
  const { idAccount } = props.route.params;
  const [idChannel, setIdChannel] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [channelOptions, setChannelOptions] = useState([]);
  const [totalCurrentMonth, setTotalCurrentMonth] = useState(0);
  const [totalPastMonth, setTotalPastMonth] = useState(0);
  const [totalCurrentYear, setTotalCurrentYear] = useState(0);

  const checkLoggedIn = () => {
    if(!loginStore.getState().loggedIn){
      props.navigation.navigate('Accounts');
    }
  };

  const font = Platform.select({
    ios: 'GillSans-light',
    android: 'sans-serif-thin'
  });

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
  
  useEffect(() => {
    const getChannels = async() => {
      return apiRequest('/o/headless-commerce-admin-channel/v1.0/channels', 
      {
        method: 'GET'
      }).then(res => {
        console.log("Get Account Detail Request");
        console.log(res.items);
        let cChannelOptions = [];
        for (let ckey in res.items){
          let opt = {};
          opt.label = res.items[ckey].name;
          opt.value = res.items[ckey].id;
          console.log('value'+opt.value);
          cChannelOptions.push(opt);
        }
        setChannelOptions(cChannelOptions);
      })
      .catch(async e => { return false});
      
    }
    getChannels();
  }, []);

  useEffect(() => {
    const getAccountDetails = async(id) => {
        return apiRequest('/o/headless-commerce-admin-account/v1.0/accounts/'+id, 
        {
          method: 'GET'
        }).then(res => {
          console.log("getAccountDetails");
          console.log(res);
          setName(res.name);
          setLogoURL(res.logoURL);
        })
        .catch(async e => { await logout(); return false});
        
      }
      getAccountDetails(idAccount);
  }, []);

  useEffect(() => {
    const getTotals = async(idChannel, idAccount) => {
      console.log('getTotalCurrentMonth/o/headless-commerce-delivery-order/v1.0/channels/'+idChannel+'/accounts/'+idAccount+'/placed-orders');
      return apiRequest('/o/headless-commerce-delivery-order/v1.0/channels/'+idChannel+'/accounts/'+idAccount+'/placed-orders', 
      {
        method: 'GET'
      }).then(res => {
        console.log("getTotalCurrentMonth");
        console.log(res);
        let cTotalCurrentMonth = 0;
        let cTotalPastMonth = 0;
        let cTotalCurrentYear = 0;
        for (let ckey in res.items){
          let cTotal = res.items[ckey].summary.total;
          let modifiedDate = new Date(res.items[ckey].modifiedDate);
          let cDate = new Date();
          if(cDate.getMonth() == modifiedDate.getMonth() && cDate.getFullYear() == modifiedDate.getFullYear()) {
            cTotalCurrentMonth += cTotal;
          }
          if(cDate.getMonth()-1 == modifiedDate.getMonth() && cDate.getFullYear() == modifiedDate.getFullYear()) {
            cTotalPastMonth += cTotal;
          }
          if(cDate.getFullYear() == modifiedDate.getFullYear()) {
            cTotalCurrentYear += cTotal;
          }
        }
        setTotalCurrentMonth(cTotalCurrentMonth);
        setTotalPastMonth(cTotalPastMonth);
        setTotalCurrentYear(cTotalCurrentYear);
      })
      .catch(async e => {  return false});
      
    }
    getTotals(idChannel, idAccount);
  }, [selectedIndex]);

  function handleChannels(value) {
    setSelectedIndex(channelOptions[value.row].label);
    setIdChannel(channelOptions[value.row].value);       
  }
  

  if(!selectedIndex && channelOptions.length > 0) {
    let lastChannel = channelOptions.length -1;
    setSelectedIndex(channelOptions[lastChannel].label);
    handleChannels({'row': lastChannel});
  }

  return (
    <>
      <SafeAreaView style={stylesGlobal.containerSA}>
        <ScrollView style={stylesGlobal.scrollView}>
          <View style={stylesGlobal.container}>
            <View style={stylesGlobal.header}>
              <View style={stylesGlobal.headerContent}>
                <Image
                  style={stylesGlobal.avatar}
                  source={{ uri: REACT_APP_API_PATH + logoURL }}
                />
                <Text style={[stylesGlobal.name, { fontFamily: font }]}>{name}</Text>
              </View>
            </View>
            <View style={stylesGlobal.profileDetail}>
              <View style={stylesGlobal.detailContent}>
                <Text style={stylesGlobal.title}>Total /{'\n'}Current Month</Text>
                <Text style={stylesGlobal.count}>{totalCurrentMonth}$</Text>
              </View>
              <View style={stylesGlobal.detailContent}>
                <Text style={stylesGlobal.title}>Total /{'\n'}Last Month</Text>
                <Text style={stylesGlobal.count}>{totalPastMonth}$</Text>
              </View>
              <View style={stylesGlobal.detailContent}>
                <Text style={stylesGlobal.title}>Total{'\n'}Current Year</Text>
                <Text style={stylesGlobal.count}>{totalCurrentYear}$</Text>
              </View>
            </View>
            <View style={stylesGlobal.selector}>
              <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                <Select label='Select Channel'
                    style={stylesGlobal.selector}
                    value={selectedIndex}
                    onSelect={index => handleChannels(index)}
                  >
                  {Object.entries(channelOptions).map(([key, obj], index) => { return (
                      <SelectItem key={obj.value} title={obj.label} />
                  )})}
                </Select>
              </ApplicationProvider>
            </View>
            <View style={stylesGlobal.selector}>
              <Text style={[stylesGlobal.sectionTitle, { fontFamily: font }]}>Last Orders</Text>
            </View>
            <View style={stylesGlobal.orders}>               
                <LastOrders idChannel={idChannel} idAccount={idAccount}/>                
            </View>
            <View style={stylesGlobal.selector}>
              <Text style={[stylesGlobal.sectionTitle, { fontFamily: font }]}>Last Shipments</Text>
            </View>
            <View style={stylesGlobal.orders}>                
              <LastShipments idChannel={idChannel} idAccount={idAccount}/>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>       
  );
}

const stylesKitten = StyleSheet.create({
  container: {
    maxHeight: 192,
  },
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 25,
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
    elevation: 5,
  },
  button: {
    marginTop: 25,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  }
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
});

const stylesText = StyleSheet.create({
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  title: {
    marginHorizontal: 8,
  },
  installButton: {
    marginVertical: 4,
  },
});

const stylesHeading = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 32,
    marginTop: 0,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 160,
    height: 160,
    marginTop: 10,
    left: '30%',
    marginBottom: 0,
  },
  selector: {
    fontSize: 32,
  },
});

const stylesAvatar = StyleSheet.create({
  itemImage: {
    
  },
});

const stylesGlobal = StyleSheet.create({
  header: {
    backgroundColor: '#0d63ce',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 10,
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 220,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    color: '#0d63ce',
    maxWidth: 140,
    textAlign: "center",
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    marginTop: 40,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00CED1',
  },
  description: {
    fontSize: 20,
    color: '#00CED1',
    marginTop: 10,
    textAlign: 'center',
  },
  selector: {
    marginTop: 30,
    marginLeft:5,
    marginRight:5,
  },
  orders: {
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 25,
    marginTop: 0,
    marginBottom: 10,
    marginLeft:5,
    fontWeight: 'bold',
  },
  containerSA: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
    marginLeft: 0,
    marginRight: 0,
  },
})

export default AccountDetail;