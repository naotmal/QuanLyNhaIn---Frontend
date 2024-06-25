import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectIsLoading, createTask, selectTask, getTask, updateTask, getTasks } from '../../redux/features/task/TaskSlice'
import Loader from '../../components/loader/Loader'
import TaskForm from '../../components/task/taskForm/TaskForm'
import { getClients, selectClients } from '../../redux/features/client/clientSlice'

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


const EditTask = () => {
    const taskEdit = useSelector(selectTask)
    const{id} = useParams()

    const [task, setTask] = useState(initialState)
    const [description, setDescription] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLoading = useSelector(selectIsLoading)
    const clients = useSelector(selectClients) || []

useEffect(()=>{
    dispatch(getTask(id))
},[dispatch, id])

useEffect(()=>{
    setTask(taskEdit)
    setDescription(
        taskEdit && taskEdit.description? taskEdit.description:""
    )
},[taskEdit])

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setTask(prevTask=>({...task, [name]:value}))
    }
useEffect(()=>{
    dispatch(getClients())
    
},[dispatch])
useEffect(() => {
    console.log("Fetched Clients: ", clients) // Debugging: Log the fetched clients
}, [clients])
   

    const saveTask = async (e) =>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("name", task?.name)
        formData.append("progress", task?.progress)
        formData.append("priority", task?.priority)
        formData.append("clientId", task?.clientId)
        formData.append("quantity", task?.quantity)
        formData.append("unit", task?.unit)
        formData.append("description", description)

      

    
    await dispatch(updateTask({id, formData}))
    await dispatch(getTasks())
    navigate("/show-task")


        
    }

  return (
    <div>
        {isLoading && <Loader/>}
        <h3 className="--mt">Edit task</h3>
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

export default EditTask