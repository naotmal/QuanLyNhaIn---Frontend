import React, { useEffect } from "react";

import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  CALC_NEED_RESTOCK,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
  selectNeedReStock,
} from "../../../redux/features/material/materialSlice";

// Icons
const earningIcon = <AiFillDollarCircle size={40} />;
const materialIcon = <BsCart4 size={40} />;
const categoryIcon = <BiCategory size={40} />;
const outOfStockIcon = <BsCartX size={40} />;
const reStock = <BsFillCartPlusFill size={40}/>

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const MaterialSummary = ({ materials }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);
  const needReStock = useSelector(selectNeedReStock)

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(materials));
    dispatch(CALC_OUTOFSTOCK(materials));
    dispatch(CALC_CATEGORY(materials));
    dispatch(CALC_NEED_RESTOCK(materials))
  }, [dispatch, materials]);

  return (
    <div className="material-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary d-flex flex-wrap">
        <InfoBox
          icon={materialIcon}
          title={"Total Materials"}
          count={materials.length}

        />
<InfoBox
          icon={reStock}
          title={"Need Restock"}
          count={needReStock}

        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}

        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}

        />
      </div>
    </div>
  );
};

export default MaterialSummary;