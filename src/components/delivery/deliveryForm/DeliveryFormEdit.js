import React from 'react'

import 'react-quill/dist/quill.snow.css'

import Card from '../../card/Card'

const DeliveryForm = ({ delivery, materials, handleInputChange, saveDelivery }) => {
  return (
    <div className='add-delivery '>
      <Card cardClass={"card"}>
        <form onSubmit={saveDelivery}>
          <select name="materialId" value={delivery?.materialId} disabled>
            <option value="">Choose Material</option>
            {materials.map(material => (
              <option value={material._id} key={material._id}>{material.name}</option>
            ))}
          </select>


          <label >Quantity:</label>
          <input type="text" placeholder='Quantity' name="quantity" value={delivery?.quantity} onChange={handleInputChange} />




          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Add
            </button>
            console.log(error)
          </div>
        </form>

      </Card>
    </div>
  )
}

export default DeliveryForm