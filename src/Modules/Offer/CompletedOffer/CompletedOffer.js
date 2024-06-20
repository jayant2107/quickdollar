import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { deleteOffers, getCompletedoffers } from "../../../Services/Collection";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import TableAction from "../../../Components/TableNew/TableActions";
import { debounce, srcSortImage, useTableScreenResponsive } from "../../../Utils/CommonFunctions";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRecord } from "../../../Store/slices/OfferRecord";

const CompletedOffers = () => {
  const [loader, setLoader] = useState(true);
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(5);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [fieldName, setFieldName] = useState("createdAt");
  const [orderMethod, setorderMethod] = useState("desc");
  const screenWidth = useTableScreenResponsive();
  const isMobile = screenWidth >= 320 && screenWidth <= 769;

  const navigate = useNavigate();
  const dispatch = useDispatch();

   const handleSearch = useCallback(
    debounce((value) => {
      setSearch(value);
      setCurrentPage(1);
    }),
    []
  );  const handleDelete=async(id)=>{
    let res = await deleteOffers(id);
    if (res?.status === 200) {
      await  fetchData()
    }
    return res;
   

  }
  const handleDeleteCancel = () => {
    setDeleteModal(false);
    setSelectedRecord(null);
  };
  

  const showDeleteModal = (record) => {
    setSelectedRecord(record);
    setDeleteModal(true);
  };

 

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
      const res = await getCompletedoffers(params);
      // console.log(res,"completed offers")
      if (res?.status === 200) {
        // console.log(res?.data?.findCompletedOffers, "completdOffer");
        setUserData(res?.data?.findCompletedOffers || []);
        setTotalUsers(res?.data?.totalCompletedOffers || 0);
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
      key: "name",
      dataIndex: "firstName",
      width: 200,
      fixed: isMobile ? undefined : "left",
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
          onClick={() => handleSort("email")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          User Email{" "}
          <img
            src={srcSortImage("email", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),
      
      key: "email",
      dataIndex: "email",
      render: (text, record) => record?.User?.email,
      
    },
    {
      title: (
        <div
          onClick={() => handleSort("offerTitle")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Offer title{" "}
          <img
            src={srcSortImage("offerTitle", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),
      key: "title",
      dataIndex: "offerTitle",
      render: (text, record) => record?.Offer?.offerTitle,
    
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
          User Country{" "}
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
      key: "country",
      dataIndex: "countryCode",
      render: (text, record) => record?.User?.countryCode,
     
    },
    {
      title: (
        <div
          onClick={() => handleSort("offerPoints")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Added Points{" "}
          <img
            src={srcSortImage("offerPoints", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),
     
      key: "points",
      dataIndex: "offerPoints",
      render: (text, record) => record?.offerPoints,
      
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
         Date{" "}
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
      key: "date",
      render: (text, record) => {
        if(!record?.createdAt) return "NA";
        const date = DateTime.fromISO(record?.createdAt);
        return date.toFormat("MMM dd yyyy, HH : mm : ss");
      },
     
    
    },
    {
      title: "Action",
      key: "operation",
      fixed: isMobile ? undefined : "right",
      width: 100,
      render: (text, record) => (
        <TableAction
          edit={formActions.edit}
          deleteAction={formActions.delete} 
          onEdit={() => {
            // console.log("record", record?.offer);
            dispatch(addRecord(record?.Offer));
            navigate(`/quickdollar/offer/editOffer/${record?.Offer?.idOffer}`);
          }}
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
    x: 1000, // Horizontal scrolling
  };


  

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize,search,fieldName, orderMethod]);

  document.title="Completed Offers - quickdollarapp";
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
          onChange={handleSort}  
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

