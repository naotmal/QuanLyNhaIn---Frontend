import React, { useEffect, useState } from "react";
import { Spinner } from "../../loader/Loader";
import "../../material/materialList/MaterialList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_CLIENTS,
  selectFilteredClients,
} from "../../../redux/features/material/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteClient,
  getClients,
} from "../../../redux/features/client/clientSlice";
import { Link } from "react-router-dom";
import { AiFillFolderAdd } from "react-icons/ai";
import "./ClientList.scss"
import { IoMdAdd } from "react-icons/io";
import { SaleLink } from "../../protect/hiddenLink";


const ClientList = ({ clients, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredClients = useSelector(selectFilteredClients);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delClient = async (id) => {
    console.log(id)
    await dispatch(deleteClient(id))
    await dispatch(getClients())
  }
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Material",
      message: "Are you sure you want to delete this material.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delClient(id),
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

    setCurrentItems(filteredClients.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredClients.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredClients]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredClients.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_CLIENTS({ clients, search }));
  }, [clients, search, dispatch]);

  return (
    <div className="client-list">

      <div className="table">
        <div className="--flex-between --flex-dir-column">
        <span className="d-flex">
            <h3>Client list</h3>
            <SaleLink>
            <Link className="--btn --btn-primary mt-2 mb-4" to={`/add-client`}>
                <IoMdAdd />
              </Link>
              </SaleLink>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeHolder="Search client"
            />
          </span>
        </div>

        {isLoading && <Spinner />}

        <div className="table d-flex">
          {!isLoading && clients.length === 0 ? (
            <p>-- No client found, please add a client...</p>
          ) : (
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Phone</th>

                  <th>Email</th>

                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((client, index) => {
                  const { _id, name, phone, email, address } = client;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{phone}</td>

                      <td>{email}</td>
                      <td>{address}</td>

                      <td >
                        <span className=" me-2">
                          <Link className="icons" to={`/client-detail/${_id}`}>
                            <AiOutlineEye size={25} />
                          </Link>
                        </span>
                        <span className=" me-2">
                          <Link className="icons" to={`/edit-client/${_id}`}>
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

export default ClientList;