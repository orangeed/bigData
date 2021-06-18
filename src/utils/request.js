import axios from 'axios'

const service = axios.create({
    // + process.env.VUE_APP_BASE_API
    baseURL: "http://127.0.0.1:18000" + process.env.VUE_APP_BASE_API, // url = base url + request url
    // baseURL: 'http://183.134.197.66:20002' + process.env.VUE_APP_BASE_API,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

service.interceptors.request.use(
    config => {

        // if (store.getters.token) {
        //   config.headers['Access-Token'] = getToken()
        // }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(

    response => {
        const res = response.data

        if (res.code !== 0) {
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug

        return Promise.reject(error)
    }
)

export default service