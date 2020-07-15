const initialState = {
  user: 'unknown user',
  level: 'random',
}

function userReducer (state = initialState, action) {
  switch (action.type) {
    case 'INPUT_USER':
      return {
        ...state,
        user: action.payload.user,
        level: action.payload.level
      }
    default:
      return state
  }
}

export default userReducer;