import React from 'react'
import Card from '../../card/Card'
import "./TaskForm.scss"
import ReactQuill from 'react-quill'

const TaskForm = ({task,clients, description, setDescription, handleInputChange, saveTask}) => {
  return (
    <div className="add-task">
        <Card cardClass={"card"}>
            <form onSubmit={saveTask}>
                <label>Task name:</label>
                <input type="text" placeholder='Task name' name='name' value={task?.name} onChange={handleInputChange} />
                <label>Progress:</label>
                <select name="progress" value={task?.progress || "1"} onChange={handleInputChange}>
                    <option value="1">Not Start</option>
                    <option value="2">To do</option>
                    <option value="3">Doing</option>
                    <option value="4">Done</option>
                </select>
                <label>Client:</label>
                <select name="clientId" value={task?.clientId} onChange={handleInputChange}>
                  <option value="">Choose Client</option>
                  {clients.map(client=>(
                    <option value={client._id} key={client._id}>{client.name}</option>
                  ))}
                </select>
                
                
                <label>Quantity:</label>
                <input type="number" placeholder='Quantity' name='quantity' value={task?.quantity} onChange={handleInputChange} />
                <label>Unit:</label>
                <input type="text" placeholder='Unit' name='unit' value={task?.unit} onChange={handleInputChange} />
                <label>Description:</label>
                <ReactQuill theme="snow" value={description} onChange={setDescription}/>
                <div className="--my">
                <button type= "submit" className="--btn --btn-primary">
Save Task
          </button>
                </div>
            </form>
        </Card>
    </div>
  )
}

export default TaskForm