import React, { useEffect } from 'react'
import MaterialList from "../../components/material/materialList/MaterialList";
import { useDispatch, useSelector } from "react-redux";

import useRedirectLoggedOutUser from "../../customHook/useRediractLoggedOutUser";
import { selectIsLoggedin } from "../../redux/features/auth/authSlice";
import { getMaterials } from "../../redux/features/material/materialSlice";
import MaterialSummary from "../../components/material/materialSummary/MaterialSummary";

const ShowMaterial = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();

  const isLoggedin = useSelector(selectIsLoggedin);
  const { materials, isLoading, isError, message } = useSelector(
    (state) => state.material
  );

  useEffect(() => {
    
    if (isLoggedin === true) {
    dispatch(getMaterials());
    
     }
console.log(materials);
    if (isError) {
      console.log(message);
    }
  }, [isLoggedin, isError, message, dispatch, materials]);
  return (
    <div>
    <MaterialSummary materials={materials}  />
    <MaterialList materials={materials} isLoading={isLoading} />
    </div>
  )
}

export default ShowMaterial