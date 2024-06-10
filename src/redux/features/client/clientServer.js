import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/clients/`;

// create new client
const createClient = async (FormData) => {
    const response = await axios(API_URL,{
        method: "post",
        data: FormData,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    return response.data
}



const clientService = {
    createClient,
}

export default clientService;