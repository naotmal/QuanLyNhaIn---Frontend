import React from 'react'

import 'react-quill/dist/quill.snow.css'
import "./MaterialForm.scss"
import Card from '../../card/Card'

const MaterialFormReceipt = ({receipt, handleInputChange, saveReceipt}) => {
  return (
    <div className='add-material '>
      <Card cardClass={"card"}>
        <form onSubmit={saveReceipt}>
          
            
          
          <label >Quantity:</label>
          <input type="text" placeholder='Quantity' name="quantity" value={receipt?.quantity} onChange={handleInputChange} />
          
          

          
        <div className="--my">
          <button type= "submit" className="--btn --btn-primary">
Add
          </button>
          console.log(error)
          </div>
        </form>

      </Card>
      </div>
  )
}

export default MaterialFormReceipt