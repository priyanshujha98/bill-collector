import axios from "./instances/axiosInstance"

class BillService{
    createBillEntry = async (payload)=>{
        try {
            const response = await axios.post(`/create-billentry`, payload)
            return response
        } catch (error) {
            throw error
        }
    }

    getBill = async (payload)=>{
        try {
            const response = await axios.post(`/exit-entry`, payload)
            return response
        } catch (error) {
            throw error
        }
    }

    getAllBill = async (params)=>{
        try {
            const response = await axios.get(`/bills`, {params})
            return response
        } catch (error) {
            throw error
        }
    }
}

export default BillService
