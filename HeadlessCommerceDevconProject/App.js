import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Root from './components/Root';
import { navigationRef } from './common/util/AppNavigation';
import { loadingStore } from './common/state/store';

const App = () => {

  const [loading, setLoading] = useState(loadingStore.getState().loading);
  
  loadingStore.subscribe(() => setLoading(loadingStore.getState().loading));

  return (
    
    <NavigationContainer ref={navigationRef}>
        <Root
        />
        {loading &&
          <View style={styles.loading}>
              <ActivityIndicator size="large" />
          </View>
        }  
    </NavigationContainer> 
  );  
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    height: 800
  }
});

export default App;