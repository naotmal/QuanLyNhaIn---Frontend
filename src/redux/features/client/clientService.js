import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/clients/`;

// create new client
const createClient = async (formData) => {
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

//Get all clients
const getClients = async()=>{
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

//Get client
const getClient = async(id)=>{
    const response = await axios(`${API_URL}${id}`,{
        method:"get"
    })
    return response.data
  }

  //Get client by sku
const getClientSKU = async(sku)=>{
    const response = await axios(`${API_URL}client/${sku}`,{
        method:"get"
    })
    return response.data
  }

//Delete client
const deleteClient = async (id)=>{
    const response = await axios(`${API_URL}${id}`,{
        method:"delete"
    })
    return response.data
  }

  //update client
  const updateClient = async(id, formData) =>{
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
const clientService = {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient,
    getClientSKU,
}

export default clientService;