import React, { useEffect } from 'react'
import ReceiptList from "../../components/receipt/receiptList/ReceiptList";
import { useDispatch, useSelector } from "react-redux";

import useRedirectLoggedOutUser from "../../customHook/useRediractLoggedOutUser";
import { selectIsLoggedin } from "../../redux/features/auth/authSlice";
import { getReceipts } from "../../redux/features/receipt/receiptSlice";

const ShowReceipt = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();

  const isLoggedin = useSelector(selectIsLoggedin);
  const { receipts, isLoading, isError, message } = useSelector(
    (state) => state.receipt
  );

  useEffect(() => {
    
    if (isLoggedin === true) {
    dispatch(getReceipts());
    
     }
console.log(receipts);
    if (isError) {
      console.log(message);
    }
  }, [isLoggedin, isError, message, dispatch, receipts]);
  return (
    <ReceiptList receipts={receipts} isLoading={isLoading} materialId={"hide"}/>
  )
}

export default ShowReceipt