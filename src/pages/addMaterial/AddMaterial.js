import React from 'react'
import MaterialForm from '../../components/material/materialForm/MaterialForm'
import { useState } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { createMaterial, selectIsLoading } from '../../redux/features/material/materialSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'


const initialState = {
    name: "",
    category: "",
    quantity: "",
    price: "",
    
}

const AddMaterial = () => {
    const [material, setMaterial] = useState(initialState)
const [materialImage, setMaterialImage] = useState("")
const [imagePreview, setImagePreview] = useState(null)
const [description, setDescription] = useState("")
const navigate = useNavigate()
const dispatch = useDispatch()

const isLoading = useSelector(selectIsLoading)

const {name, category,quantity, price} = material

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial({ ...material, [name]: value })
}

const handleImageChange = (e) =>{
    setMaterialImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
}

const genterateSKU = (category) =>{
    const letter = category.slice(0, 3).toUpperCase()
    const number = Date.now()
    const sku = letter + "-" + number
    return sku;
}

const saveMaterial = async (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("sku", genterateSKU(category))
    formData.append("category", category)
    formData.append("quantity", Number(quantity))
    formData.append("price", price)
    formData.append("description", description)
    formData.append("image", materialImage)

    console.log(...formData);

   await dispatch(createMaterial(formData))

    navigate("/dashboard")
}

  return (
    <div>
        {isLoading && <Loader/>}
        <h3 className='--mt'> Add new material</h3>
        <MaterialForm
        material={material}
        materialImage={materialImage}
        imagePreview={imagePreview}
        description={description}
       setDescription={setDescription}
       handleInputChange={handleInputChange}
       
       handleImageChange={handleImageChange}
       saveMaterial={saveMaterial}/>
    </div>
  )
}

export default AddMaterial