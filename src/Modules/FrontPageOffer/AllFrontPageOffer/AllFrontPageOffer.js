import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { getAllFrontPage } from "../../../Services/Collection";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import TableAction from "../../../Components/TableNew/TableActions";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import EditFrontpageModal from "../../../Components/EditFrontpageModal/EditFrontpageModal";
import { debounce, srcSortImage } from "../../../Utils/CommonFunctions";
import { deleteFrontpageOffer } from "../../../Services/Collection";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";

const AllFrontPageOffer = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [loader, setLoader] = useState();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(5);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [search, setSearch] = useState("");
  const [fieldName, setFieldName] = useState("createdAt");
  const [orderMethod, setorderMethod] = useState("desc");

  const handleSearch = useCallback(
    debounce((value) => {
      setSearch(value);
      setCurrentPage(1);
    }),
    []
  );
  const fetchData = async () => {
    setLoader(true);
    try {
      let params = new URLSearchParams();
      search && params.append("search", search);
      params.append("page", currentPage);
      params.append("limit", pageSize);
      params.append("fieldName", fieldName);
      params.append("orderMethod", orderMethod);
      console.log("Fetch Params:", params.toString());
      const res = await getAllFrontPage(params);
      if (res?.status === 200) {
        console.log(res, "all frontpage");
        setUserData(res?.msg?.findUser || []);
        setTotalUsers(res?.msg?.totalUsers || 0);
      } else {
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
        setUserData([]);
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = async (id) => {
    let res = await deleteFrontpageOffer(id);
    if (res?.status === 200) {
      await fetchData();
    }
    return res;
  };
  const handleSort = (columnKey) => {
    let newOrder;
    // If the clicked column is the same as the currently sorted column, toggle the sorting order
    if (columnKey === fieldName) {
      newOrder = orderMethod === "asc" ? "desc" : "asc";
    } else {
      // If a new column is clicked, set the sorting order to ascending by default
      newOrder = "asc";
      // Reset sorting order for other columns
      setorderMethod("asc");
    }
    console.log("Sort Field:", columnKey);
    console.log("Sort Order:", newOrder);
    setFieldName(columnKey);
    setorderMethod(newOrder);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: (
        <div
          onClick={() => handleSort("frontpageofferTitle")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Offer Text{" "}
          <img
            src={srcSortImage("frontpageofferTitle", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),

      dataIndex: "frontpageofferTitle",
      key: "offertext",
      fixed: "left",
      render: (text, record) => (
        <Tooltip title={record?.frontpageofferTitle || "NA"} placement="top">
          <TooltipContent>{record?.frontpageofferTitle || "NA"}</TooltipContent>
        </Tooltip>
      ),
    },
    {
      title: (
        <div
          onClick={() => handleSort("frontpageofferLink")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Offer Link{" "}
          <img
            src={srcSortImage("frontpageofferLink", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),

      dataIndex: "frontpageofferLink",
      key: "offerlink",
      render: (text, record) =>
        <Tooltip title={record?.frontpageofferLink || "NA"} placement="top">
          <TooltipContent><Link to="#">{record?.frontpageofferLink || "NA"}</Link></TooltipContent>
        </Tooltip>
       
    },
    {
      title: (
        <div
          onClick={() => handleSort("frontpageofferImage")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Offer Image{" "}
          <img
            src={srcSortImage("frontpageofferImage", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),

      dataIndex: "frontpageofferImage",
      key: "offerimage",
      render: (text, record) => (
        <TableImageWrapper>
          <img src={record?.frontpageofferImage} alt="NA" />
        </TableImageWrapper>
      ),
    },
    {
      title: (
        <div
          onClick={() => handleSort("frontpageofferButton")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Offer Button Image{" "}
          <img
            src={srcSortImage("frontpageofferButton", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),
      dataIndex: "frontpageofferButton",
      key: "offerbuttonimage",
      render: (text, record) => (
        <TableImageWrapper>
          <img src={record?.frontpageofferButton} alt="NA" />
        </TableImageWrapper>
      ),
    },
    {
      title: (
        <div
          onClick={() => handleSort("createdAt")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Created Date{" "}
          <img
            src={srcSortImage("createdAt", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),

      dataIndex: "createdAt",
      key: "createdat",
      render: (text, record) => {
        if (!record?.createdAt) return "NA";
        const date = DateTime.fromISO(record?.createdAt);
        return date.toFormat("MMM dd yyyy, HH : mm : ss");
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <TableAction
          apply={formActions.apply}
          edit={formActions.edit}
          deleteAction={formActions.delete}
          onEdit={() => showEditModal(record)}
          onDelete={() => showDeleteModal(record)}
        />
      ),
    },
  ];

  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: totalUsers,
    onChange: setCurrentPage,
    onShowSizeChange: (current, size) => {
      setPageSize(size);
      setCurrentPage(1); // Reset to first page whenever page size changes
    },
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "15", "20"], // Include both options: 5 and 10
    // showQuickJumper: true,
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
  };
  const scrollConfig = {
    x: 1000, // Horizontal scrolling
  };
  const formActions = {
    apply: false,
    view: false,
    edit: true,
    delete: true,
  };
  const showEditModal = (record) => {
    setSelectedRecord(record);
    setEditModal(true);
  };

  const showDeleteModal = (record) => {
    setSelectedRecord(record);
    setDeleteModal(true);
  };

  const handleEditCancel = () => {
    setEditModal(false);
    setSelectedRecord(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModal(false);
    setSelectedRecord(null);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, search, fieldName, orderMethod]);

  document.title = "Front Page Offers";
  return (
    <AllUserWrapper byTheme={byTheme}>
      {deleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          handleCancel={handleDeleteCancel}
          deleteModal={deleteModal}
          id={selectedRecord.idfrontpageoffer}
          handleDelete={handleDelete}
        />
      )}
      {EditFrontpageModal && (
        <EditFrontpageModal
          showEditModal={showEditModal}
          handleEditCancel={handleEditCancel}
          editModal={editModal}
          record={selectedRecord}
          viewLoader={loader}
          fetchData={fetchData}
        />
      )}

      <div className="allabusedUserHeader">
        <h1 className="allabusedUserHeading">All Front Page Offers</h1>
        {/* <button>Export User Details</button> */}
      </div>

      <div className="tableDiv">
        <TableNew
          columns={columns}
          data={userData}
          scroll={scrollConfig}
          loader={loader}
          pagination={paginationConfig}
          handleSearch={handleSearch}
          onChange={handleSort}
        />
      </div>
    </AllUserWrapper>
  );
};

export default AllFrontPageOffer;

const AllUserWrapper = styled.div`
  padding-bottom: 35px;
  @media (max-width: 550px) {
    padding-bottom: 25px;
  }

  .allabusedUserHeading {
    display: flex;
    font-weight: 600;
    font-size: 24px;
    margin: 20px 0px 20px 0px;
    font-family: ${({ theme }) => theme?.fontFamily};
    color: ${({ byTheme }) => (byTheme === "day" ? "#000" : "#fff")};
    @media (max-width: 550px) {
      margin: 0px;
      margin-top: 67px;
      font-size: 20px;
      margin-bottom: 20px;
    }
  }

  .allabusedUserHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    @media (max-width: 550px) {
      display: block;
    }
    button {
      box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
      font-weight: 600;
      border-radius: 10px;
      border: none;
      padding: 11px 30px;
      cursor: pointer;
      color: ${({ theme }) => theme?.primaryColor};
      background: ${({ theme }) => theme?.secondaryColor};
      font-family: ${({ theme }) => theme?.fontFamily};
    }
  }

  .tableDiv {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    margin-top: 20px;
    box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
    background: rgb(255, 255, 255);
    border-radius: 10px;
  }
`;

const TableImageWrapper = styled.div`
  img {
    width: 100px;
    object-fit: contain;
  }
`;
const TooltipContent = styled.div`
  max-height: 4.5em; // Approx. three lines
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; // Limit to three lines
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
  padding: 8px;
  margin: 8px 0px;
`;
