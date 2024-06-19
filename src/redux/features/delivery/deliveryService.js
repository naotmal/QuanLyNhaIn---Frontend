import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/delivery/`;

// create new delivery
const createDelivery = async (taskId, formData) =>{
    const response = await axios(`${API_URL}${taskId}`,{
        method:"post",
        data: formData,
       headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    return response.data
}

// Get delivery by material
const getDeliverybyMaterial = async (materialId) =>{
    const response = await axios(`${API_URL}material/${materialId}`,{
        method:"get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    return response.data
}

// Get delivery by task
const getDeliverybyTask = async (taskId) =>{
    const response = await axios(`${API_URL}task/${taskId}`,{
        method:"get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    return response.data
}
//Get single delivery
const getSingleDelivery = async(id)=>{
    const response = await axios(`${API_URL}${id}`,{
        method: "get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    return response.data
}


//delete delivery
const deleteDelivery = async(id)=>{
    const response = await axios(`${API_URL}${id}`,{
        method:"delete"
    })
    return response.data
}

//Update delivery
const updateDelivery = async (id, formData) =>{
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

  //Get all deliveries
  const getDeliveries = async () => {
    const response = await axios(API_URL,{
        method:"get",
        
    });
    return response.data
  };
  

const deliveryService = {
    createDelivery,
    getDeliverybyMaterial,
    getDeliverybyTask,
    deleteDelivery,
    updateDelivery,
    getSingleDelivery,
    getDeliveries
}

export default deliveryService