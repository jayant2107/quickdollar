import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkOutline } from "react-icons/io5";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import TableAction from "../../../Components/TableNew/TableActions";
import { toast } from "react-toastify";
import {
  deleteRequestedGiftCard,
  getRequestedGiftCard,
  editRequestedGiftCard,
} from "../../../Services/Collection";
import { debounce, srcSortImage } from "../../../Utils/CommonFunctions";
import { DateTime } from "luxon";
import EditRequestGiftCard from "../../../Components/EditRequestedGiftCard/EditRequestesGiftCard";
import { Button, Switch } from "antd";

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
  const [fieldName, setFieldName] = useState("updatedAt");
  const [orderMethod, setorderMethod] = useState("desc");
  const [orderType, setOrderType] = useState("3");
  const [sentRewards, setSentRewards] = useState({});
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
      params.append("orderType", orderType);
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

  const handleSort = (columnKey, type) => {
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
    setOrderType(type)
    setCurrentPage(1);
  };


  const handleSendReward = async(recordId) => {
    console.log(`Send reward button clicked for record ID: ${recordId}`);
    setSentRewards((prevStatus) => {
      const newStatus = { ...prevStatus, [recordId]: true };
      console.log("Updated sendStatus:", newStatus);
      return newStatus;
    });
    const payload={
      id:recordId,
      sendRewards:1,
    }
    try {
      setLoader(true)
      const res = await editRequestedGiftCard(payload);
      setLoader(false)
      if (res?.status === 200) {
        await fetchData()
        toast.success("Reward Sent");
      } else {
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
        toast.error(message);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.message || "Something went wrong");
    }
  };

  const columns = [
    {
      title: (
        <div
          onClick={() => handleSort("giftCardName", "2")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Gift Card Name{" "}
          <img
            src={srcSortImage("giftCardName", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),
      width: 150,
      dataIndex: "giftCardName",
      key: "giftname",
      fixed: "left",
      render: (text, record) => record?.Giftcard?.giftCardName || "NA",
    },
    {
      title: (
        <div
          onClick={() => handleSort("giftCardPoints", "2")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Gift Card Price{" "}
          <img
            src={srcSortImage("giftCardPoints", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),
      dataIndex: "giftCardPoints",
      key: "price",
      render: (text, record) => record?.Giftcard?.giftCardPoints || "NA",
    },
    {
      title: (
        <div
          onClick={() => handleSort("firstName", "1")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          User Name{" "}
          <img
            src={srcSortImage("firstName", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),

      dataIndex: "firstName",
      key: "name",
      render: (text, record) => {
        const capitalizeFirstLetter = (str) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
        };
        const capitalizedFirstName = capitalizeFirstLetter(
          record?.User?.firstName || ""
        );
        const capitalizedLastName = capitalizeFirstLetter(
          record?.User?.lastName || ""
        );
        const fullName =
          `${capitalizedFirstName} ${capitalizedLastName}`.trim();
        return fullName ? fullName : "NA";
      },
    },
    {
      title: (
        <div
          onClick={() => handleSort("giftCardPoints", "3")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          User Total Amount{" "}
          <img
            src={srcSortImage("giftCardPoints", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),

      dataIndex: "giftCardPoints",
      key: "price",
      render: (text, record) => record?.User?.Points || "NA",

    },
    {

      title: (
        <div
          onClick={() => handleSort("Status", "3")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Status{" "}
          <img
            src={srcSortImage("Status", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />  
        </div>
      ),
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
    },

    {
      title: "Send Reward",
      dataIndex: "reward",
      key: "reward",
      render: (text, record) => (
        <>
          {record?.Status ? (
            <SentButton disabled={true}>Sent</SentButton>
          ) : (
            <SendButton
              sent={sentRewards[record.idRequestedGiftCard]}
              onClick={() => handleSendReward(record.idRequestedGiftCard)}
              disabled={sentRewards[record.idRequestedGiftCard]}
            >
              {sentRewards[record.idRequestedGiftCard] ? "Sent" : "Send"}
            </SendButton>
          )}
        </>
      
      ),
    },

    {
      title: (
        <div
          onClick={() => handleSort("updatedAt", "3")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Requested Date{" "}
          <img
            src={srcSortImage("updatedAt", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),

      dataIndex: "updatedAt",
      key: "requesteddate",
      render: (text, record) => {
        if (record?.updatedAt === null) {
          return "NA"
        }
        const date = DateTime.fromISO(record?.updatedAt);
        return date.toFormat("MMM dd yyyy, HH : mm : ss");
      },
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

  const handleDelete = async (id) => {
    let res = await deleteRequestedGiftCard(id);
    if (res?.status === 200) {
      await fetchData();
    }
    return res;
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

  const formActions = {
    apply: false,
    edit: true,
    delete: true,
  };


  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, search, fieldName, orderMethod]);

  document.title = "Requested Gift Cards - quickdollarapp";


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
          <EditRequestGiftCard
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
          onChange={handleSort}
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
const SendButton = styled.button`
  background-color: ${({ sent }) => (sent ? "#ccc" : "rgb(0, 230, 51)")};
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 12px;
  cursor: ${({ sent }) => (sent ? "not-allowed" : "pointer")};
  opacity: ${({ sent }) => (sent ? 0.6 : 1)};
  &:hover {
    background-color: ${({ sent }) => (sent ? "#ccc" : "rgb(0, 230, 51)")};
  }
`;
const SentButton = styled.button`
  background-color:#ccc ;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 12px;
  cursor:  not-allowed 
  opacity: 0.6;
  &:hover {
    background-color: #ccc ;
  }
`;