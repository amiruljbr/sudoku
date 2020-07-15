export function postUser (user) {
  return (dispatch) => {
    dispatch({
      type: 'INPUT_USER',
      payload: {
        user: user.name,
        level: user.level
      }
    })
  }
}

