import React, { useState, useEffect } from "react";
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
import DeliveryList from "../../delivery/deliveryList/DeliveryList";
import { getReceipt } from "../../../redux/features/receipt/receiptSlice";
import { getDeliverybyMaterial } from "../../../redux/features/delivery/deliverySlice";
import { AdminLink } from "../../protect/hiddenLink";


const MaterialDetail = () => {
  useRedirectLoggedOutUser("/");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedin);
  const { material, isLoading: materialLoading, isError: materialError, message: materialMessage } = useSelector((state) => state.material);
  const { receipts, isLoading: receiptLoading, isError: receiptError, message: receiptMessage } = useSelector((state) => state.receipt);
  const { deliveries, isLoading: deliveryLoading, isError: deliveryError, messaage: deliveryMessage } = useSelector((state) => state.delivery);

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      console.log('Fetching material with id:', id);
      dispatch(getMaterial(id));

    }
    if (materialError) {
      console.log(materialMessage);
    }
  }, [isLoggedIn, materialError, materialMessage, dispatch, id]);


  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getReceipt(id)); // Assuming this action fetches receipts by material ID
    }

  }, [isLoggedIn, receiptError, receiptMessage, dispatch, id]);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getDeliverybyMaterial(id)); // Assuming this action fetches receipts by material ID
    }
    if (deliveryError) {
      console.log(deliveryMessage);
    }
  }, [isLoggedIn, deliveryError, deliveryMessage, dispatch, id]);

  return (
    <div className="row ">
      <div className="material-detail col-4">
        <h3 className="--mt">Material Detail</h3>
        <Card cardClass="card">
          {materialLoading && <Spinner />}
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
              <AdminLink>
                <p>
                  <b>&rarr; Price : </b> {material.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </p>
              </AdminLink>
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
                Created on: {new Date(material.createdAt).toLocaleDateString("vi-VN")}
              </code>
              <br />
              <code className="--color-dark">
                Last Updated: {new Date(material.updatedAt).toLocaleDateString("vi-VN")}
              </code>
            </div>
          )}
        </Card>
      </div>
      <div className="receipt-list col-8">
        <AdminLink>
          <ReceiptList receipts={receipts} isLoading={receiptLoading} materialId={id} />
        </AdminLink>
        <DeliveryList deliveries={deliveries} isLoading={deliveryLoading} taskId={"hide"} />
      </div>
    </div>

  );
};

export default MaterialDetail;