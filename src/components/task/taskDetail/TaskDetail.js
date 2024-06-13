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


const TaskDetail = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedin);
  const { task, isLoading: taskLoading, isError: taskError, message: taskMessage } = useSelector((state) => state.task);
  const { receipts, isLoading: receiptLoading, isError: receiptError, message: receiptMessage } = useSelector((state) => state.receipt);


  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      console.log('Fetching task with id:', id);
      dispatch(getTask(id));

    }
    if (taskError) {
      console.log(taskMessage);
    }
  }, [isLoggedIn, taskError, taskMessage, dispatch, id]);
  
  
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getReceipt(id)); // Assuming this action fetches receipts by task ID
    }
    if (receiptError) {
      console.log(receiptMessage);
    }
  }, [isLoggedIn, receiptError, receiptMessage, dispatch, id]);



  return (
    <div className="row ">
      <div className="task-detail col-4">
        <h3 className="--mt">Task Detail</h3>
        <Card cardClass="card">
          {taskLoading && <Spinner />}
          {task && (
            <div className="detail">
              <Card cardClass="group">
                {task?.image ? (
                  <img
                    src={task.image.filePath}
                    alt={task.image.fileName}
                  />
                ) : (
                  <p>No image set for this task</p>
                )}
              </Card>
              <h4>Task Availability: {stockStatus(task.quantity)}</h4>
              <hr />
              <h4>
                <span className="badge">Name: </span> &nbsp; {task.name}
              </h4>
              <p>
                <b>&rarr; SKU : </b> {task.sku}
              </p>
              <p>
                <b>&rarr; Category : </b> {task.category}
              </p>

              <p>
                <b>&rarr; Quantity in stock : </b> {task.quantity}
              </p>

              <hr />
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(task.description),
                }}
              ></div>
              <hr />
              <code className="--color-dark">
                Created on: {task.createdAt.toLocaleString("en-US")}
              </code>
              <br />
              <code className="--color-dark">
                Last Updated: {task.updatedAt.toLocaleString("en-US")}
              </code>
            </div>
          )}
        </Card>
      </div>
      <div className="receipt-list col-8">
        <ReceiptList receipts={receipts} isLoading={receiptLoading} />
      </div>
    </div>

  );
};

export default TaskDetail;