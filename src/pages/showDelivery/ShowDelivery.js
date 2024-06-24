import React, { useEffect } from 'react'
import DeliveryList from "../../components/delivery/deliveryList/DeliveryList";
import { useDispatch, useSelector } from "react-redux";

import useRedirectLoggedOutUser from "../../customHook/useRediractLoggedOutUser";
import { selectIsLoggedin } from "../../redux/features/auth/authSlice";
import { getDeliveries } from "../../redux/features/delivery/deliverySlice";

const ShowDelivery = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();

  const isLoggedin = useSelector(selectIsLoggedin);
  const { deliveries, isLoading, isError, message } = useSelector(
    (state) => state.delivery
  );

  useEffect(() => {
    
    if (isLoggedin === true) {
    dispatch(getDeliveries());
    
     }
console.log(deliveries);
    if (isError) {
      console.log(message);
    }
  }, [isLoggedin, isError, message, dispatch, deliveries]);
  return (
    <DeliveryList deliveries={deliveries} isLoading={isLoading} taskId={"hide"}/>
  )
}

export default ShowDelivery