import React, { useState, useEffect, useCallback } from "react";
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
import { deleteUser, getAllUser } from "../../../Services/Collection";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import { debounce, srcSortImage , useTableScreenResponsive } from "../../../Utils/CommonFunctions";
import { getAllExportUser } from "../../../Services/Collection";
import { CircularProgress } from "@mui/material";

const AllUsers = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [userData, setUserData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(5);
  const [loader, setLoader] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  const [search, setSearch] = useState("");
  const [fieldName, setFieldName] = useState("createdAt");
  const [orderMethod, setorderMethod] = useState("desc");
  const [exportLoading, setExportLoading] = useState(false);
  const screenWidth = useTableScreenResponsive();
  const isMobile = screenWidth >= 320 && screenWidth <= 769;

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
      // console.log("Fetch Params:", params.toString());
      const res = await getAllUser(params);
      if (res?.status === 200) {
        setUserData(res?.data?.findUsers);
        setTotalUsers(res?.data?.totalUsers);
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
      // console.log(error, "error");
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  const handleExport = async () => {
    try {
      setExportLoading(true);
      const res = await getAllExportUser();
      if (res?.status === 200) {
        const url = res.message.downloadUrl;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setExportLoading(false);
      } else {
        let message =
          res?.response?.data || res?.error || "Something went wrong";
        toast.error(message);
        setExportLoading(false);
      }
    } catch (error) {
      setExportLoading(false);
      toast.error(error?.message || "Something went wrong");
    }
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
    // console.log("Sort Field:", columnKey);
    // console.log("Sort Order:", newOrder);
    setFieldName(columnKey);
    setorderMethod(newOrder);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: (
        <div
          onClick={() => handleSort("firstName")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Full Name{" "}
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
      width: 150,
      dataIndex: "firstName",
      key: "name",
      fixed: isMobile ? undefined : "left",
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
      title: (
        <div
          onClick={() => handleSort("countryCode")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Country{" "}
          <img
            src={srcSortImage("countryCode", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),
      dataIndex: "countryCode",
      key: "country",
      width: 150,
      render: (text, record) => record?.countryCode || "NA",
    },
    {
      title: (
        <div
          onClick={() => handleSort("Points")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Points{" "}
          <img
            src={srcSortImage("Points", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),
      dataIndex: "Points",
      key: "points",
      width: 150,
      render: (text, record) => record?.Points || "0",
    },
    {
      title: "Role",
      dataIndex: "userRoleID",
      key: "role",
      width: 150,
      render: (text, record) => {
        let roleName;
        let roleIcon;

        switch (record?.userRoleID) {
          case 1:
            roleName = "SuperUser";
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
      title: (
        <div
          onClick={() => handleSort("isActive")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Status{" "}
          <img
            src={srcSortImage("isActive", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),
      dataIndex: "isActive",
      key: "status",
      width: 150,
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
      title: "User Type",
      dataIndex: "userApplicationtype",
      key: "usertype",
      width: 150,
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
      width: 200,
      render: (text, record) => {
        if (record?.createdAt === null) {
          return "NA";
        }
        const date = DateTime.fromISO(record?.createdAt);
        return date.toFormat("MMM dd yyyy, HH : mm : ss");
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: isMobile ? undefined : "right",
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
  const handleDelete = async (id) => {
    let res = await deleteUser(id);
    if (res?.status === 200) {
      await fetchData();
    }
    return res;
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
    // console.log("Sorter Field:", sorter.field);
    // console.log("Sort Order:", order);
    setFieldName(sorter.field);
    setorderMethod(order);
    setCurrentPage(pagination.current);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, search, fieldName, orderMethod]);

  document.title = "All Users - quickdollarapp";
  return (
    <AllUserWrapper byTheme={byTheme}>
      {deleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          handleCancel={handleDeleteCancel}
          deleteModal={deleteModal}
          id={selectedRecord.idUser}
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
      <div className="allUsersHeader">
        <h1 className="allUsersHeading">All Users</h1>
        <button onClick={!exportLoading && handleExport}>
          {exportLoading && <CircularProgress color="inherit" size={10} />}{" "}
          Export User Details
        </button>
      </div>

      <div className="tableDiv">
        <TableNew
          columns={columns}
          data={userData}
          scroll={scrollConfig}
          pagination={paginationConfig}
          loader={loader}
          handleSearch={handleSearch}
          onChange={handleTableChange}
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
    margin: 20px 0;
    font-family: ${({ theme }) => theme?.fontFamily};
    color: ${({ byTheme }) => (byTheme === "day" ? "#000" : "#fff")};
  }

  .allUsersHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    flex-wrap: wrap;
    button {
      margin: 20px 0px;
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
