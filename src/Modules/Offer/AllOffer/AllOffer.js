import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { debounce } from "../../../Utils/CommonFunctions";
import { toast } from "react-toastify";
import {
  activateDeactivateAllOffers,
  deleteOffers,
  getAllGeoCodes,
  getAllOffers,
} from "../../../Services/Collection";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { DateTime } from "luxon";
import TableAction from "../../../Components/TableNew/TableActions";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import EditUserModal from "../../../Components/EditModal/EditUserModal";

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

   const handleSearch = useCallback(
    debounce((value) => {
      setSearch(value);
      setCurrentPage(1);
    }),
    []
  );  const handleDelete = async (id) => {
    let res = await deleteOffers(id);
    if (res?.status === 200) {
      await fetchData();
    }
    return res;
  };
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

  const columns = [
    {
      title: "Offer Title",
      key: "title",
      dataIndex: "offerTitle",
      fixed: "left",
      width: 150,
      render: (text, record) => record?.offerTitle || "NA",
      sorter: true,
      sortOrder: fieldName === "offerTitle" ? orderMethod : false,
    },
    {
      title: "Offer Link",
      key: "link",
      dataIndex: "offerLink",
      render: (text, record) => <a>{record?.offerLink}</a>,
      sorter: true,
      sortOrder: fieldName === "offerTitle" ? orderMethod : false,
    },
    {
      title: "Offer Amount in $",
      key: "amount",
      dataIndex: "offerPoints",
      render:(text,record)=>record?.offerPoints,
      sorter: true,
      sortOrder: fieldName === "offerPoints" ? orderMethod : false,
    },
    {
      title: "Offer Short Description",
      key: "description",
      dataIndex: "offerShortDescription",
      render: (text, record) => record?.offerShortDescription || "NA",
    },
    {
      title: "Geo Code",
      key: "code",
      dataIndex: "offerCountry",
      render: (text, record) => record?.offerCountry || "NA",
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
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdat",
      render: (text, record) => {
        const date = DateTime.fromISO(record?.createdAt);
        return date.toFormat("MMM dd yyyy, HH : mm : ss");
      },
      sorter: true,
      sortOrder: fieldName === "createdAt" ? orderMethod : false,
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
    x: 2100, // Horizontal scrolling
  };

  const menuItems = [
    { key: "all", label: "Select All" }, // Option for selecting all countries
    ...geoCodes.map((jsonData) => ({
      key: jsonData.id,
      label: `${jsonData?.country} (${jsonData?.iso_code_2})`,
    })),
  ];

  const handleOptionClick = (option) => {
    if (option.key === "all") {
      setSelectedOption("All"); // Set selectedOption to empty string to represent selecting all countries
    } else {
      // Extract iso_code_2 from the selected country's JSON data
      const selectedIsoCode = geoCodes.find(
        (item) => item.id === option.key
      )?.iso_code_2;
      setSelectedOption(selectedIsoCode || ""); // Set iso_code_2
    }
  };

  const items = menuItems?.map((item) => ({
    key: item?.key,
    label: item?.label,
    onClick: () => handleOptionClick(item),
  }));

  const handleTableChange = (pagination, filters, sorter) => {
    let order;
    if (fieldName === sorter.field) {
      // If the same column is clicked again, toggle the sorting order
      order = orderMethod === "asc" ? "desc" : "asc";
    } else {
      // If a new column is clicked, set the sorting order to ascending by default
      order = "asc";
    }
    console.log("Sorter Field:", sorter.field);
    console.log("Sort Order:", order);
    setFieldName(sorter.field);
    setorderMethod(order);
    setCurrentPage(pagination.current);
  };

  useEffect(() => {
    fetchData();
    fetchGeoCordData(); // Fetch geo codes
  }, [currentPage, pageSize, search, fieldName, orderMethod, selectedOption]);
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
        <h1 className="allUsersHeading">All Offers</h1>
        <Dropdown
          menu={{
            items,
            style: {
              maxHeight: "200px",
              overflowY: "auto",
            },
          }}
          trigger={["click"]}
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          <div
            style={{
              border: "1px solid #000",
              padding: "10px",
              width: "20rem",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{selectedOption}</span>
            <DownOutlined />
          </div>
        </Dropdown>
        <div style={{ display: "flex", gap: "20px" }}>
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
          onChange={handleTableChange}
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

  background-color: ${({ text }) => (text == "Yes" ? "#00e633" : "red")};

  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const StatusStyledText = styled.span`
  color: #fff;
  background-color: ${({ status }) => (status == "Active" ? "#00e633" : "red")};
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
