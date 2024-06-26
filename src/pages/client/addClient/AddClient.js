import React, { useState } from 'react'
import ClientForm from '../../../components/clientForm/ClientForm'
import { createClient, selectIsLoading } from '../../../redux/features/client/clientSlice'
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"

const initialState={
    name: "",
    email: "",
    phone: "",
    address: "",
}

const AddClient = () => {
    const [client, setClient] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
const isLoading = useSelector(selectIsLoading)

const {name, email, phone, address} = client

const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setClient({...client, [name]: value})
} 

const genterateSKU = (name) => {
  const words = name.trim().split(/\s+/).filter(word => word.length > 0);
  const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
  const number = Date.now()
  const sku = initials + "-" + number
  return sku;
}

const saveClient = async (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("sku", genterateSKU(name))
    formData.append("address", address)

    console.log(...formData);

    await dispatch(createClient(formData))

    navigate("/show-client")
}

  return (<div>

    <h3 className="--mt">Add New Client</h3>
    <ClientForm
    client= {client}
    handleInputChange={handleInputChange}
    saveClient={saveClient}
    />
  </div>)
}
export default AddClient