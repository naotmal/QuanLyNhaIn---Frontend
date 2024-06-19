import React, { useEffect, useState } from "react";
import { Spinner } from "../../loader/Loader";
import "./ReceiptList.scss"
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_RECEIPTS,
  selectFilteredReceipts,

} from "../../../redux/features/material/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteReceipt,
  getReceipt,
  getReceipts,
  selectReceiptId
} from "../../../redux/features/receipt/receiptSlice";
import { Link } from "react-router-dom";
import { AiFillFolderAdd } from "react-icons/ai";
import { getMaterials } from "../../../redux/features/material/materialSlice";


const ReceiptList = ({ receipts, isLoading }) => {
  const { materials, isLoading: materialLoading, isError: materialError, message: materialMessage } = useSelector((state) => state.material);
  const [search, setSearch] = useState("");
  const filteredReceipts = useSelector(selectFilteredReceipts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (materials.length === 0) {
      dispatch(getMaterials());
    }
  }, [dispatch, materials.length]);

  const getMaterialName = (id) => {
    const material = materials.find((material) => material._id === id);
    return material ? material.name : "Unknown Material";
  };



  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const delReceipt = async (id) => {
    console.log(id)
    await dispatch(deleteReceipt(id))
    await dispatch(getReceipts())
  }
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Material",
      message: "Are you sure you want to delete this material.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delReceipt(id),
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

    setCurrentItems(filteredReceipts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredReceipts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredReceipts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredReceipts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_RECEIPTS({ receipts, search }));
  }, [receipts, search, dispatch]);



  return (
    <div className="receipt-list">

      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Receipt List</h3>
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
          {!isLoading && receipts.length === 0 ? (
            <p>-- No receipt found, please add a receipt...</p>
          ) : (
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Material</th>
                  <th>Quantity</th>
                  <th>Created at</th>


                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((receipt, index) => {
                  const { _id, quantity, createAt, materialId } = receipt;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{getMaterialName(materialId)}</td>

                      <td>{quantity}</td>
                      <td>{new Date(createAt).toLocaleDateString("vi-VN")}</td>



                      <td >

                        <span className=" me-2">
                          <Link className="icons" to={`/edit-receipt/${_id}`}>
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

export default ReceiptList;