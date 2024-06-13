import React, { useEffect } from 'react'
import MaterialFormReceipt from '../../components/material/materialForm/MaterialFormReceipt'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { updateReceipt, getReceipt, selectIsLoading, selectReceipt, getSingleReceipt } from '../../redux/features/receipt/receiptSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { getMaterial, selectMaterial, selectName } from '../../redux/features/material/materialSlice'

const initialState = {
   quantity: "",
   materialId: "",
}


const EditReceipt = () => {
    const receiptEdit = useSelector(selectReceipt)
    const {id} = useParams();

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLoading = useSelector(selectIsLoading)

    const name = useSelector(selectName)
    const [receipt, setReceipt] = useState(receiptEdit)
  
    useEffect(()=>{
        dispatch(getSingleReceipt(id))
      }, [dispatch, id])

    useEffect(()=>{
        setReceipt(receiptEdit)
    },[receiptEdit])
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReceipt({ ...receipt, [name]: value })
    }
  
    
    
    const materialId = String(id)

     
      


    const saveReceipt = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("quantity", receipt?.quantity)
       
        

        console.log(...formData);
        console.log(`materialId: ${materialId}, type: ${typeof materialId}`);

        await dispatch(updateReceipt({id, formData}))
        await dispatch(getReceipt(materialId))

        navigate("/show-material")
    }

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className='--mt'> 
            <span className="--fw-thin">Edit new receipt for </span>
            <span>{name}</span>
            </h3>
            <MaterialFormReceipt
                receipt={receipt}
                
                handleInputChange={handleInputChange}

              
                saveReceipt={saveReceipt} />
        </div>
    )
}

export default EditReceipt