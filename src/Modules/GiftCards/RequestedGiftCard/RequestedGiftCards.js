import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkOutline } from "react-icons/io5";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import TableAction from "../../../Components/TableNew/TableActions";
import EditGiftCardModal from "../../../Components/EditAllGiftCardModal/EditGiftCardModal";
import { toast } from "react-toastify";
import { deleteGiftCard, getRequestedGiftCard } from "../../../Services/Collection";
import { debounce } from "../../../Utils/CommonFunctions";
import { DateTime } from "luxon";

const RequestGiftCard = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [loader, setLoader] = useState();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(5);
  const [search, setSearch] = useState("");
  const [fieldName, setFieldName] = useState("createdAt");
  const [orderMethod, setorderMethod] = useState("asc");

   const handleSearch = useCallback(
    debounce((value) => {
      setSearch(value);
      setCurrentPage(1);
    }),
    []
  );  const fetchData = async () => {
    setLoader(true);
    try {
      let params = new URLSearchParams();
      search && params.append("search", search);
      params.append("page", currentPage);
      params.append("limit", pageSize);
      params.append("fieldName", fieldName);
      params.append("orderMethod", orderMethod);
      console.log("Fetch Params:", params.toString());
      const res = await getRequestedGiftCard(params);
      if (res?.status === 200) {
        console.log(res?.data?.findRequestedGiftCards, "dfghjk ");
        setUserData(res?.data?.findRequestedGiftCards || []);
        setTotalUsers(res?.data?.totalRequestedGiftCards || 0);
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

  const columns = [
    {
      title: "Gift Card Name",
      width: 150,
      dataIndex: "giftCardName",
      key: "giftname",
      fixed: "left",
      render: (text, record) => record?.giftcard?.giftCardName || "NA",
      sorter: true,
      sortOrder: fieldName === "giftCardName" ? orderMethod : false,
    },
    {
      title: "Gift Card Price",
      dataIndex: "giftCardPoints",
      key: "price",
      render: (text, record) => record?.giftcard?.giftCardPoints || "NA",
      sorter: true,
      sortOrder: fieldName === "giftCardPoints" ? orderMethod : false,
    },
    {
      title: "User Name",
      dataIndex: "firstName",
      key: "name",
      render: (text, record) => {
        const capitalizeFirstLetter = (str) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
        };
        const capitalizedFirstName = capitalizeFirstLetter(
          record?.user?.firstName || ""
        );
        const capitalizedLastName = capitalizeFirstLetter(
          record?.user?.lastName || ""
        );
        const fullName =
          `${capitalizedFirstName} ${capitalizedLastName}`.trim();
        return fullName ? fullName : "NA";
      },
      sorter: true,
      sortOrder: fieldName === "firstName" ? orderMethod : false,
    },
    {
      title: "User Total Amount",
      dataIndex: "giftCardPoints",
      key: "price",
      render: (text, record) => record?.giftCardPoints || "NA",
      sorter: true,
      sortOrder: fieldName === "giftCardPoints" ? orderMethod : false,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "status",
      width: 150,
      render: (text, record) => (
        <StatusStyledText status={record?.Status ? "Completed" : "InCompleted"}>
          {record.Status ? "Completed" : "InCompleted"}
          {record.Status ? (
            <IoCheckmarkOutline style={{ color: "white", fontSize: "20px" }} />
          ) : (
            <RxCross2 style={{ color: "white", fontSize: "20px" }} />
          )}
        </StatusStyledText>
      ),
      sorter: true,
      sortOrder: fieldName === "Status" ? orderMethod : false,
    },

    {
      title: "Send Reward",
      dataIndex: "reward",
      key: "reward",
    },
    
    {
      title: "Requested Date",
      dataIndex: "createdAt",
      key: "requesteddate",
      render: (text, record) => {
        const date = DateTime.fromISO(record?.giftcard?.updatedAt);
        return date.toFormat("MMM dd yyyy, HH : mm : ss");
      },
      sorter: true,
      sortOrder: fieldName === "createdAt" ? orderMethod : false,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
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
    x: 1000,
  };

  const showEditModal = (record) => {
    setSelectedRecord(record);
    setEditModal(true);
  };
  const handleDelete=async(id)=>{
    let res = await deleteGiftCard(id);
    if (res?.status === 200) {
      await fetchData()
    }
    return res;
   

  }

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

  const formActions = {
    apply: false,
    edit: true,
    delete: true,
  };
  const handleTableChange = (pagination, filters, sorter) => {
    let order;
    if (fieldName === sorter.field) {
      // If the same column is clicked again, toggle the sorting order
      order = orderMethod === "asc" ? "desc" : "asc";
    } else {
      // If a new column is clicked, set the sorting order to ascending by default
      order = "asc";
    }
    console.log("Sorter Field:", sorter.field);
    console.log("Sort Order:", order);
    setFieldName(sorter.field);
    setorderMethod(order);
    setCurrentPage(pagination.current);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, search, fieldName, orderMethod]);
  return (
    <AllUserWrapper byTheme={byTheme}>
      <div className="allUsersHeader">
        {deleteModal && (
          <DeleteModal
            showModal={showDeleteModal}
            handleCancel={handleDeleteCancel}
            handleDelete={handleDelete}
            deleteModal={deleteModal}
            id={selectedRecord.idRequestedGiftCard}
          />
        )}
        {editModal && (
          <EditGiftCardModal
            showEditModal={showEditModal}
            handleEditCancel={handleEditCancel}
            editModal={editModal}
            record={selectedRecord}
            fetchData={fetchData}
          />
        )}
        <h1 className="allUsersHeading">Requested Gift Cards</h1>
      </div>

      <div className="tableDiv">
        <TableNew
          columns={columns}
          data={userData}
          scroll={scrollConfig}
          loader={loader}
          pagination={paginationConfig}
          handleSearch={handleSearch}
          onChange={handleTableChange}
        />
      </div>
    </AllUserWrapper>
  );
};

export default RequestGiftCard;

const AllUserWrapper = styled.div`
  padding-bottom: 35px;
  @media (max-width: 550px) {
    padding-bottom: 25px;
  }

  .allUsersHeading {
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

  .allUsersHeader {
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

const StatusStyledText = styled.span`
  color: #fff;
  background-color: ${({ status }) =>
    status === "Completed" ? "#00e633" : "red"};
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  text-transform: capitalize;
`;
