import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { debounce, srcSortImage } from "../../../Utils/CommonFunctions";
import { toast } from "react-toastify";
import { Select, Tooltip } from "antd";
import {
  activateDeactivateAllOffers,
  deleteAllOffers,
  getAllGeoCodes,
  getAllOffers,
} from "../../../Services/Collection";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { DateTime } from "luxon";
import TableAction from "../../../Components/TableNew/TableActions";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRecord } from "../../../Store/slices/OfferRecord";

const AllOffers = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [userData, setUserData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(5);
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  const [geoCodes, setGeoCodes] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Select Geo Code");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [fieldName, setFieldName] = useState("createdAt");
  const [orderMethod, setorderMethod] = useState("asc");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { Option } = Select;
  const handleSearch = useCallback(
    debounce((value) => {
      setSearch(value);
      setCurrentPage(1);
    }),
    []
  );
  const handleDelete = async (id) => {
    let res = await deleteAllOffers(id);
    if (res?.status === 200) {
      await fetchData();
    }
    return res;
  };
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
      if (selectedOption !== "Select Geo Code") {
        params.append("country", selectedOption);
      }
      console.log("Fetch Params:", params.toString()); // Log params sent to backend

      const res = await getAllOffers(params);
      console.log("Response from Backend:", res); // Log response from backend
      if (res?.status === 200) {
        console.log(res.data.findOffers, "alloffer");
        setUserData(res?.data?.findOffers);
        setTotalUsers(res?.data?.totalOffers);
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

  const fetchGeoCordData = async () => {
    try {
      const res = await getAllGeoCodes();
      if (res?.status === 200) {
        setGeoCodes(res?.msg);
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
  const ActiveAllUser = async () => {
    let res = await activateDeactivateAllOffers({ isActive: "1" });
    if (res?.status === 200) {
      console.log(res.status);
      let fetch = fetchData();
      console.log(fetch, "fetchhhh");
      toast.success("All Offers Activate Successfully");
    } else {
      let message =
        res?.response?.data?.message ||
        res?.message ||
        res?.error ||
        "Something went wrong";
      setUserData([]);
      toast.error(message);
    }
  };
  const DeactiveAllUser = async () => {
    let res = await activateDeactivateAllOffers({ isActive: "0" });
    console.log(res);
    if (res?.status === 200) {
      console.log(res.status);
      let fetch = fetchData();
      console.log(fetch, "fetchhhh");
      toast.success("All Offers Deactivate Successfully");
    } else {
      let message =
        res?.response?.data?.message ||
        res?.message ||
        res?.error ||
        "Something went wrong";
      toast.error(message);
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
          onClick={() => handleSort("offerTitle")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Offer Title{" "}
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
      fixed: "left",
      width: 150,
      render: (text, record) => record?.offerTitle || "NA",
    },
    {
      title: (
        <div
          onClick={() => handleSort("offerLink")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Offer Link{" "}
          <img
            src={srcSortImage("offerLink", {
              sortBasis: fieldName,
              sortType: orderMethod,
            })}
            alt="sort icon"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
      ),
      key: "link",
      width: 200,
      dataIndex: "offerLink",
     
      render: (text, record) => (
        <Tooltip title={record?.offerLink || "NA"} placement="top" >
          <TooltipContent><Link to="#">{record?.offerLink || "NA"}</Link></TooltipContent>
        </Tooltip>
      ),
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
          Offer Amount in ${" "}
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

      key: "amount",
      dataIndex: "offerPoints",
      render: (text, record) => record?.offerPoints || "NA",
    },
    {
      title: "Offer Short Description",
      key: "description",
      dataIndex: "offerShortDescription",
      render: (text, record) => (
        <Tooltip title={record?.offerShortDescription || "NA"} placement="top" overlayStyle={{maxWidth:"400px"}} >
          <TooltipContent>{record?.offerShortDescription || "NA"}</TooltipContent>
        </Tooltip>
      ),
      
    },
    {
      title: "Geo Code",
      key: "code",
      dataIndex: "offerCountry",
      render: (text, record) => (
        <Tooltip title={record?.offerCountry || "NA"} placement="top" overlayStyle={{maxWidth:"600px"}} autoAdjustOverflow={false}>
          <TooltipContent>{record?.offerCountry || "NA"}</TooltipContent>
        </Tooltip>
      ),
      // width:300,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (text, record) => (
        <StatusStyledText
          status={record.isActive ? "Active" : "Inactive"}
          // onClick={() => showActiveModal(record)}
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
      render: (text, record) => record?.dailyCAPLimit || "NA",
    },
    {
      title: "App Installation",
      key: "installation",
      dataIndex: "app_install",
      render: (text, record) => (
        <StyledText text={record?.app_install ? "Yes" : "No"}>
          {record?.app_install ? "Yes" : "No"}
        </StyledText>
      ),
    },
    {
      title: "Daily Offer",
      key: "offer",
      dataIndex: "isDailyOffer",
      render: (text, record) => (
        <StyledText text={record?.isDailyOffer ? "Yes" : "No"}>
          {record?.isDailyOffer ? "Yes" : "No"}
        </StyledText>
      ),
    },
    {
      title: "APPLICATION GROUP ONE-ANDROID",
      key: "oneAndroid",
      dataIndex: "oneAndroid",
      render: (text, record) => (
        <StyledText text={text}>
          {text || "NA"}{" "}
        </StyledText>
      ),
    },
    {
      title: "APPLICATION GROUP TWO-ANDROID",
      key: "twoAndroid",
      dataIndex: "twoAndroid",
      render: (text, record) => (
        <StyledText text={text}>
          {text || "NA"}
        </StyledText>
      ),
    },
    {
      title: "APPLICATION GROUP ONE-IOS",
      key: "oneIos",
      dataIndex: "oneIos",
      render: (text, record) => (
        <StyledText text={text}>
          {text || "NA"}
        </StyledText>
      ),
    },
    {
      title: "APPLICATION GROUP TWO-IOS",
      key: "twoIos",
      dataIndex: "twoIos",
      render: (text, record) => (
        <StyledText text={text}>
          {text || "NA"}
        </StyledText>
      ),
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
      fixed: "right",
      width: 150,
      render: (text, record) => (
        <TableAction
          apply={formActions.apply}
          edit={formActions.edit}
          deleteAction={formActions.delete}
          // onSend={() => showSendModal(record)}
          onEdit={() => {
            console.log("Record:", record);
            dispatch(addRecord(record));
            navigate(`/quickdollar/offer/editOffer/${record?.idOffer}`);
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
    x: 2100, // Horizontal scrolling
  };

  useEffect(() => {
    fetchData();
    fetchGeoCordData(); // Fetch geo codes
  }, [currentPage, pageSize, search, fieldName, orderMethod, selectedOption]);

  document.title = "Offers - quickdollarapp";

  return (
    <AllUserWrapper byTheme={byTheme}>
      {deleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          handleCancel={handleDeleteCancel}
          deleteModal={deleteModal}
          id={selectedRecord.idOffer}
          handleDelete={handleDelete}
        />
      )}

      <div className="allUsersHeader">
        <h1 className="allUsersHeading">All Offers</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <SelectField
            showSearch // Enable searching
            placeholder={selectedOption}
            onChange={(value) => setSelectedOption(value)}
            style={{ width: 300 }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              typeof option.children === "string" &&
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option key="Select Geo Code" value="Select Geo Code">
              Select Geo Code
            </Option>
            {geoCodes?.map((item, index) => (
              <Option key={item?.country} value={item?.iso_code_2}>
                {item?.country + " (" + item?.iso_code_2 + ")"}
              </Option>
            ))}
          </SelectField>
          <button onClick={ActiveAllUser}>Active All Offers</button>
          <button onClick={DeactiveAllUser} style={{ background: "#ff0e0e" }}>
            De-active All Offers
          </button>
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
          onChange={handleSort}
        />
      </div>
    </AllUserWrapper>
  );
};

export default AllOffers;

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

  .ant-dropdown-trigger {
    width: 20rem;
    background-color: #fff;
    box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;

    border-radius: 10px;
    border: none !important;
    padding: 11px 30px;
    cursor: pointer;
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

const SelectField = styled(Select)`
  .ant-select-selector {
    font-weight: 600;
    border-radius: 10px;
    border: none;
    padding: 11px 30px;
    cursor: pointer;
    font-family: ${({ theme }) => theme?.fontFamily};
    min-height: 43px !important;
    display: flex;
    align-items: center;
    .ant-select-selection-search {
      display: flex;
      align-items: center;
    }

    .ant-select-selection-placeholder {
      color: rgb(102, 102, 102) !important;
      text-align: start;
    }

    &:hover,
    &:focus {
      outline: none !important;
      box-shadow: none !important;
      border-color: #e5e5e5 !important;
    }
  }
  .ant-select-selection-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .ant-select-arrow {
    color: #666 !important;
  }
  &.ant-select-focused .ant-select-selector,
  &.ant-select-open .ant-select-selector,
  &.ant-select:hover .ant-select-selector {
    outline: none;
    box-shadow: none;
    border-color: #e5e5e5 !important;
  }
`;
const TooltipContent = styled.div`
  max-height: 4.5em; // Approx. three lines
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; // Limit to three lines
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
  padding: 8px;
  margin: 8px 0px;
`;
