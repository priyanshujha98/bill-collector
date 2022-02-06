import axios from "./instances/axiosInstance"

class LoginService{
    getLogin = async (payload)=>{
        try {
            const response = await axios.post(`/sign-in`, payload)
            return response
        } catch (error) {
            throw error
        }
    }

    getUserProfile = async (payload)=>{
        try {
            const response = await axios.post(`/profile`, payload)
            return response
        } catch (error) {
            throw error
        }
    }

    verifyCode = async(payload)=>{
        try {
            const response = await axios.post(`/verify-code`, payload)
            return response
        } catch (error) {
            throw error
        }
    }

    confirmCodeVerify = async(payload)=>{
        try {
            const response = await axios.post(`/forgot-password`, payload)
            return response
        } catch (error) {
            throw error
        }
    }

    emailSent = async (payload)=>{
        try {
            const response = await axios.post(`/confirm-password`, payload)
            return response
        } catch (error) {
            throw error
        }
    }
}

export default LoginService