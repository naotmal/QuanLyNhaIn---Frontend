import React, { useEffect } from 'react'
import TaskList from "../../components/TaskList";
import { useDispatch, useSelector } from "react-redux";

import useRedirectLoggedOutUser from "../../customHook/useRediractLoggedOutUser";
import { selectIsLoggedin } from "../../redux/features/auth/authSlice";
import { getTasks } from "../../redux/features/task/TaskSlice";

const ShowTask = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();

  const isLoggedin = useSelector(selectIsLoggedin);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    
    if (isLoggedin === true) {
    dispatch(getTasks());
    
     }
console.log(tasks);
    if (isError) {
      console.log(message);
    }
  }, [isLoggedin, isError, message, dispatch, tasks]);
  return (
    <TaskList tasks={tasks} isLoading={isLoading} />
  )
}

export default ShowTask