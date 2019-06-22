import { initialState } from '../../src/reducers/usersReducer'

const mockUserData =
  {
    docs: [
      {
        "_id": "5ca0a2198b782f09b2cabb0e",
        "username": "testUser",
        "email": "testUser@test.com"
      }
    ]
  }

const loadedState = {
  ...initialState,
  loaded: true,
  total: 1,
  user: {...mockUserData.docs[0]},
  docs: [...mockUserData.docs]
}

const mockNewUser = {
  "_id": "5ca0a2198b782f09b2cabb01",
  "username": "newUser",
  "email": "newUser@test.com"
}

export {
  mockUserData, loadedState, mockNewUser
}
