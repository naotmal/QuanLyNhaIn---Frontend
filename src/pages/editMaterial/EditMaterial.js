import React, { useEffect } from 'react'
import MaterialFormAdd from '../../components/material/materialForm/MaterialFormAdd'
import MaterialFormReceipt from '../../components/material/materialForm/MaterialFormReceipt'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getMaterials, getMaterial, selectIsLoading, selectMaterial, updateMaterial} from '../../redux/features/material/materialSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'


const initialState = {
    name: "",
    category: "",
    description:"",
}


const EditMaterial = () => {
  const materialEdit = useSelector(selectMaterial)
  const {id} = useParams();
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLoading = useSelector(selectIsLoading)

    const [material, setMaterial] = useState(materialEdit)
    const [materialImage, setMaterialImage] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [description, setDescription] = useState("")

useEffect(()=>{
  dispatch(getMaterial(id))
}, [dispatch, id])

useEffect(()=>{
  setMaterial(materialEdit)

  setImagePreview(
    materialEdit && materialEdit.image ? `${materialEdit.image.filePath}` : null
  )
setDescription(
  materialEdit && materialEdit.description ? materialEdit.description : ""
)

}, [materialEdit])

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setMaterial({ ...material, [name]: value })
}

const handleImageChange = (e) => {
  setMaterialImage(e.target.files[0])
  setImagePreview(URL.createObjectURL(e.target.files[0]))
}
const saveMaterial = async (e) => {
  e.preventDefault()
  const formData = new FormData()
  formData.append("name", material?.name)
  formData.append("category", material?.category)
  formData.append("price", material?.price)

  formData.append("description", description)
  if (materialImage){
    formData.append("image", materialImage)
  }

  console.log(...formData);

  await dispatch(updateMaterial({id, formData}))
await dispatch(getMaterials())
  navigate(`/material-detail/${id}`)
}







return(
  <div>
  {isLoading && <Loader />}
  <div>
  <h3 className='--mt'> Edit material</h3>
  <MaterialFormAdd
      material={material}
      materialImage={materialImage}
      imagePreview={imagePreview}
      description={description}
      setDescription={setDescription}
      handleInputChange={handleInputChange}

      handleImageChange={handleImageChange}
      saveMaterial={saveMaterial} />
</div>

</div>)
}


export default EditMaterial