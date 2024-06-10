import React, { useEffect } from 'react'
import MaterialFormReceipt from '../../components/material/materialForm/MaterialFormReceipt'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createReceipt, selectIsLoading } from '../../redux/features/receipt/receiptSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { getMaterial, selectMaterial } from '../../redux/features/material/materialSlice'

const initialState = {
   quantity: "",
   materialId: "",
}


const AddReceipt = () => {

    const [receipt, setReceipt] = useState(initialState)
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading)
  
    const { quantity} = receipt
    const {id} = useParams();
    const materialId = String(id)

     const handleInputChange = (e) => {
         const { name, value } = e.target;
         setReceipt({ ...receipt, [name]: value })
     }
      useEffect(()=>{
         dispatch(getMaterial(materialId))
       }, [dispatch, materialId])


    const saveReceipt = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("quantity", quantity)
       
        

        console.log(...formData);
        console.log(`materialId: ${materialId}, type: ${typeof materialId}`);

        await dispatch(createReceipt({materialId, formData}))

        navigate("/dashboard")
    }

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className='--mt'> Add new receipt</h3>
            <MaterialFormReceipt
                receipt={receipt}
                
                handleInputChange={handleInputChange}

              
                saveReceipt={saveReceipt} />
        </div>
    )
}

export default AddReceipt