import React, { useEffect } from 'react'
import useRedirectLoggedOutUser from '../../../customHook/useRediractLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectIsLoggedin } from '../../../redux/features/auth/authSlice'
import { getClient } from '../../../redux/features/client/clientSlice'
import { Spinner } from '../../loader/Loader'
import Card from "../../card/Card"
import "./ClientDetail.scss"
import { getTaskbyClient, getTasks } from '../../../redux/features/task/TaskSlice'
import TaskList from '../../TaskList'

const ClientDetail = () => {
  useRedirectLoggedOutUser("/")
  const dispatch = useDispatch()
  const { id } = useParams()

  const isLoggedIn = useSelector(selectIsLoggedin)
  const { client, isLoading: clientLoading, isError: clientError, message: clientMessage } = useSelector((state) => state.client)
  const { tasks, isLoading: taskLoading, isError: taskError, message: taskMessage } = useSelector((state) => state.task)
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getClient(id))
    }
    if (clientError) {
      console.log(clientMessage);
    }
  }, [isLoggedIn, clientError, clientMessage, dispatch, id])

  useEffect(() => {

    if (isLoggedIn === true) {
      dispatch(getTaskbyClient(id));

    }
    console.log(tasks);
    if (taskError) {
      console.log(taskMessage);
    }
  }, [isLoggedIn, taskError, taskMessage, dispatch, tasks, id]);

  return (
    <div className="row">
      <div className="client-detail col-4">
        <h3 className="--mt">Client detail</h3>
        <Card cardClass="card">
          {clientLoading && <Spinner />}
          {client && (
            <div className="detail">
              <h4>
                <span className="badge">Name: </span> &nbsp; {client.name}
              </h4>
              <p>
              <b>&rarr; SKU : </b> {client.sku}
            </p>
              <p>
                <b> Phone: </b> {client.phone}
              </p>
              <p>
                <b> Email: </b> {client.email}
              </p>
              <p>
                <b> Address: </b> {client.address}
              </p>
            </div>
          )}
        </Card>
      </div>
      <div className="col-8">
        <TaskList tasks={tasks} isLoading={taskLoading} />
      </div>
    </div>
  )
}

export default ClientDetail