import React, { useState, useEffect } from "react";
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
import { getAllUser } from "../../../Services/Collection";
import { toast } from "react-toastify";
import { DateTime } from "luxon";

const AllUsers = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [loader, setLoader] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllUser();
        if (res?.status === 200) {
          setUserData(res?.data?.findUsers);
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
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Full Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text, record) => {
        const capitalizeFirstLetter = (str) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
        };
        const capitalizedFirstName = capitalizeFirstLetter(record.firstName || '');
        const capitalizedLastName = capitalizeFirstLetter(record.lastName || '');
        const fullName = `${capitalizedFirstName} ${capitalizedLastName}`.trim();
        return fullName ? fullName : 'NA';
      },
    },
    {
      title: "Country",
      dataIndex: "countryCode",
      key: "country",
      render: (text, record) => record?.countryCode || 'NA'
    },
    {
      title: "Points",
      dataIndex: "Points",
      key: "points",
      render: (text, record) => record?.Points || '0'
    },
    {
      title: "Role",
      dataIndex: "userRoleID",
      key: "role",
      render: (text, record) => {
        let roleName;
        let roleIcon;

        switch (record?.userRoleID) {
          case 1:
            roleName = "SuperAdmin";
            roleIcon = <RiAdminFill style={{ color: "white", fontSize: "20px" }} />;
            break;
          case 2:
            roleName = "Admin";
            roleIcon = <FaUser style={{ color: "white", fontSize: "20px" }} />;
            break;
          case 3:
            roleName = "Normal";
            roleIcon = <FaUser style={{ color: "white", fontSize: "20px" }} />;
            break;
          default:
            roleName = "NA";
            roleIcon = null;
        }
        return (
          <RoleStyledText>
            {roleName}
            {roleIcon}
          </RoleStyledText>
        );
      }
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (text, record) => (
        <StatusStyledText
          status={record.isActive ? "Active" : "Inactive"}
          onClick={() => showActiveModal(record)}
        >
          {record.isActive ? "Active" : "Inactive"}
          {record.isActive ? (
            <IoCheckmarkOutline style={{ color: "white", fontSize: "20px" }} />
          ) : (
            <RxCross2 style={{ color: "white", fontSize: "20px" }} />
          )}
        </StatusStyledText>
      ),
    },
    {
      title: "UserType",
      dataIndex: "userApplicationtype",
      key: "usertype",
      render: (text) => <StyledText color="orange">{text || "N/A"}</StyledText>
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdat",
      render: (text, record) => {
        const date = DateTime.fromISO(record?.createdAt);
        return date.toFormat("MMM dd yyyy, HH : mm : ss");
      }
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
          onSend={() => showSendModal(record)}
          onEdit={() => showEditModal(record)}
          onDelete={() => showDeleteModal(record)}
        />
      ),
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
    <AllUserWrapper byTheme={byTheme}>
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
      {activeModal && (
        <ActiveModal
          handleCancel={() => setActiveModal(false)}
          activeModal={activeModal}
          handleConfirm={handleActiveCancel}
          selectedRecord={selectedRecord}
        />
      )}
      <div className="allUsersHeader">
        <h1 className="allUsersHeading">All Users</h1>
        <button>Export User Details</button>
      </div>

      <div className="tableDiv">
        <TableNew
          columns={columns}
          data={userData}
          scroll={scrollConfig}
          loader={loader}
        />
      </div>
    </AllUserWrapper>
  );
};

export default AllUsers;

const AllUserWrapper = styled.div`
  font-family: ${({ theme }) => theme?.fontFamily};
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
  background-color: ${({ status }) =>
    status === "Active" ? "#00e633" : "red"};
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const StyledText = styled.span`
  color: #fff;
  background: linear-gradient(
    97.43deg,
    rgb(47, 128, 237) 0%,
    rgb(86, 204, 242) 100%
  );
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;