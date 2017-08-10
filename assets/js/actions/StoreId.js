//define action within an action creator
function StoreId(id) {
  const STORE_ID = 'STORE_ID'
  return {
    type: `STORE_ID`,
    id: id
  }
}

export default StoreId
