import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRediractLoggedOutUser";
import { selectIsLoggedin } from "../../../redux/features/auth/authSlice";
import { getMaterial } from "../../../redux/features/material/materialSlice";
import Card from "../../card/Card";
import { Spinner } from "../../loader/Loader";
import "./MaterialDetail.scss";
import DOMPurify from "dompurify";
import ReceiptList from "../../receipt/receiptList/ReceiptList";

const MaterialDetail = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedin);
  const { material, isLoading, isError, message } = useSelector(
    (state) => state.material
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getMaterial(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="material-detail">
      <h3 className="--mt">Material Detail</h3>
      <Card cardClass="card">
        {isLoading && <Spinner />}
        {material && (
          <div className="detail">
            <Card cardClass="group">
              {material?.image ? (
                <img
                  src={material.image.filePath}
                  alt={material.image.fileName}
                />
              ) : (
                <p>No image set for this material</p>
              )}
            </Card>
            <h4>Material Availability: {stockStatus(material.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {material.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {material.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {material.category}
            </p>
            
            <p>
              <b>&rarr; Quantity in stock : </b> {material.quantity}
            </p>
            
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(material.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {material.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {material.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
      <ReceiptList/>
    </div>
  );
};

export default MaterialDetail;