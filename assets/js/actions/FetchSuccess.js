//define action within an action creator
function FetchSuccess() {
  const FETCH_SUCCESS = 'FETCH_SUCCESS'
  return {
    type: FETCH_SUCCESS,
    status: "success"
  }
}

export default FetchSuccess
