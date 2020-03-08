import axios from 'axios'
const baseConfig = {
  baseURL:"http://123.207.32.32:8000",
  timeout:5000
}

export function request(config) {
  const instance = axios.create(baseConfig)
  instance.interceptors.response.use(data=>{
    return data.data
  },err=>{
    console.log(err)
  })
  return instance(config)
}
