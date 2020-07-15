import React, { useEffect } from 'react'
import { StyleSheet, View, Text, AppRegistry, Image, Dimensions, Button } from 'react-native';
import { postUser } from '../store/actions/userAction.js';
import { useSelector, useDispatch } from 'react-redux';

export default function Finish({navigation}) {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);

  function backToHome() {
    dispatch(postUser({name: '', level: 'easy'}));
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.gif}
        source={{uri: 'https://media0.giphy.com/media/xUOxf0akiVBK6R8jGU/giphy.gif'}}
      />
      <Text>Congratulation, {user}</Text>
      <Button
        onPress={backToHome}
        title="Try Again!"
      />
    </View>
  )
}

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: width-10,
    height: width-10
  }
});

AppRegistry.registerComponent(
  'DisplayAnImageWithStyle',
  () => DisplayAnImageWithStyle
);