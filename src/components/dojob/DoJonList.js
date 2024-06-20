import React, { useEffect, useState } from "react";
import { Spinner } from "../loader/Loader";
import "./DojobList.scss"
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Search from "../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_DELIVERIES,

} from "../../redux/features/material/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { Link } from "react-router-dom";
import { AiFillFolderAdd } from "react-icons/ai";
import { getMaterials } from "../../redux/features/material/materialSlice";
import { getTasks } from "../../redux/features/task/TaskSlice";


const DojobList = ({ dojobs, isLoading }) => {
  const { materials, isLoading: materialLoading, isError: materialError, message: materialMessage } = useSelector((state) => state.material);
  const { jobs, isLoading: jobLoading, isError: jobError, message: jobMessage } = useSelector((state) => state.job);
  const [search, setSearch] = useState("");
  //const filteredDojobs = useSelector("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (materials.length === 0) {
      dispatch(getMaterials());
    }
  }, [dispatch, materials.length]);

  const getJobName = (id) => {
    const job = jobs.find((job) => job._id === id);
    return job ? job.name : "Unknown Material";
  };



  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const delDojob = async (id) => {
    console.log(id)
   
    await dispatch(getMaterials())
    await dispatch(getTasks())

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





//   //   Begin Pagination
//   const [currentItems, setCurrentItems] = useState([]);
//   const [pageCount, setPageCount] = useState(0);
//   const [itemOffset, setItemOffset] = useState(0);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const endOffset = itemOffset + itemsPerPage;

//     setCurrentItems(filteredDojobs.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(filteredDojobs.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage, filteredDojobs]);

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % filteredDojobs.length;
//     setItemOffset(newOffset);
//   };
//   //   End Pagination

  useEffect(() => {
    dispatch(FILTER_DELIVERIES({ dojobs, search }));
  }, [dojobs, search, dispatch]);



  return (
    <div className="dojob-list">

      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Dojob List</h3>
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
          {!isLoading && dojobs.length === 0 ? (
            <p>-- No dojob found, please add a dojob...</p>
          ) : (
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Job</th>
               
                  <th>Created at</th>


                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {dojobs.map((dojob, index) => {
                  const { _id, jobId, createAt, deliveryId } = dojob;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{}</td>

                      <td>{quantity}</td>
                      <td>{new Date(createAt).toLocaleDateString("vi-VN")}</td>



                      <td >

                        <span className=" me-2">
                          <Link className="icons" to={`/edit-dojob/${_id}`}>
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
        {/* <ReactPaginate
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
        /> */}
      </div>
    </div>
  );
};

export default DojobList;