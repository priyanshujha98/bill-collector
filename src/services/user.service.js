import axios from "./instances/axiosInstance"


class UserService{
    getUserList = async (searchKey, pageNo, sort="", sortBy="", limit, conditions)=>{
        
        try {
            const response = axios.get(`/users?searchKey=${searchKey}&page=${pageNo}&sort=${sort}&sortBy=${sortBy}&limit=${limit}`)
            return response
        } catch (error) {
            throw error
        }
    }

    updateAdminById = async (id, payload) => {
        try {
            const response = axios.put(`/admin/${id}`,payload)
            return response
        } catch (error) {
            throw error
        }
    }

    deleteAdminById = async (id) => {
        try {
            const response = axios.delete(`/user/${id}`)
            return response
        } catch (error) {
            throw error
        }
    }

    addAdmin = async (payload) => {
        try {
            const response = axios.post(`/sign-up`, payload)
            return response
        } catch (error) {
            throw error
        }
    }

    getAdminById = async (id) => {
        try {
            const response = axios.get(`/admin/${id}`)
            return response
        } catch (error) {
            throw error
        }
    }
}

export default UserService