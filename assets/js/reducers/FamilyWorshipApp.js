//define the initial state
const initialState = {
  status: "",
  error: "",
  authenticated: false,
  id: "",
  familyID: "",
  sessionID: ""
}

//define a reducer with an intitalized state and logic to handle action
function FamilyWorshipApp(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_REQUEST':
      const requested = Object.assign({}, state, {
        status: action.status
      })
      return requested
    case 'FETCH_SUCCESS':
      const successful = Object.assign({}, state, {
        status: action.status
      })
      return successful
    case 'FETCH_FAILURE':
      const failed = Object.assign({}, state, {
        status: action.status,
        error: action.error
      })
      return failed
    case 'AUTHENTICATE_USER':
      const authenticated = Object.assign({}, state, {
        authenticated: action.authenticated
      })
      return authenticated
    case 'STORE_ID':
      const id = Object.assign({}, state, {
        id: action.id
      })
      return id
    case 'STORE_FAMILY_ID':
      const familyID = Object.assign({}, state, {
        familyID: action.familyID
      })
      return familyID
    case 'UPDATE_SESSION':
      const sessionID = Object.assign({}, state, {
        sessionID: action.sessionID
      })
      return sessionID
    default:
      return state
  }
}

export default FamilyWorshipApp
