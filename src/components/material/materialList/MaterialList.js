import React, { useEffect, useState } from "react";
import { Spinner } from "../../loader/Loader";
import "./MaterialList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredMaterials,
} from "../../../redux/features/material/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteMaterial,
  getMaterials,
} from "../../../redux/features/material/materialSlice";
import { Link } from "react-router-dom";
import { AiFillFolderAdd } from "react-icons/ai";

const MaterialList = ({ materials, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredMaterials = useSelector(selectFilteredMaterials);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delMaterial = async (id) => {
    console.log(id);
    await dispatch(deleteMaterial(id));
    await dispatch(getMaterials());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Material",
      message: "Are you sure you want to delete this material.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delMaterial(id),
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

    setCurrentItems(filteredMaterials.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredMaterials.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredMaterials]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredMaterials.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ materials, search }));
  }, [materials, search, dispatch]);

  return (
    <div className="material-list">
      
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeHolder="Search material"
            />
          </span>
        </div>

        {isLoading && <Spinner />}

        <div className="table d-flex">
          {!isLoading && materials.length === 0 ? (
            <p>-- No material found, please add a material...</p>
          ) : (
            <table style={{width:"100%"}}>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
    
                  <th>Quantity</th>
                  
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((material, index) => {
                  const { _id, name, category, quantity } = material;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      
                      <td>{quantity}</td>
                      
                      <td >
                        <span className=" me-2">
                          <Link className="icons" to={`/material-detail/${_id}`}>
                            <AiOutlineEye size={25}  />
                          </Link>
                        </span>
                        <span className=" me-2">
                          <Link className="icons" to={`/edit-material/${_id}`}>
                            <FaEdit size={20}  />
                          </Link>
                        </span>
                        <span className=" me-2">
                        <Link className="icons" to={`/add-receipt/${_id}`}>
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

export default MaterialList;