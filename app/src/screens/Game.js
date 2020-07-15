import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { getBoard, solve, validate } from '../store/actions/boardAction.js';
import CountDown from 'react-native-countdown-component';

export default function Game({navigation}) {
  const dispatch = useDispatch();
  const {board, status, solutionBoard} = useSelector(state => state.boardReducer);
  const {user, level} = useSelector(state => state.userReducer);
  const [playingBoard, setPlayingBoard] = useState([]);
  let countDownTime = getCountDownTime();

  function getCountDownTime() {
    switch (level) {
      case 'easy':
        return 300;
      case 'medium':
        return 600;
      case 'hard':
        return 900;
      default:
        return 600;
    }
  }

  useEffect(() => {
    dispatch(getBoard(level));
  }, [dispatch, user, level])

  useEffect(() => {
    setPlayingBoard(JSON.parse(JSON.stringify(solutionBoard)));
  }, [solutionBoard])

  useEffect(() => {
    if(status=='solved') {
      navigation.navigate('Finish');
    }
  }, [status])

  function getSolve() {
    Alert.alert('Sudoku Solved!')
    dispatch(solve(board))    
  }

  function resetBoard() {
    Alert.alert('Board Reset!')
    dispatch(getBoard(level));   
  }

  function validateBoard() {
    dispatch(validate(playingBoard));
       
  }

  function updateBoard(row, col, value) {
    let newBoard = JSON.parse(JSON.stringify(playingBoard));
    newBoard[row][col] = Number(value);
    setPlayingBoard(newBoard);
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.container}>
        <CountDown
          until={countDownTime}
          onFinish={() => {Alert.alert('Finish, You Failed!');navigation.navigate('Home');}}
          size={20}
          timeToShow={['M', 'S']}
          timeLabels={{m: 'MM', s: 'SS'}}
        />
        <View>
          <Text>Username: {user}</Text>
          <Text>Level: {level}</Text>
          <Text>Status: {status}</Text>
        </View>
      
        { playingBoard.map((row, i)=>{
          return(
            <View key={i} style={styles.row}>
              {row.map((col, j)=>{
                return (
                  <View key={j} style={board[i][j]==0? styles.col: styles.input}>
                    {board[i][j]==0? <TextInput editable keyboardType='numeric' value={col==0? ' ': String(col)} onChangeText={(value) => updateBoard(i , j, value)}></TextInput> : <Text>{col}</Text>}      
                  </View>
                )
              })}
            </View>
          );
            })}
          <View style={styles.button}>
            <Button
              onPress={validateBoard}
              title="Submit"
              color="green"
            />
            
            <Button
              onPress={resetBoard}
              title="Reset Board"
              color=""
            />

            <Button
              onPress={getSolve}
              title="Solve Sudoku"
              color="#841584"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    borderWidth: 2,
    width: (width - 40)/9,
    height: (width - 40)/9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
  input: {
    borderWidth: 2,
    width: (width - 40)/9,
    height: (width - 40)/9,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 10
  }
});
