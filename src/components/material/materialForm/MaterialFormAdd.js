import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import "./MaterialForm.scss"
import Card from '../../card/Card'

const MaterialFormAdd = ({ material, materialImage, imagePreview, description, setDescription, handleInputChange, handleImageChange, saveMaterial }) => {
  return (
    <div className='add-material'>
      <Card cardClass={"card"}>
        <form onSubmit={saveMaterial}>

          <label >Material Image</label>
          <code className='--color-dark'>Supported Formats: jpg, jpeg, png</code>
          <input type="file" name="image" onChange={(e) => handleImageChange(e)} />
          {imagePreview != null ? (
            <div className="image-preview">
              <img src={imagePreview} alt="Image" />
            </div>
          ) : (<p>No image set for this material</p>)}

          <label >Material Name:</label>
          <input type="text" placeholder='Material Name' name="name" value={material?.name} onChange={handleInputChange} />

          <label >Category:</label>
          <input type="text" placeholder='Category' name="category" value={material?.category} onChange={handleInputChange} />

          <label >Price:</label>
          <input type="number" placeholder='Price' name="price" value={material?.price} onChange={handleInputChange} />



          <label >Description:</label>
          <ReactQuill theme="snow" value={description} onChange={setDescription} />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Material
            </button>
            
          </div>
        </form>

      </Card>
    </div>
  )
}

export default MaterialFormAdd