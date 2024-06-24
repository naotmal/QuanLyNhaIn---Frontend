import React from 'react'

import 'react-quill/dist/quill.snow.css'

import Card from '../card/Card'

const DoJobFormEdit = ({dojob, saveDoJob,handleInputChange, jobs}) =>{
    return(
        <div className="add-dojob">
            <Card cardClass={"card"}>
                <form onSubmit={saveDoJob}>
                    <select name="jobId" value={dojob?.jobId} onChange={handleInputChange}>
                        <option value="">Choose Job</option>
                        {
                            jobs.map(job =>(
                                <option value={job._id} key={job._id}>{job.name}</option>
                            ))
                        }
                    </select>
                    <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save change
            </button>
            
          </div>
                </form>
            </Card>
        </div>
    )
}

export default DoJobFormEdit