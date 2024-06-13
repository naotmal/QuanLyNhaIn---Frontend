import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/tasks/`;

//create task
const createTask = async (formData) =>{
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

//Delete task
const deleteTask = async (id)=>{
    const response = await axios(`${API_URL}${id}`,{
        method:"delete"
    })
    return response.data
  }

  //Get all tasks
const getTasks = async()=>{
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

//Get a task
const getTask = async(id) =>{
    const response = await axios(`${API_URL}${id}`,{
        method:"get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    return response.data
}

//update task
const updateTask = async (id, formData) =>{
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

const taskService ={
    createTask,
    deleteTask,
    getTasks,
    getTask,
    updateTask,
}

export default taskService;

