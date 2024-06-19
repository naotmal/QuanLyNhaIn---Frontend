import React, { useEffect } from 'react'
import DeliveryForm from '../../../components/delivery/deliveryForm/DeliveryForm'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createDelivery, selectIsLoading } from '../../../redux/features/delivery/deliverySlice'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'
import { getTask, selectTask, selectName } from '../../../redux/features/task/TaskSlice'
import { getMaterials, selectMaterials } from '../../../redux/features/material/materialSlice'
import "./AddDelivery.scss"

const initialState = {
   quantity: "",
   taskId: "",
   materialId: "",
}


const AddDelivery = () => {

    const name = useSelector(selectName)
    const [delivery, setDelivery] = useState(initialState)
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading)
  
    const { quantity, materialId} = delivery
    const {id} = useParams();
    const taskId = String(id)
    

     const handleInputChange = (e) => {
         const { name, value } = e.target;
         setDelivery({ ...delivery, [name]: value })
     }
     

       const materials = useSelector(selectMaterials) || []
       useEffect(() => {
        dispatch(getMaterials())
        
    }, [materials])
    useEffect(()=>{
        dispatch(getTask(taskId))
    },[dispatch, taskId])

    const saveDelivery = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("quantity", quantity)
        formData.append("materialId", materialId)
      
        

        console.log(...formData);
       

        await dispatch(createDelivery({taskId, formData}))

        navigate(`/task-detail/${taskId}`)
    }

    return (
        <div className='add-delivery'>
            {isLoading && <Loader />}
            <h3 className='--mt'> 
            <span className="--fw-thin">Add new material for </span>
            <span>{name}</span>
            </h3>
            <DeliveryForm
                delivery={delivery}
                materials={materials}
                
                handleInputChange={handleInputChange}

              
                saveDelivery={saveDelivery} />
        </div>
    )
}

export default AddDelivery