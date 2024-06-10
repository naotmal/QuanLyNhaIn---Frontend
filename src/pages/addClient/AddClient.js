import React, { useState } from 'react'
import ClientForm from '../../components/clientForm/ClientForm'
import { createClient, selectIsLoading } from '../../redux/features/client/clientSlice'
import { useDispatch, useSelector } from "react-redux"

const initialState={
    name: "",
    email: "",
    phone: "",
    address: "",
}

const AddClient = () => {
    const [client, setClient] = useState(initialState)
    const dispatch = useDispatch()
    
const isLoading = useSelector(selectIsLoading)

const {name, email, phone, address} = client

const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setClient({...client, [name]: value})
} 

const saveClient = async (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("address", address)

    console.log(...formData);

    await dispatch(createClient(formData))

    
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