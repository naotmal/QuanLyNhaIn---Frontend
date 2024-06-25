import React, { useEffect, useState } from "react";
import { Spinner } from "../loader/Loader";
import "./DojobList.scss"
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Search from "../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_DELIVERIES,
  FILTER_DOJOBS,
  selectFilteredDoJobs,

} from "../../redux/features/material/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { Link, useNavigate } from "react-router-dom";
import { AiFillFolderAdd } from "react-icons/ai";
import { getMaterial, getMaterials } from "../../redux/features/material/materialSlice";
import { getTask } from "../../redux/features/task/TaskSlice";
import { getJobs } from "../../redux/features/job/JobSlice";
import { selectDeliveryMaterial } from "../../redux/features/delivery/deliverySlice";
import { deleteDoJob } from "../../redux/features/dojob/DoJobSlice";

const getMaterialNameByDeliveryId = (deliveryId, deliveries, materials) => {
  const delivery = deliveries.find((delivery) => delivery._id === deliveryId);
  if (!delivery) return "Unknown Material";

  const material = materials.find((material) => material._id === delivery.materialId);
  return material ? material.name : "Unknown Material";
};
const DojobList = ({ dojobs, isLoading }) => {
  const { materials, isLoading: materialLoading, isError: materialError, message: materialMessage } = useSelector((state) => state.material);
  const { jobs, isLoading: jobLoading, isError: jobError, message: jobMessage } = useSelector((state) => state.job);
  const deliveries = useSelector((state) => state.delivery.deliveries);
  const [search, setSearch] = useState("");
  const filteredDojobs = useSelector(selectFilteredDoJobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FILTER_DOJOBS({ dojobs, search }));
  }, [dojobs, search, dispatch]);
  




  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const navigate = useNavigate()
  const delDojob = async (id) => {
    console.log(id)
   
    await dispatch(deleteDoJob(id))
  navigate(0)


  }
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Dojob",
      message: "Are you sure you want to delete this dojob.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delDojob(id),
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

    setCurrentItems(filteredDojobs.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredDojobs.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredDojobs]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredDojobs.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(getJobs());
    }
  }, [dispatch, jobs.length]);

  const getJobName = (id) => {
    const job = jobs.find((job) => job._id === id);
    return job ? job.name : "Unknown job";
  };
  const getJobPrice = (id) => {
    const job = jobs.find((job) => job._id === id);
    return job ? job.price : "Unknown price";
  };
  const getDeliveryQuantity = (id) => {
    const delivery = deliveries.find((delivery) => delivery._id === id);
    return delivery ? delivery.quantity : "Unknown price";
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };




  return (
    <div className="dojob-list">

      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Do Job List</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeHolder="Search do job"
            />
          </span>
        </div>

        {isLoading && <Spinner />}

        <div className="table d-flex">
          {!isLoading && dojobs.length === 0 ? (
            <p>-- No dojob found, please add a dojob...</p>
          ) : (
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Job</th>
               
                  <th>Material</th>
                  <th>Price</th>


                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((dojob, index) => {
                  const { _id, jobId, deliveryId } = dojob;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{getJobName(jobId)}</td>

                      <td>{getMaterialNameByDeliveryId(deliveryId, deliveries, materials)}</td>
                      <td>{formatPrice(getDeliveryQuantity(deliveryId)*getJobPrice(jobId))}</td>

                      <td >

                        <span className=" me-2">
                          <Link className="icons" to={`/edit-dojob/${_id}`}>
                            <FaEdit size={20} />
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

export default DojobList;