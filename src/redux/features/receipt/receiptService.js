import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/receipt/`;

// Create new receipt
const createReceipt = async (materialId, formData) =>{
    const response = await axios(`${API_URL}${materialId}`,{
        method: "post",
        data: formData,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    
    return response.data;
}

// get receipt
const getReceipt = async (materialId) =>{
    const response = await axios(`${API_URL}${materialId}`,{
        method: "get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    console.log('Fetching receipts for materialId:', materialId); // Log fetching details
    
    return response.data;
}

//Get single receipt
const getSingleReceipt = async(id)=>{
    const response = await axios(`${API_URL}single/${id}`,{
        method: "get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    return response.data
}

// Get all receipts
const getReceipts = async () => {
    const response = await axios(API_URL,{
        method:"get",
        
    });
    return response.data
  };

  //Update receipt
  const updateReceipt = async (id, formData) =>{
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

  //Delete receipt
  const deleteReceipt = async (id)=>{
    const response = await axios(`${API_URL}${id}`,{
        method:"delete"
    })
    return response.data
  }

const receiptService = {
    createReceipt,
    getReceipt,
    getReceipts,
    updateReceipt,
    getSingleReceipt,
    deleteReceipt,
}

export default receiptService