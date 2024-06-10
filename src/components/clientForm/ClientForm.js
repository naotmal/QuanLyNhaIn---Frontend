import React from 'react'
import Card from '../card/Card'

const ClientForm = ({client, handleInputChange, saveClient}) => {
  return <div className='add-client'>
<Card cardClass={"card"}>
    <form onSubmit={saveClient}>
        <label>Client name: </label>
        <input type="text" placeholder='Client name' name='name' value={client?.name} onChange={handleInputChange}/>
        <label>Email: </label>
        <input type="text" placeholder='Email' name='email' value={client?.email} onChange={handleInputChange}/>

        <label>Phone number: </label>
        <input type="text" placeholder='Phone number' name='phone' value={client?.phone} onChange={handleInputChange}/>

        <label>Address: </label>
        <input type="text" placeholder='Address' name='address' value={client?.address} onChange={handleInputChange}/>
    <div className="--my">
        <button className="--btn --btn-primary">Add client</button>
    </div>
    
    </form>
</Card>
  </div>
}

export default ClientForm