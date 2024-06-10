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
const getReceipt = async (id) =>{
    const response = await axios(API_URL + id,{
        method: "get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    
    return response.data;
}

const receiptService = {
    createReceipt,
    getReceipt,
}

export default receiptService