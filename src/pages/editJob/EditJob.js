import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createJob, getJob, selectIsLoading, selectJob, updateJob } from '../../redux/features/job/JobSlice'
import JobForm from '../../components/jobForm/JobForm'
import { AdminLink } from '../../components/protect/hiddenLink'


const initialState={
    name: "",
    price: "",
    description:"",
}

const EditJob = () => {
    const jobEdit = useSelector(selectJob)
    const [job, setJob] = useState(jobEdit)
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [description, setDescription] = useState("")
    const isLoading = useSelector(selectIsLoading)

   

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setJob({...job, [name]: value})
    } 

    useEffect(()=>{
        dispatch(getJob(id))
    },[dispatch, id])

    useEffect(()=>{
        setJob(jobEdit)
        setDescription(
            jobEdit && jobEdit.description ? jobEdit.description : ""
        )
    },[jobEdit])

    const saveJob = async(e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", job?.name)
        formData.append("price", job?.price)
        formData.append("description", description)

        console.log(...formData)
        await dispatch(updateJob({id, formData}))
        await dispatch(getJob(id))

        navigate("/show-job")

    }
  return (
    <div>
        <AdminLink>
        <h3 className="--mt">Edit New Job</h3>
        <JobForm
            job={job}
            handleInputChange={handleInputChange}
            description={description}
            setDescription={setDescription}
            saveJob={saveJob}
        />
        </AdminLink>
    </div>
  )
}

export default EditJob