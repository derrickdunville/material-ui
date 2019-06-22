import thunk from 'redux-thunk'
import mockAxiosInstance from './mockAxiosInstance'
import configureMockStore from 'redux-mock-store'

const middlewares = [thunk.withExtraArgument(mockAxiosInstance)]
const mockStore = configureMockStore(middlewares)

export default mockStore
