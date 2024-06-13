import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialList from "../../components/material/materialList/MaterialList";
import MaterialSummary from "../../components/material/materialSummary/MaterialSummary";
import useRedirectLoggedOutUser from "../../customHook/useRediractLoggedOutUser";
import { selectIsLoggedin } from "../../redux/features/auth/authSlice";
import { getMaterials } from "../../redux/features/material/materialSlice";
import ReceiptList from "../../components/receipt/receiptList/ReceiptList";
import { getReceipts } from "../../redux/features/receipt/receiptSlice";

const Dashboard = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();

  const isLoggedin = useSelector(selectIsLoggedin);
  const { materials, isLoading: materialLoading, isError: materialError, message: materialMessage } = useSelector((state) => state.material);
  const { receipts, isLoading: receiptLoading, isError: receiptError, message: receiptMessage } = useSelector((state) => state.receipt);

  useEffect(() => {
    
    if (isLoggedin === true) {
    dispatch(getMaterials());
    
     }
console.log(materials);
    if (materialError) {
      console.log(materialMessage);
    }
  }, [isLoggedin, materialError, materialMessage, dispatch, materials]);

  useEffect(()=>{
    if(isLoggedin===true){
      dispatch(getReceipts())
    }
    if(receiptError){
      console.log(receiptMessage)
    }
  }, [isLoggedin, receiptError, receiptMessage, dispatch, receipts])

  return (
    <div>
      <MaterialSummary materials={materials}  />
      <MaterialList materials={materials} isLoading={materialLoading} />
      <ReceiptList receipts={receipts} isLoading={receiptLoading}/>
    </div>
  );
};

export default Dashboard;