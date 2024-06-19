import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRediractLoggedOutUser";
import { selectIsLoggedin } from "../../../redux/features/auth/authSlice";
import { getTask } from "../../../redux/features/task/TaskSlice";
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

const TaskDetail = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedin);
  const { task, isLoading: taskLoading, isError: taskError, message: taskMessage } = useSelector((state) => state.task);
  const { deliveries, isLoading: deliveryLoading, isError: deliveryError, messaage: deliveryMessage } = useSelector((state) => state.delivery);
  const { client, isLoading: clientLoading } = useSelector((state) => state.client)

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



  return (
    <div className="row ">
      <div className="task-detail col-4">
        <h3 className="--mt">Task Detail</h3>
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
      </div>
      <div className="receipt-list col-8">
        <DeliveryList deliveries={deliveries} isLoading={deliveryLoading} />
      </div>
    </div>

  );
};

export default TaskDetail;