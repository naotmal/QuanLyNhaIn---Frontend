import React, { useState } from 'react'
import { IoSaveSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { getTasks, changeProgress } from '../../redux/features/task/TaskSlice';
import { confirmAlert } from 'react-confirm-alert';

const ChangeProgress = ({ _id }) => {
    const [taskProgress, setTaskProgress] = useState("");
    const dispatch = useDispatch();

    //change progress
    const handleChangeProgress = async (e) => {
        e.preventDefault();
        if (!taskProgress) {
            toast.error("Please select a progress");
            return;
        }

        if (taskProgress === "4"){
            confirmDeliveryQuantity();
        } else{
            const taskData = {
                progress: taskProgress,
                id: _id,
            };
            await dispatch(changeProgress(taskData));
            await dispatch(getTasks());
        }
       
    };

    const handleConfirmProgressChange = async () => {
        const taskData = {
          progress: taskProgress,
          id: _id,
        };
        await dispatch(changeProgress(taskData));
        await dispatch(getTasks());
      };

    const confirmDeliveryQuantity = () =>{
        confirmAlert({
            title: "Confirm Delivery Quantity",
            message: "Are you sure your delivery quantity is updated?",
            buttons: [
              {
                label: "Confirm",
                onClick: () => handleConfirmProgressChange(),
              },
              {
                label: "Cancel",
                // onClick: () => alert('Click No')
              },
            ],
          });
    }

    return (
        <div className="sort">
            <form className="d-flex" onSubmit={handleChangeProgress}>
                <select value={taskProgress} onChange={(e) => setTaskProgress(e.target.value)}>
                    <option value="">--select--</option>
                    <option value="1">Not started</option>
                    <option value="2">To do</option>
                    <option value="3">Doing</option>
                    <option value="4">Done</option>
                </select>
                <button className='--btn-select'>
                    <IoSaveSharp size={15} />
                </button>
            </form>
        </div>
    );
};

export default ChangeProgress;
