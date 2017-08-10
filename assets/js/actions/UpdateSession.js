//define action within an action creator
function UpdateSession(id) {
  const UPDATE_SESSION = 'UPDATE_SESSION'
  return {
    type: UPDATE_SESSION,
    sessionID: id
  }
}

export default UpdateSession
