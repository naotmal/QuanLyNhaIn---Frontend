import React, { useEffect } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRediractLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectIsLoggedin } from '../../redux/features/auth/authSlice'
import { getJob } from '../../redux/features/job/JobSlice'
import Card from '../card/Card'
import { Spinner } from '../loader/Loader'
import DOMPurify from "dompurify";
import "./JobDetail.scss"

const JobDetail = () => {
    useRedirectLoggedOutUser("/")
    const dispatch = useDispatch()
    const {id} = useParams()

    const isLoggedIn = useSelector(selectIsLoggedin)
    const {job, isLoading: jobLoading, isError: jobError, message: jobMessage} = useSelector((state)=> state.job)
    const { tasks, isLoading: taskLoading, isError: taskError, message: taskMessage } = useSelector((state) => state.task)

    useEffect(()=>{
        if(isLoggedIn ===  true) {
            dispatch(getJob(id))
        }
        if(jobError){
            console.log(jobMessage);
        }
    },[isLoggedIn, jobError, jobMessage, dispatch, id])
  return (
    <div className="row">
        <div className="task-detail col-4">
            <h3 className="--mt">Job detail</h3>
            <Card cardClass="card">
                {jobLoading && <Spinner/>}
                {job &&(
                    <div className="detail">
                        <h4>
                            <span className='badge'>Name:</span>  &nbsp; {job.name}
                        </h4>
                        <p>
                            <b>Price: </b> {job.price}
                        </p>
                        <hr />
                        <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(job.description),
                }}
              ></div>
                    </div>
                )}
            </Card>
        </div>
    </div>
  )
}

export default JobDetail