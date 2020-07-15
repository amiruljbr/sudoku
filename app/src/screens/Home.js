import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput,  Picker, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { postUser } from '../store/actions/userAction.js';

export default function Home({navigation}) {
  const [text, setText] = useState('');
  const [level, setLevel] = useState('easy');
  const dispatch = useDispatch();

  function start() {
    if(text.length<1) {
      Alert.alert('You must input your name')
    } else {
      dispatch(postUser({name: text, level}));
      navigation.navigate('Game');
    }
  }

  return (
    <View style={styles.container}>
      <Text>Input Name!</Text>
      <TextInput
        style={styles.inputName}
        placeholder="Please Input your name"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text>Select Level!</Text>
      <Picker
        selectedValue={level}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setLevel(itemValue)}
      >
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
        <Picker.Item label="Random" value="random" />
      </Picker>
      <Button
        onPress={start}
        title="Start Game!!!!"
        color="green"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputName: {
    borderWidth: 1,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    borderColor: 'black'
  }
});
