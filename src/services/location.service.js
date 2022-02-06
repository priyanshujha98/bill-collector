import axios from "./instances/axiosInstance"

class LocationService{
    getAllLocation = async ()=>{
        try {
            const response = await axios.get(`/get-locations`)
            return response
        } catch (error) {
            throw error
        }
    }

    createLocations = async (payload) => {
        try {
            const response = await axios.post(`/create-location`, payload)
            return response
        } catch (error) {
            throw error
        }
    }

    updateLocations = async (payload) => {
        try {
            const response = await axios.put(`/update-locations`, payload)
            return response
        } catch (error) {
            throw error
        }
    }
}

export default LocationService
