export function setCountDown (time) {
  return (dispatch) => {
    dispatch({
      type: 'SET_COUNTER',
      payload: {
        time
      }
    })
  }
}

