import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/dojob/`;

//create new do job
const createDoJob = async (deliveryId, formData)=>{
    const response = await axios(`${API_URL}${deliveryId}`,{
        method:"post",
        data: formData,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    return response.data
}

//get all do jobs
const getDoJobs = async ()=>{
    const response = await axios(`${API_URL}`,{
        method:"get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    return response.data
}

const dojobService = {
    createDoJob,
    getDoJobs,
}

export default dojobService