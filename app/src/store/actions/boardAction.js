import { Alert } from 'react-native';

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export function getBoard(level) {
  return async (dispatch) => {
    const res = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`);
    const data = await res.json();
    dispatch({
      type: 'GET_BOARD',
      payload: data.board
    })
  }
}

export function solve(board) {
  return async (dispatch) => {
    const res = await fetch('https://sugoku.herokuapp.com/solve', {
      method: 'post',
      body: encodeParams({board:board}),
      headers: {
        // 'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await res.json();
    dispatch({
      type: 'SOLVE',
      payload: data.solution
    })
  }
}

export function validate(board) {
  return async (dispatch) => {
    const res = await fetch('https://sugoku.herokuapp.com/validate', {
      method: 'post',
      body: encodeParams({board:board}),
      headers: {
        // 'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await res.json();
    if(data.status=='broken') {
      Alert.alert('You Wrong!')
    } else if(data.status=='unsolved') {
      Alert.alert('Nothing Wrong! Keep Going!')
    }
    dispatch({
      type: 'VALIDATE',
      payload: data
    })
  }
}

