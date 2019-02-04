import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducers from './reducers'
import axios from 'axios'

export default (req) => {
  console.log("in create store")
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3001',
    headers: { cookie: req.get('cookie') || ''},
    withCredentials: true
  })
  const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

  return store;
};
