import React, { useCallback, useEffect, useState } from "react";
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
import { deleteUser, getAllAbusedUser } from "../../../Services/Collection";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import { debounce } from "../../../Utils/CommonFunctions";

const AllAbusedUsers = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [loader, setLoader] = useState();
  const [editModal, setEditModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(5);
  const [search, setSearch] = useState("");

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
      const res = await getAllAbusedUser(params);
      if (res?.status === 200) {
        // console.log(res.data)
        setUserData(res?.data?.findInActiveUsers);
        setTotalUsers(res?.data?.totalAbusedUsers);
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

  console.log(userData, "daataaaaaaaaa");

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
        const capitalizedFirstName = capitalizeFirstLetter(
          record.firstName || ""
        );
        const capitalizedLastName = capitalizeFirstLetter(
          record.lastName || ""
        );
        const fullName =
          `${capitalizedFirstName} ${capitalizedLastName}`.trim();
        return fullName ? fullName : "NA";
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (text, record) => record?.countryCode || "NA",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      render: (text, record) => record?.Points || "0",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => {
        let roleName;
        let roleIcon;

        switch (record?.userRoleID) {
          case 1:
            roleName = "SuperAdmin";
            roleIcon = (
              <RiAdminFill style={{ color: "white", fontSize: "20px" }} />
            );
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
      },
    },
    {
      title: "Status",
      dataIndex: "status",
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
      render: (text, record) => {
        let userType;
        switch (record?.userApplicationtype) {
          case "0":
            userType = "iOS";
            break;
          case "1":
            userType = "Android";
            break;
          case "2":
            userType = "All Users";
            break;
          case "3":
            userType = "Web";
            break;
          default:
            userType = "NA";
        }
        return <StyledText>{userType}</StyledText>;
      },
    },
    {
      title: "Created Date",
      dataIndex: "createdat",
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
  const handleDelete=async(id)=>{
    let res = await deleteUser(id);
    if (res?.status === 200) {
       fetchData()
    }
    return res;
   

  }

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, search]);

  return (
    <AllAbusedUserWrapper byTheme={byTheme}>
      {deleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          handleCancel={handleDeleteCancel}
          deleteModal={deleteModal}
          record={selectedRecord}
          handleDelete={handleDelete}
        />
      )}
      {editModal && (
        <EditUserModal
          showEditModal={showEditModal}
          handleEditCancel={handleEditCancel}
          editModal={editModal}
          record={selectedRecord}
          viewLoader={loader}
          fetchData={fetchData}
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
          record={selectedRecord}
          fetchData={fetchData}
        />
      )}
      <div className="allAbusedUserHeader">
        <h1 className="allAbusedUserHeading">All Abused Users</h1>
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
        />
        
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
