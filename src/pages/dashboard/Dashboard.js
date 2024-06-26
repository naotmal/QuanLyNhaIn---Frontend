import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialList from "../../components/material/materialList/MaterialList";
import MaterialSummary from "../../components/material/materialSummary/MaterialSummary";
import useRedirectLoggedOutUser from "../../customHook/useRediractLoggedOutUser";
import { selectIsLoggedin } from "../../redux/features/auth/authSlice";
import { getMaterials } from "../../redux/features/material/materialSlice";
import ReceiptList from "../../components/receipt/receiptList/ReceiptList";
import { getReceipts } from "../../redux/features/receipt/receiptSlice";
import { getTasks } from "../../redux/features/task/TaskSlice";
import TaskList from "../../components/TaskList";
import TaskSummary from "../../components/task/taskSummary/TaskSummary";
import { AdminLink, SaleLink } from "../../components/protect/hiddenLink";


const Dashboard = () => {
  
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();

  const isLoggedin = useSelector(selectIsLoggedin);
  const { materials, isLoading: materialLoading, isError: materialError, message: materialMessage } = useSelector((state) => state.material);
  const { receipts, isLoading: receiptLoading, isError: receiptError, message: receiptMessage } = useSelector((state) => state.receipt);
  const { tasks, isLoading: taskLoading, isError: taskError, message: taskMessage } = useSelector((state) => state.task);

  useEffect(() => {
    
    if (isLoggedin === true) {
    dispatch(getMaterials());
    
     }

  }, [isLoggedin,  dispatch, materials]);

  useEffect(()=>{
    if(isLoggedin===true){
      dispatch(getReceipts())
    }
    
  }, [isLoggedin, dispatch, receipts])
  useEffect(() => {
    
    if (isLoggedin === true) {
    dispatch(getTasks());
    
     }
console.log(tasks);
    
  }, [isLoggedin,  dispatch, tasks]);
  
  return (
    <div>
      
      <TaskSummary tasks={tasks}/>
      
      <TaskList tasks={tasks} isLoading={taskLoading} />
      
      <MaterialList materials={materials} isLoading={materialLoading} />
      <AdminLink>
      <ReceiptList receipts={receipts} isLoading={receiptLoading} materialId={"hide"}/>
      </AdminLink>
    </div>
  );
};

export default Dashboard;