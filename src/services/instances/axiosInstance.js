import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`
})
instance.interceptors.request.use((config)=>{
    if(localStorage.getItem('AccessToken')){
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('AccessToken')}`
        config.headers['RefreshToken'] =  localStorage.getItem('RefreshToken')
    }
    return config;
})

instance.interceptors.response.use(
    (response)=>{
       
        if(response.headers.istokenrefreshed){
            
            localStorage.setItem('AccessToken',response.headers.accesstoken)
        }
        return response
    },
    (error)=>{
        throw error
    }
)

export default instance;