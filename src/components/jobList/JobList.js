import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_JOBS, selectFilteredJobs } from '../../redux/features/material/filterSlice';
import Search from '../search/Search';
import { Spinner } from '../loader/Loader';
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { deleteJob, getJobs } from '../../redux/features/job/JobSlice';
import { confirmAlert } from "react-confirm-alert";
import "../material/materialList/MaterialList.scss"

const JobList = ({jobs, isLoading}) => {
    const [search, setSearch] = useState("");
    const filteredJobs = useSelector(selectFilteredJobs)

    const dispatch = useDispatch()
    const delJob = async (id) => {
        console.log(id)
        await dispatch(deleteJob(id))
        await dispatch(getJobs())
      }
      const confirmDelete = (id) => {
        confirmAlert({
          title: "Delete Job",
          message: "Are you sure you want to delete this job.",
          buttons: [
            {
              label: "Delete",
              onClick: () => delJob(id),
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

    setCurrentItems(filteredJobs.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredJobs.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredJobs]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredJobs.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(()=>{
    dispatch(FILTER_JOBS({jobs, search}))
  },[jobs, search, dispatch])
  return (
    <div className="material-list">
        <div className="table">
            <div className="--flex-between --flex-dir-column">
                <span>
                    <h3>Jobs List</h3>
                </span>
                <span>
                    <Search
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeHolder="Search job"
                    />
                </span>
            </div>
            {isLoading && <Spinner/>}
            <div className="table d-flex">
                {!isLoading && jobs.length === 0 ? (
                    <p>--No job, add a job</p>
                ):(
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((job, index)=>{
                                const {_id, name, price} = job;
                                return(
                                    <tr key={_id}>
                                        <td>{index + 1}</td>
                                        <td>{name}</td>
                                        <td>{price}</td>
                                        <td>
                                        <span className=" me-2">
                          <Link className="icons" to={`/job-detail/${_id}`}>
                            <AiOutlineEye size={25} />
                          </Link>
                        </span>
                        <span className=" me-2">
                          <Link className="icons" to={`/edit-job/${_id}`}>
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
                                )
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
  )
}

export default JobList