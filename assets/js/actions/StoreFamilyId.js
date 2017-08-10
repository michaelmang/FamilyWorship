//define action within an action creator
function StoreFamilyId(id) {
  const STORE_FAMILY_ID = 'STORE_FAMILY_ID'
  return {
    type: `STORE_FAMILY_ID`,
    familyID: id
  }
}

export default StoreFamilyId
