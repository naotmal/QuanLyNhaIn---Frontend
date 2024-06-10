import React, { useEffect } from 'react'
import MaterialList from "../../components/material/materialList/MaterialList";
import { useDispatch, useSelector } from "react-redux";

import useRedirectLoggedOutUser from "../../customHook/useRediractLoggedOutUser";
import { selectIsLoggedin } from "../../redux/features/auth/authSlice";
import { getMaterials } from "../../redux/features/material/materialSlice";

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
    <MaterialList materials={materials} isLoading={isLoading} />
  )
}

export default ShowMaterial