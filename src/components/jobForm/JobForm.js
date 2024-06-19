import React from 'react'
import Card from '../card/Card'
import ReactQuill from 'react-quill'

const JobForm = ({job, handleInputChange, saveJob, setDescription, description}) => {
    return <div className='add-job'>
        <Card cardClass={"card"}>
            <form onSubmit={saveJob}>
            <label>Job name: </label>
            <input type="text" placeholder='Job name' name='name' value={job?.name} onChange={handleInputChange} />
            <label>Price: </label>
            <input type="number" placeholder='Price' name='price' value={job?.price} onChange={handleInputChange} />
            <label>Description: </label>
            <ReactQuill theme="snow" value={description} onChange={setDescription} />
            <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Job
            </button>
            
          </div>
            </form>
        </Card>
    </div>
}

export default JobForm