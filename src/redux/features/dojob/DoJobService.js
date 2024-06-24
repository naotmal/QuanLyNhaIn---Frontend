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

//get single do job
const getDoJob = async (id)=>{
    const response = await axios(`${API_URL}single/${id}`,{
        method:"get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    return response.data
}

//get all do jobs by task
const getDoJobsbyTask = async (taskId)=>{
    const response = await axios(`${API_URL}task/${taskId}`,{
        method:"get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    return response.data
}

//delete do job
const deleteDoJob = async (id)=>{
    const response = await axios(`${API_URL}${id}`,{
        method:"delete",
        
    })
    return response.data
}

//update do job
const updateDoJob = async (id, formData) =>{
    const response = await axios(`${API_URL}${id}`,{
        method:"patch",
        data: formData,
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
    getDoJob,
    getDoJobsbyTask,
    deleteDoJob, 
    updateDoJob,
}

export default dojobService