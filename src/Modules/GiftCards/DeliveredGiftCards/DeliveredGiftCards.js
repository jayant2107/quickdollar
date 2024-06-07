import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkOutline } from "react-icons/io5";
import { debounce, srcSortImage } from "../../../Utils/CommonFunctions";
import { getDeliveredGiftCard } from "../../../Services/Collection";
import { toast } from "react-toastify";
import { DateTime } from "luxon";

const DeliveredGift = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);
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
      const res = await getDeliveredGiftCard(params);
      if (res?.status === 200) {
        console.log(res?.data?.findDeliveredGiftCards);
        setUserData(res?.data?.findDeliveredGiftCards || []);
        setTotalUsers(res?.data?.totalDeliveredGiftCards || 0);
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
          onClick={() => handleSort("giftCardName")}
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
      render: (text, record) => record?.giftcard?.giftCardName || "NA",
    },
    {
      title: (
        <div
          onClick={() => handleSort("giftCardPoints")}
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
      render: (text, record) => record?.giftCardPoints || "NA",
    },
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
    },
    {
      title: (
        <div
          onClick={() => handleSort("Status")}
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
      render: (text, record) => (
        <StatusStyledText status={record.Status ? "Completed" : "InCompleted"}>
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
      title: (
        <div
          onClick={() => handleSort("userApplicationtype")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
         User Type{" "}
          <img
            src={srcSortImage("userApplicationtype", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),
      
      dataIndex: "userApplicationtype",
      key: "usertype",
      render: (text, record) => {
        let userType;
        switch (record?.user?.userApplicationtype) {
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
          onClick={() => handleSort("giftCardCode")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
         Gift Card Code{" "}
          <img
            src={srcSortImage("giftCardCode", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),
      dataIndex: "giftCardCode",
      key: "cardcode",
      render: (text, record) => record?.giftCardCode,
    },
    {
      title: (
        <div
          onClick={() => handleSort("updatedAt")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
         Delivery Date{" "}
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
      key: "deliveryDate",
      render: (text, record) => {
        const date = DateTime.fromISO(record?.giftcard?.updatedAt);
        return date.toFormat("MMM dd yyyy, HH : mm : ss");
      },
     
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

  

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, search, fieldName, orderMethod]);

  return (
    <AllUserWrapper byTheme={byTheme}>
      <div className="allUsersHeader">
        <h1 className="allUsersHeading">Delivered Gift Card</h1>
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

export default DeliveredGift;

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
