import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import TableAction from "../../../Components/TableNew/TableActions";
import EditUserModal from "../../../Components/EditModal/EditUserModal";
import SendModal from "../../../Components/SendModal/SendModal";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import ActiveModal from "../../../Components/ActiveModal/ActiveModal";

const AllAbusedUsers = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [loader, setLoader] = useState();
  const [editModal, setEditModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [activeModal, setActiveModal] = useState(false); // State for active modal

  const columns = [
    {
      title: "Full Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => (
        <RoleStyledText role={record.role}>{record.role}
        {record.role === "Admin" ? (
          <RiAdminFill style={{ color: "white",fontSize:'20px' }} />
        ) : (
          <FaUser style={{ color: "white",fontSize:'20px' }} />
        )}</RoleStyledText>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <StatusStyledText status={record.status} onClick={() => showActiveModal(record)}>
          {record.status}
          {record.status === "Active" ? (
            <IoCheckmarkOutline style={{ color: "white",fontSize:'20px' }} />
          ) : (
            <RxCross2 style={{ color: "white",fontSize:'20px' }} />
          )}
        </StatusStyledText>
      ),
    },
    {
      title: "UserType",
      dataIndex: "usertype",
      key: "usertype",
      render: (text, record) => (
        <StyledText color="orange">{record.usertype}</StyledText>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdat",
      key: "createdat",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (text, record) => (
        <TableAction
          apply={formActions.apply}
          view={formActions.view}
          edit={formActions.edit}
          deleteAction={formActions.delete}
          onSend={() => showSendModal(record)}
          onEdit={() => showEditModal(record)}
          onDelete={() => showDeleteModal(record)}
        />
      ),
    },
  ];

  const userData = [
    {
      key: 1,
      name: "John Doe",
      country: "USA",
      points: 100,
      role: "Admin",
      status: "Active",
      usertype: "Web",
      createdat: "2024-05-29",
    },
    {
      key: 2,
      name: "Jane Smith",
      country: "Canada",
      points: 75,
      role: "User",
      status: "Deactivate",
      usertype: "Android",
      createdat: "2024-05-28",
    },
  ];

  const scrollConfig = {
    x: 1500, // Horizontal scrolling
  };

  const formActions = {
    apply: true,
    edit: true,
    delete: true,
  };

  const showSendModal = (record) => {
    setSelectedRecord(record);
    setSendModal(true);
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

  const handleSendCancel = () => {
    setSendModal(false);
    setSelectedRecord(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModal(false);
    setSelectedRecord(null);
  };

  const showActiveModal = (record) => {
    setSelectedRecord(record);
    setActiveModal(true);
  };
  const handleActiveCancel = () => {
    setActiveModal(false);
    setSelectedRecord(null);
  };

  return (
    <AllAbusedUserWrapper byTheme={byTheme}>
      {deleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          handleCancel={handleDeleteCancel}
          deleteModal={deleteModal}
          record={selectedRecord}
        />
      )}
      {editModal && (
        <EditUserModal
          showEditModal={showEditModal}
          handleEditCancel={handleEditCancel}
          editModal={editModal}
          record={selectedRecord}
          viewLoader={loader}
        />
      )}
      {sendModal && (
        <SendModal
          showSendModal={showSendModal}
          handleSendCancel={handleSendCancel}
          sendModal={sendModal}
          record={selectedRecord}
        />
      )}
      {/* Active modal */}
      {activeModal && (
        <ActiveModal
          handleCancel={() => setActiveModal(false)}
          activeModal={activeModal}
          handleConfirm={handleActiveCancel}
        />
      )}
      <div className="allAbusedUserHeader">
        <h1 className="allAbusedUserHeading">All Abused Users</h1>
        {/* <button>Export User Details</button> */}
      </div>

      <div className="tableDiv">
        <TableNew columns={columns} data={userData} scroll={scrollConfig} loader={loader} />
      </div>
    </AllAbusedUserWrapper>
  );
};

export default AllAbusedUsers;

const AllAbusedUserWrapper = styled.div`
font-family: ${({ theme }) => theme?.fontFamily};
  padding-bottom: 35px;
  @media (max-width: 550px) {
    padding-bottom: 25px;
  }

  .allAbusedUserHeading {
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

  .allAbusedUserHeader {
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

const RoleStyledText = styled.span`
  color: #fff;
  background-color: ${({ role }) => (role === "Admin" ? "#0caf60" : "#00a1e6")};
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const StatusStyledText = styled.span`
  color: #fff;
  background-color: ${({ status }) => (status === "Active" ? "#00e633" : "red")};
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor:pointer;
`;

const StyledText = styled.span`
  color: #fff;
  background: linear-gradient(97.43deg, rgb(47, 128, 237) 0%, rgb(86, 204, 242) 100%);
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;

`;

