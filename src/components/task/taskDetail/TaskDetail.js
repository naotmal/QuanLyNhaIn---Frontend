import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRediractLoggedOutUser";
import { selectIsLoggedin } from "../../../redux/features/auth/authSlice";
import { deleteTask, getTask } from "../../../redux/features/task/TaskSlice";
import Card from "../../card/Card";
import { Spinner } from "../../loader/Loader";
import "./TaskDetail.scss";
import DOMPurify from "dompurify";
import ReceiptList from "../../receipt/receiptList/ReceiptList";
import { getReceipt } from "../../../redux/features/receipt/receiptSlice";
import { getMaterials } from "../../../redux/features/material/materialSlice";
import { getClients, selectClients } from "../../../redux/features/client/clientSlice";
import DeliveryList from "../../delivery/deliveryList/DeliveryList";
import { getDeliverybyTask } from "../../../redux/features/delivery/deliverySlice";
import DojobList from "../../dojob/DoJobList";
import { getDoJobs, getDoJobsbyTask } from "../../../redux/features/dojob/DoJobSlice";
import { FaEdit, FaTrashAlt} from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { SaleLink } from "../../protect/hiddenLink";


const TaskDetail = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedin);
  const { task, isLoading: taskLoading, isError: taskError, message: taskMessage } = useSelector((state) => state.task);
  const { deliveries, isLoading: deliveryLoading, isError: deliveryError, messaage: deliveryMessage } = useSelector((state) => state.delivery);
  const { dojobs, isLoading: dojobLoading, isError: dojobError, messaage: dojobMessage } = useSelector((state) => state.dojob);
  const { client, isLoading: clientLoading } = useSelector((state) => state.client)
  const navigate = useNavigate();
  const clients = useSelector(selectClients)
  const getClientName = (clientId) => {
    const client = clients.find((client) => client._id === clientId)
    return client ? client.name : "Unknown"
  }
  const getProgressStatus = (progress) => {
    switch (progress) {
      case '1':
        return 'Not Started';
      case '2':
        return 'To Do';
      case '3':
        return 'Doing';
      case '4':
        return 'Done';
    }
  }

  useEffect(() => {
    if (isLoggedIn === true) {
      console.log('Fetching task with id:', id);
      dispatch(getTask(id));
      dispatch(getClients());
    }
    if (taskError) {
      console.log(taskMessage);
    }
  }, [isLoggedIn, taskError, taskMessage, dispatch, id]);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getDeliverybyTask(id));
    }
    if (deliveryError) {
      console.log(deliveryMessage);
    }
  }, [isLoggedIn, deliveryError, deliveryMessage, dispatch, id]);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getDoJobsbyTask(id));
      
    }
    if (dojobError) {
      console.log(dojobMessage);
    }
  }, [isLoggedIn, dojobError, dojobMessage, dispatch, id]);

  const delTask = async (id) => {
    
    console.log(id)
    await dispatch(deleteTask(id))
    navigate("/show-task")
  }
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Task",
      message: "Are you sure you want to delete this task.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delTask(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };


  return (
    <div className="row ">
      <div className="task-detail col-4">
      <span className="d-flex">
        <h3 className="--mt">Task Detail</h3>
        <SaleLink>
        <Link className="--btn --btn-thirdary mt-2 mb-4" to={`/edit-task/${id}`} >
        <FaEdit size={20} />
            </Link>
            </SaleLink>
            </span>
        <Card cardClass="card">
          {taskLoading && <Spinner />}
          {task && (
            <div className="detail">



              <h4>
                <span className="badge">Name: </span> &nbsp; {task.name}
              </h4>
              <p>
                <b>&rarr; Progress : </b> {getProgressStatus(task.progress)}
              </p>
              <p>
                <b>&rarr; Client : </b> {getClientName(task.clientId)}
              </p>

              <p>
                <b>&rarr; Quantity : </b> {task.quantity}
              </p>

              <p>
                <b>&rarr; Unit : </b> {task.unit}
              </p>
              <SaleLink>
              <p>
                <b>&rarr; Price : </b> {task.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </p>
              </SaleLink>

              <hr />
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(task.description),
                }}
              ></div>
              <hr />
              <code className="--color-dark">
                Created on: {new Date(task.createAt).toLocaleDateString("vi-VN")}
              </code>
              <br />

            </div>
          )}
        </Card>
        <SaleLink>
<div className="--btn d-flex justify-content-end mt-2" style={{color: "var(--color-dark)"}} onClick={() => confirmDelete(id)}>
  Delete task
<FaTrashAlt
                            size={20}
className="mx-2"
                            
                          />
</div>
</SaleLink>
        
      </div>
      <div className="receipt-list col-8">
        <DeliveryList deliveries={deliveries} isLoading={deliveryLoading} taskId={id}/>
        <DojobList dojobs={dojobs} isLoading={dojobLoading} />
      </div>
    </div>

  );
};

export default TaskDetail;