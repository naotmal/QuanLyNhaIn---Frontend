import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/job/`;

//create new job
const createJob = async (formData) =>{
    const response = await axios(API_URL,{
        method: "post",
        data: formData,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    return response.data
}

//Get all jobs
const getJobs = async()=>{
    const response = await axios(API_URL,{
        method:"get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    return response.data
    console.log(response.data);
}

//Delete job
const deleteJob = async (id)=>{
    const response = await axios(`${API_URL}${id}`,{
        method:"delete"
    })
    return response.data
  }

  //update job
  const updateJob = async(id, formData) =>{
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

  //get job
  const getJob = async(id)=>{
    const response = await axios(`${API_URL}${id}`,{
        method:"get"
    })
    return response.data
  }
const jobService = {
    createJob,
    getJobs,
    getJob,
    deleteJob,
    updateJob,
}

export default jobService