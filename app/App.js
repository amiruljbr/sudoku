import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import Game from './src/screens/Game.js';
import Finish from './src/screens/Finish.js';
import Home from './src/screens/Home.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Game" component={Game} />
          <Drawer.Screen name="Finish" component={Finish} />
        </Drawer.Navigator>
      </NavigationContainer>
      {/* <View style={styles.container}>
        <Game/>
        <StatusBar style="auto" />
      </View> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
