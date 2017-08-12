//define action within an action creator
function AuthenticateUser() {
  const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
  return {
    type: AUTHENTICATE_USER,
    authenticated: true
  }
}

export default AuthenticateUser
