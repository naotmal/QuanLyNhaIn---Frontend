import React, { useEffect } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRediractLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedin } from '../../redux/features/auth/authSlice';
import { getJobs } from '../../redux/features/job/JobSlice';
import JobList from '../../components/jobList/JobList';

const ShowJob = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch()
  const isLoggedin = useSelector(selectIsLoggedin)
  const {jobs, isLoading, isError, message} = useSelector(
    (state) => state.job
  )
useEffect(()=>{
  if(isLoggedin === true){
    dispatch(getJobs())
  }
  console.log(jobs);
  if(isError){
    console.log(message);
  }
}, [isLoggedin, isError, message, dispatch, jobs])

  return (
    <JobList jobs={jobs} isLoading={isLoading}/>
  )
}

export default ShowJob