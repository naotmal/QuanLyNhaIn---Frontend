import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createJob, selectIsLoading } from '../../redux/features/job/JobSlice'
import JobForm from '../../components/jobForm/JobForm'
import "./AddJob.scss"

const initialState={
    name: "",
    price: "",
    description:"",
}

const AddJob = () => {
    const [job, setJob] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [description, setDescription] = useState("")
    const isLoading = useSelector(selectIsLoading)

    const {name, price} = job

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setJob({...job, [name]: value})
    } 

    const saveJob = async(e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", price)
        formData.append("description", description)

        console.log(...formData)
        await dispatch(createJob(formData))

        navigate("/show-job")

    }
  return (
    <div>
        <h3 className="--mt">Add New Job</h3>
        <JobForm
            job={job}
            handleInputChange={handleInputChange}
            description={description}
            setDescription={setDescription}
            saveJob={saveJob}
        />
    </div>
  )
}

export default AddJob