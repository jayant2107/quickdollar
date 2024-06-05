import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkOutline } from "react-icons/io5";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import EditGiftCardModal from "../../../Components/EditAllGiftCardModal/EditGiftCardModal";
import TableAction from "../../../Components/TableNew/TableActions";
import { debounce } from "../../../Utils/CommonFunctions";
import { getAllGiftCard } from "../../../Services/Collection";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
 
const AllGiftCards = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [loader, setLoader] = useState();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(5);
  const [search, setSearch] = useState("");
  const byTheme = useSelector((state) => state?.changeColors?.theme);
 
  const handleSearch = useCallback(
    debounce((value) => setSearch(value)),
    []
  );
 
  const fetchData = async () => {
    setLoader(true);
    try {
      let params = new URLSearchParams();
      search && params.append("search", search);
      params.append("page", currentPage);
      params.append("limit", pageSize);
      const res = await getAllGiftCard(params);
      if (res?.status === 200) {
        console.log(res?.data?.findGiftCards);
        setUserData(res?.data?.findGiftCards || []);
        setTotalUsers(res?.data?.totalGiftCards || 0);
      } else {
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
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
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render:(text,record)=>record?.giftcard?.giftCardName || "NA"
    },
    {
      key: "country",
      title: "Gift Card Image",
      dataIndex: "image",
      render: (text, record) => (
        <TableImageWrapper>
          <img src={record?.giftCardImage} alt="" />
        </TableImageWrapper>
      ),
    },
    {
      title: "Gift Card Price",
      dataIndex: "giftCardPoints",
      key: "price",
      render:(text,record)=>record?.giftCardPoints || "NA"
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (text, record) => (
        <StatusStyledText
          status={record.isActive ? "Active" : "Inactive"}
        >
          {record.isActive ? "Active" : "Inactive"}
          {record.isActive ? (
            <IoCheckmarkOutline style={{ color: "white", fontSize: "20px" }} />
          ) : (
            <RxCross2 style={{ color: "white", fontSize: "20px" }} />
          )}
        </StatusStyledText>
      ),
      // Test commit
    },
 
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdat",
      render: (text, record) => {
        const date = DateTime.fromISO(record?.createdAt);
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
          edit={formActions.edit}
          deleteAction={formActions.delete}
          onEdit={() => showEditModal(record)}
          onDelete={() => showDeleteModal(record)}
        />
      ),
    },
  ];
 
  const scrollConfig = {
    x: 1000,
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
 
  const formActions = {
    apply: false,
    edit: true,
    delete: true,
  };
 
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
 
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, search]);
 
  return (
    <AllUserWrapper byTheme={byTheme}>
      <div className="allUsersHeader">
        {deleteModal && (
          <DeleteModal
            showModal={showDeleteModal}
            handleCancel={handleDeleteCancel}
            deleteModal={deleteModal}
            record={selectedRecord}
          />
        )}
        {editModal && (
          <EditGiftCardModal
            showEditModal={showEditModal}
            handleEditCancel={handleEditCancel}
            editModal={editModal}
            record={selectedRecord}
          />
        )}
        <h1 className="allUsersHeading">All Gift Card</h1>
      </div>
 
      <div className="tableDiv">
        <TableNew
          columns={columns}
          data={userData}
          scroll={scrollConfig}
          loader={loader}
          pagination={paginationConfig}
          handleSearch={handleSearch}
        />
      </div>
    </AllUserWrapper>
  );
};
 
export default AllGiftCards;
 
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
    background: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
  }
`;
 
const TableImageWrapper = styled.div`
  img {
    width: 100px;
    object-fit: contain;
  }
`;
 
const StatusStyledText = styled.span`
  color: #fff;
  background-color: ${({ status }) =>
    status === "Active" ? "#00e633" : "red"};
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  text-transform: capitalize;
`;
 