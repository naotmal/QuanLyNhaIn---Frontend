import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createDoJob, getDoJob, getDoJobs, selectDoJob, selectIsLoading, updateDoJob } from '../../redux/features/dojob/DoJobSlice'
import { getJobs, selectJobs } from '../../redux/features/job/JobSlice'
import { getDeliverybyTask, getSingleDelivery } from '../../redux/features/delivery/deliverySlice'
import DoJobForm from '../../components/dojob/DoJobForm'
import "./EditDoJob.scss"
import DoJobFormEdit from '../../components/dojob/DoJobFormEdit'

const initialState = {
    deliveryId: "",
    jobId: "",
}

const EditDoJob = () => {
    const dojobEdit = useSelector(selectDoJob)
    const { id } = useParams()
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading)

    const [dojob, setDoJob] = useState(dojobEdit)


    


    

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoJob({ ...dojob, [name]: value })
    }

    const jobs = useSelector(selectJobs) || []
    useEffect(() => {
        dispatch(getJobs())
    }, [jobs])

  
    useEffect(() => {
        dispatch(getDoJob(id))
    }, [dispatch, id])
    
    useEffect(() => {
        setDoJob(dojobEdit)
    }, [dojobEdit])



    const saveDoJob = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("jobId", dojob.jobId)


        console.log(...formData);
        await dispatch(updateDoJob({ id, formData }))
        await dispatch(getDoJob(id))
        
        navigate(-1)
    }

    return (
        <div>
            <DoJobFormEdit
                dojob={dojob}
                jobs={jobs}
                handleInputChange={handleInputChange}
                saveDoJob={saveDoJob}
            />

        </div>
    )
}

export default EditDoJob