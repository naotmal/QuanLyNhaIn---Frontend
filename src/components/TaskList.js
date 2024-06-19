import React, { useEffect, useState } from "react";
import { Spinner } from "../components/loader/Loader";
//import "../../material/materialList/MaterialList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../components/search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_TASKS,
  selectFilteredTasks,
} from "../redux/features/material/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./TaskList.scss"
import {
  deleteTask,
  getTasks,
} from "../redux/features/task/TaskSlice";
import { Link } from "react-router-dom";
import { AiFillFolderAdd } from "react-icons/ai";

import { getClients, selectClients } from "../redux/features/client/clientSlice";
import ChangeProgress from "./changeProgress/ChangeProgress";

const TaskList = ({ tasks, isLoading }) => {
    const clients = useSelector(selectClients)
  const [search, setSearch] = useState("");
  const filteredTasks = useSelector(selectFilteredTasks);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delTask = async(id)=>{
    console.log(id)
    await dispatch(deleteTask(id))
    await dispatch(getTasks())
  }
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Material",
      message: "Are you sure you want to delete this material.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delTask(id),
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

    setCurrentItems(filteredTasks.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredTasks.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredTasks]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredTasks.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_TASKS({ tasks, search }));
  }, [tasks, search, dispatch]);

  useEffect(()=>{
    dispatch(getClients())
  },[dispatch])

  const getClientName = (clientId) =>{
    const client = clients.find((client)=>client._id === clientId)
    return client ? client.name: "Unknown"
  }
  const getProgressStatus = (progress) =>{
    switch(progress){
      case '1':
        return 'Not Started';
        case '2':
        return 'To Do';
        case '3':
        return 'Doing';
        case '4':
        return 'Done';
    }
  }
  return (
    <div className="task-list">
      
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Task list</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeHolder="Search task"
            />
          </span>
        </div>

        {isLoading && <Spinner />}

        <div className="table d-flex">
          {!isLoading && tasks.length === 0 ? (
            <p>-- No task found, please add a task...</p>
          ) : (
            <table style={{width:"100%"}}>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Client</th>
    
                  <th>Progress</th>
                  <th>Change Progress</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((task, index) => {
                  const { _id, name, clientId, progress, quantity, unit, price} = task;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{getClientName(clientId)}</td>
                      
                      <td>{getProgressStatus(progress)}</td>
                      <td><ChangeProgress _id={_id}/></td>
                      <td>{quantity}</td>
                      <td>{unit}</td>
                      <td>{price}</td>
                      
                      
                      <td >
                        <span className=" me-2">
                          <Link className="icons" to={`/task-detail/${_id}`}>
                            <AiOutlineEye size={25}  />
                          </Link>
                        </span>
                        <span className=" me-2">
                          <Link className="icons" to={`/edit-task/${_id}`}>
                            <FaEdit size={20}  />
                          </Link>
                        </span>
                        <span className=" me-2">
                        <Link className="icons" to={`/add-delivery/${_id}`}>
                            <AiFillFolderAdd size={20}  />
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

export default TaskList;