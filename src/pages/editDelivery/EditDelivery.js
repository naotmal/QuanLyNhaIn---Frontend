import React, { useEffect } from 'react'
import DeliveryFormEdit from '../../components/delivery/deliveryForm/DeliveryForm'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createDelivery, deleteDelivery, getDeliverybyMaterial, getDeliverybyTask, getSingleDelivery, selectDelivery, selectIsLoading, updateDelivery, selectDeliveryTask } from '../../redux/features/delivery/deliverySlice'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { getTask, selectTask, selectName } from '../../redux/features/task/TaskSlice'
import { getMaterials, selectMaterials } from '../../redux/features/material/materialSlice'

const initialState = {
   quantity: "",
   taskId: "",
   materialId: "",
}


const EditDelivery = () => {
    const deliveryEdit = useSelector(selectDelivery)
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading)
    const name = useSelector(selectName)
    const [delivery, setDelivery] = useState(deliveryEdit)
    
    const task = useSelector(selectDeliveryTask)
  
   
   
    

     const handleInputChange = (e) => {
         const { name, value } = e.target;
         setDelivery({ ...delivery, [name]: value })
     }
     

       const materials = useSelector(selectMaterials) || []
       useEffect(() => {
        dispatch(getMaterials())
        
    }, [materials])
    

    useEffect(()=>{
        dispatch(getSingleDelivery(id))
    },[dispatch, id])

    useEffect(()=>{
        setDelivery(deliveryEdit)
    },[deliveryEdit])

    const saveDelivery = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("quantity", delivery?.quantity)
        formData.append("materialId", delivery?.materialId)
      
        

        console.log(...formData);
       

        await dispatch(updateDelivery({id, formData}))
        
        // await dispatch(createDelivery(taskId,formData))
        // await dispatch(deleteDelivery(id))
        await dispatch(getDeliverybyTask())
        
        //navigate("/show-task")
    }

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className='--mt'> 
            <span className="--fw-thin">Edit new material for </span>
            <span>{name}</span>
            </h3>
            <DeliveryFormEdit
                delivery={delivery}
                materials={materials}
                
                handleInputChange={handleInputChange}

              
                saveDelivery={saveDelivery} />
        </div>
    )
}

export default EditDelivery