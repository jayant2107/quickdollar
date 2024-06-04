import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { deleteOffers, getCompletedoffers } from "../../../Services/Collection";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import TableAction from "../../../Components/TableNew/TableActions";
import { debounce } from "../../../Utils/CommonFunctions";
import EditUserModal from "../../../Components/EditModal/EditUserModal";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";

const CompletedOffers = () => {
  const [loader, setLoader] = useState(true);
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(5);
  const [search, setSearch] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);


  const handleSearch = useCallback(
    debounce((value) => setSearch(value)),
    []
  );
  const handleDelete=async(id)=>{
    let res = await deleteOffers(id);
    if (res?.status === 200) {
       fetchData()
    }
    return res;
   

  }
  const handleDeleteCancel = () => {
    setDeleteModal(false);
    setSelectedRecord(null);
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

  const fetchData = async () => {
    setLoader(true);
    try {
      let params = new URLSearchParams();
      search && params.append("search", search);
      params.append("page", currentPage);
      params.append("limit", pageSize);
      const res = await getCompletedoffers(params);
      if (res?.status === 200) {
        console.log(res?.data?.findCompletedOffers, "completdOffer");
        setUserData(res?.data?.findCompletedOffers || []);
        setTotalUsers(res?.data?.totalCompletedOffers || 0);
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


  const columns = [
    {
      title: "User Name",
      key: "name",
      dataIndex: "name",
      width: 150,
      fixed: "left",
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
    },
    {
      title: "User Email",
      key: "email",
      dataIndex: "email",
      render: (text, record) => record?.user?.email,
    },
    {
      title: "Offer title",
      key: "title",
      dataIndex: "offerTitle",
      render: (text, record) => record?.offer?.offerTitle,
    },
    {
      title: "User Country",
      key: "country",
      dataIndex: "countryCode",
      render: (text, record) => record?.user?.countryCode,
    },
    {
      title: "Added Points",
      key: "points",
      dataIndex: "offerPoints",
      render: (text, record) => record?.offerPoints,
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
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
          edit={formActions.edit}
          deleteAction={formActions.delete}
          onEdit={() => showEditModal(record)}
          onDelete={() => showDeleteModal(record)}
        />
      ),
    },
  ];

  const formActions = {
    apply: false,
    view: false,
    edit: true,
    delete: true,
  };

  const scrollConfig = {
    x: 2000, // Horizontal scrolling
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize,search]);
  return (
    <AllUserWrapper byTheme={byTheme}>
       {deleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          handleCancel={handleDeleteCancel}
          deleteModal={deleteModal}
          id={selectedRecord.idCompletedOffer}
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
      <div className="allUsersHeader">
        <h1 className="allUsersHeading">All Completed Offers</h1>
      </div>

      <div className="tableDiv">
        <TableNew
          columns={columns}
          data={userData}
          scroll={scrollConfig}
          Actions={formActions}
          pagination={paginationConfig}
          handleSearch={handleSearch}
          loader={loader}
        />
      </div>
    </AllUserWrapper>
  );
};

export default CompletedOffers;

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

const StyledText = styled.span`
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  padding: 5px 10px;
  border-radius: 5px;
`;
