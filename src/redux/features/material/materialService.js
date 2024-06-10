import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/materials/`;


// Create New Material
const createMaterial = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all materials
const getMaterials = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Material
const deleteMaterial = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Material
const getMaterial = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Material
const updateMaterial = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};



const materialService = {
  createMaterial,
  getMaterials,
  getMaterial,
  deleteMaterial,
  updateMaterial,

};

export default materialService;