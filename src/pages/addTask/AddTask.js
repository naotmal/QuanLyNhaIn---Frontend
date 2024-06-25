import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectIsLoading, createTask } from '../../redux/features/task/TaskSlice'
import Loader from '../../components/loader/Loader'
import TaskForm from '../../components/task/taskForm/TaskForm'
import { getClient, getClients, selectClients } from '../../redux/features/client/clientSlice'
import {getMaterials, selectMaterials} from '../../redux/features/material/materialSlice'
import {createDelivery} from '../../redux/features/delivery/deliverySlice'

const initialState={
    name:"",
    clientId:"",
    progress:"1",
    priority:"2",
    quantity:"",
    unit:"",
    description:"",
    
}
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/tasks/`;


const AddTask = () => {
    const [task, setTask] = useState(initialState)
    const [description, setDescription] = useState("")
    const [materialId, setMaterialId] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLoading = useSelector(selectIsLoading)
    const clients = useSelector(selectClients) || []
    const materials = useSelector(selectMaterials) || []



    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setTask({...task, [name]:value})
    }
useEffect(()=>{
    dispatch(getClients())
    dispatch(getMaterials())
    
},[dispatch])
const handleMaterialChange = (e) =>{
    setMaterialId(e.target.value)
}

useEffect(() => {
    console.log("Fetched Clients: ", clients) // Debugging: Log the fetched clients
}, [clients])
   


    const saveTask = async (e) =>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("name", task.name)
        formData.append("progress", task.progress)
        formData.append("priority", task.priority)
        formData.append("clientId", task.clientId)
        formData.append("quantity", task.quantity)
        formData.append("unit", task.unit)
        formData.append("description", description)
        const result = await dispatch(createTask(formData))
        const taskId = result.payload?.id
        
        if(taskId && materialId){
            await dispatch(createDelivery({taskId, materialId}))
        }

    

    navigate("/show-task")


        
    }

  return (
    <div>
        {isLoading && <Loader/>}
        <h3 className="--mt">Add new task</h3>
        <TaskForm
        clients={clients}
        task={task}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saveTask={saveTask}
        />
        
    </div>
  )
}

export default AddTask