import axios from 'axios'
export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  timeout: 10000,
  params:{
    token:'ccgsuk2ad3i4bkk4q6i0'
  }  
  // headers: {'X-Custom-Header': 'foobar'}
});