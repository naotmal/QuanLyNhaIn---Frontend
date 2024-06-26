import React, { useEffect, useState } from "react";
import { Spinner } from "../../loader/Loader";
import "./DeliveryList.scss"
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_DELIVERIES,
  selectFilteredDeliveries,

} from "../../../redux/features/material/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteDelivery,
  getDeliveries,
  getDeliverybyTask,

} from "../../../redux/features/delivery/deliverySlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillFolderAdd } from "react-icons/ai";
import { getMaterials } from "../../../redux/features/material/materialSlice";
import { getTasks } from "../../../redux/features/task/TaskSlice";
import { IoMdAdd } from "react-icons/io";


const DeliveryList = ({ deliveries, isLoading, taskId }) => {
  const { materials, isLoading: materialLoading, isError: materialError, message: materialMessage } = useSelector((state) => state.material);
  const [search, setSearch] = useState("");
  const filteredDeliveries = useSelector(selectFilteredDeliveries);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    if (materials.length === 0) {
      dispatch(getMaterials());
    }
  }, [dispatch, materials.length]);

  const getMaterialName = (id) => {
    const material = materials.find((material) => material._id === id);
    return material ? material.name : "Unknown Material";
  };

  const getMaterialPrice = (id) => {
    const material = materials.find((material) => material._id === id); 
    return material ? material.price : "Unknown Price";
  }

  const getMaterialQuantity = (id) =>{
    const material = materials.find((material) => material._id === id); 
    return material ? material.quantity : "Unknown Quantity";
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const delDelivery = async (id) => {
    console.log(id)
    await dispatch(deleteDelivery(id))
    await dispatch(getMaterials())
    await dispatch(getTasks())
    navigate(0)

  }
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Delivery",
      message: "Are you sure you want to delete this delivery.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delDelivery(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  




  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredDeliveries.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredDeliveries.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredDeliveries]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredDeliveries.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_DELIVERIES({ deliveries, search }));
  }, [deliveries, search, dispatch]);



  return (
    <div className="delivery-list">

      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span className="d-flex">
          
            <h3>Delivery List </h3>
            
            {taskId !== "hide" && (
              <Link className="--btn --btn-primary mt-2 mb-4" to={`/add-delivery/${taskId}`}>
                <IoMdAdd />
              </Link>
            )}
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeHolder="Search reciept"
            />
          </span>
        </div>

        {isLoading && <Spinner />}

        <div className="table d-flex">
          {!isLoading && deliveries.length === 0 ? (
            <p>-- No delivery found, please add a delivery...</p>
          ) : (
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Material</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Created at</th>


                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((delivery, index) => {
                  const { _id, quantity, createAt, materialId } = delivery;
                  
                  return (
                    <tr key={_id} className={getMaterialQuantity(materialId) < 0 ? 'not-available' : ''}>
                      <td>{index + 1}</td>
                      <td>{getMaterialName(materialId)}</td>

                      <td>{quantity}</td>
                      <td>{formatPrice(quantity*getMaterialPrice(materialId))}</td>
                      <td>{new Date(createAt).toLocaleDateString("vi-VN")}</td>



                      <td >

                        <span className=" me-2">
                          <Link className="icons" to={`/edit-delivery/${_id}`}>
                            <FaEdit size={20} />
                          </Link>
                        </span>
                        <span className=" me-2">
                          <Link className="icons" to={`/add-dojob/${_id}`}>
                            <AiFillFolderAdd size={20} />
                          </Link>
                        </span>
                        <span className="icons me-2">
                          <FaTrashAlt
                            size={20}

                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}

          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeClassName="activePage"
        />
      </div>
    </div>
  );
};

export default DeliveryList;