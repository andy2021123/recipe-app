import { v4 as uuid } from 'uuid'

export const encodeID = (uuid) => (
  Buffer
    .from(uuid.replace(/-/g, ''), 'hex')    
    .toString('base64url')
)

export const decodeID = (urlID) => (
  Buffer
    .from(urlID, 'base64url')
    .toString('hex')
    .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')
)


// // test
// const UUID = uuid()
// const urlID = encodeID(UUID)
// const convertedUUID = decodeID(urlID)

// console.log(UUID)
// console.log(urlID)
// console.log(convertedUUID)