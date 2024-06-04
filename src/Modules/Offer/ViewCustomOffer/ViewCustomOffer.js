import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { toast } from "react-toastify";
import { getViewCustomOffers } from "../../../Services/Collection";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { DateTime } from "luxon";
import TableAction from "../../../Components/TableNew/TableActions";
import { debounce } from "../../../Utils/CommonFunctions";


const ViewCustomOffers = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [loader, setLoader] = useState();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(5);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
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
      const res = await getViewCustomOffers(params);
      if (res?.status === 200) {
        console.log(res.data.findCustomOffers, "resview");
        setUserData(res?.data?.findCustomOffers || []);
        setTotalUsers(res?.data?.totalCustomOffers || 0);
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
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, search]);

  const columns = [
    {
      title: "Offer Title",
      key: "title",
      dataIndex: "offerTitle",
      width: 150,
      fixed: "left",
      render: (text, record) => record?.offerTitle || "NA",
    },
    {
      title: "Offer Link",
      key: "link",
      dataIndex: "link",
      width:400,

      render: (text, record) => <a>{record?.offerLink || "NA"}</a>,
    },
    {
      title: "Offer Amount in $",
      key: "amount",
      width: 300,
      dataIndex: "amount",
    },
    {
      title: "Offer Short Description",
      key: "description",
      dataIndex: "offerShortDescription",
      width:400,
      render: (text, record) => record?.offerShortDescription || "NA"


    },
    {
      title: "Geo Code",
      key: "code",
      dataIndex: "offerCountry",
      render:(text, record) => record?.offerCountry || "NA" 
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      width: 150,
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
      title: "Daily Cap Limit",
      key: "limit",
      dataIndex: "dailyCAPLimit",
      width: 200,
      render: (text, record) => record?.dailyCAPLimit || "NA"

    },
    {
      title: "App Installation",
      key: "installation",
      dataIndex: "app_install",
      width: 150,
      render: (text, record) => <StyledText text={record?.app_install ? "Yes" : "No"}>{record?.app_install ? "Yes" : "No"}</StyledText>,
    },
    {
      title: "Daily Offer",

      key: "offer",
      dataIndex: "isDailyOffer",
      width: 150,
      render: (text, record) => <StyledText text={record?.isDailyOffer? "Yes" : "No"}>{record?.isDailyOffer? "Yes" : "No"}</StyledText>,
    },
    {
      title: "APPLICATION GROUP ONE-ANDROID",
      key: "oneAndroid",
      dataIndex: "oneAndroid",
      render: (text, record) => <StyledText text={text}>{text}</StyledText>,
    },
    {
      title: "APPLICATION GROUP TWO-ANDROID",
      key: "twoAndroid",
      dataIndex: "twoAndroid",
      render: (text, record) => <StyledText text={text}>{text}</StyledText>,
    },
    {
      title: "APPLICATION GROUP ONE-IOS",
      key: "oneIos",
      dataIndex: "oneIos",
      render: (text, record) => <StyledText text={text}>{text}</StyledText>,
    },
    {
      title: "APPLICATION GROUP TWO-IOS",
      key: "twoIos",
      dataIndex: "twoIos",
      render: (text, record) => <StyledText text={text}>{text}</StyledText>,
    },
    
    {
      title: "Date",
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
          apply={formActions.apply}
          edit={formActions.edit}
          deleteAction={formActions.delete}
          // onEdit={() => showEditModal(record)}
          // onDelete={() => showDeleteModal(record)}
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
  
  const formActions = {
    apply: false,
    view: false,
    edit: true,
    delete: true,
  };

  const scrollConfig = {
    x: 7000, // Horizontal scrolling
  };

  return (
    <AllUserWrapper byTheme={byTheme}>
      <div className="allUsersHeader">
        <h1 className="allUsersHeading">All Custom Offers</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <button style={{ background: "red" }}>De-active All Offers</button>
          <button>Active All Offers</button>
        </div>
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

export default ViewCustomOffers;

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

const StyledText = styled.span`
  color: #fff;
  // background: linear-gradient(
  //   97.43deg,
  //   rgb(47, 128, 237) 0%,
  //   rgb(86, 204, 242) 100%
  // );
  background-color: ${({ text }) => (text === "Yes" ? "#00e633" : "red")};

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
  cursor: pointer;
`;
