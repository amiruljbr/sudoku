const initialState = {
  board: [],
  status: 'unsolved',
  solutionBoard: [],
}

function boardReducer (state = initialState, action) {
  switch (action.type) {
    case 'GET_BOARD':
      return {
        ...state,
        board: action.payload,
        solutionBoard: action.payload,
        status: 'unsolved'
      }
    case 'SOLVE':
      return {
        ...state,
        solutionBoard: action.payload,
        status: 'solved by button solved'
      }
    case 'VALIDATE':
      return {
        ...state,
        status: action.payload.status
      }
    default:
      return state
  }
}

export default boardReducer;