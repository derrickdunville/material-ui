import axios from 'axios'

const mockAxiosInstance = axios.create({
  baseURL: 'http://localhost/nock/api',
  withCredentials: true
})

export default mockAxiosInstance
