import React, { useEffect, useState } from 'react'
import ClientForm from '../../../components/clientForm/ClientForm'
import { createClient, getClient, selectClient, selectIsLoading, updateClient } from '../../../redux/features/client/clientSlice'
import { useDispatch, useSelector } from "react-redux"
import {useNavigate, useParams} from "react-router-dom"
import { selectName } from '../../../redux/features/material/materialSlice'

const initialState={
    name: "",
    email: "",
    phone: "",
    address: "",
}

const EditClient = () => {
    const clientEdit = useSelector(selectClient)
    const [client, setClient] = useState(clientEdit)
    const {id} = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate()

const isLoading = useSelector(selectIsLoading)

const name = useSelector(selectName)

useEffect(()=>{
    dispatch(getClient(id))
},[dispatch, id])

useEffect(()=>{
    setClient(clientEdit)
},[clientEdit])


const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setClient({...client, [name]: value})
} 

const saveClient = async (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", client?.name)
    formData.append("email", client?.email)
    formData.append("phone", client?.phone)
    formData.append("address", client?.address)

    console.log(...formData);

    await dispatch(updateClient({id, formData}))
    await dispatch(getClient(id))

    navigate("/show-client")
}

  return (<div>

    <h3 className="--mt">Edit Client</h3>
    <ClientForm
    client= {client}
    handleInputChange={handleInputChange}
    saveClient={saveClient}
    />
  </div>)
}
export default EditClient