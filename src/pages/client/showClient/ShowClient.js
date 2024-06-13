import React, { useEffect } from 'react'
import ClientList from "../../../components/client/clientList/ClientList";
import { useDispatch, useSelector } from "react-redux";

import useRedirectLoggedOutUser from "../../../customHook/useRediractLoggedOutUser";
import { selectIsLoggedin } from "../../../redux/features/auth/authSlice";
import { getClients } from "../../../redux/features/client/clientSlice";

const ShowClient = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();

  const isLoggedin = useSelector(selectIsLoggedin);
  const { clients, isLoading, isError, message } = useSelector(
    (state) => state.client
  );

  useEffect(() => {
    
    if (isLoggedin === true) {
    dispatch(getClients());
    
     }
console.log(clients);
    if (isError) {
      console.log(message);
    }
  }, [isLoggedin, isError, message, dispatch, clients]);
  return (
    <ClientList clients={clients} isLoading={isLoading} />
  )
}

export default ShowClient