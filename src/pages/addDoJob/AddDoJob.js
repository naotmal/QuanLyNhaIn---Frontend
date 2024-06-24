import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createDoJob, selectIsLoading } from '../../redux/features/dojob/DoJobSlice'
import { getJobs, selectJobs } from '../../redux/features/job/JobSlice'
import { getSingleDelivery } from '../../redux/features/delivery/deliverySlice'
import DoJobForm from '../../components/dojob/DoJobForm'
import "./AddDoJob.scss"

const initialState={
    deliveryId: "",
    jobId: "",
}

const AddDoJob = () => {

    const [dojob, setDoJob] = useState(initialState)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading)

    const {jobId} = dojob
    
    const {id} = useParams()
    const deliveryId = String(id)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoJob({ ...dojob, [name]: value })
    }

    const jobs = useSelector(selectJobs) || []
    useEffect(()=>{
        dispatch(getJobs())
    },[jobs])

    useEffect(()=>{
        dispatch(getSingleDelivery(deliveryId))
    },[dispatch, deliveryId])

    const saveDoJob = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("jobId", jobId)
        

        await dispatch(createDoJob({deliveryId, formData}))
        console.log(formData);
        navigate(-1)
    }
    
  return (
    <div>
        <DoJobForm
        dojob={dojob}
        jobs={jobs}
        handleInputChange={handleInputChange}
        saveDoJob={saveDoJob}
        />
        
    </div>
  )
}

export default AddDoJob