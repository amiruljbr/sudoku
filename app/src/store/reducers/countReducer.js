const initialState = {
  counter: 300,
}

function userReducer (state = initialState, action) {
  switch (action.type) {
    case 'SET_COUNTER':
      return {
        ...state,
        counter: action.payload.time
      }
    default:
      return state
  }
}

export default userReducer;