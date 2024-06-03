import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getCompletedoffers } from "../../../Services/Collection";
import { toast } from "react-toastify";

const CompletedOffers = () => {
  const [loader, setLoader] = useState();
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(5);

  const fetchData = async () => {
    setLoader(true);
    try {
      const res = await getCompletedoffers(currentPage, pageSize);
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

  const columns = [
    {
      title: "User Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "User Email",
      key: "email",
      dataIndex: "email",
      render: (text, record) => <a>{record.email}</a>,
    },
    {
      title: "Offer title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "User Country",
      key: "country",
      dataIndex: "country",
    },
    {
      title: "Added Points",
      key: "points",
      dataIndex: "points",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
  ];
  // const userData = [
  //   {
  //     key: "1",
  //     name: "Joy Timmons",
  //     email: "joymtimmons15@gmail.com",
  //     title: "P Branded Surveys - CA 16950",
  //     country: "United States",
  //     points: "N/A",
  //     date: "Nov 06, 2019 18:37:31",
  //     action: (
  //       <>
  //         <EditOutlined style={{ fontSize: "30px" }} />
  //         <DeleteOutlined style={{ fontSize: "30px" }} />
  //       </>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     name: "mike Jaslow",
  //     email: "comics30001@aol.com",
  //     title: "P Branded Surveys - CA 16950",
  //     country: "United States",
  //     points: "N/A",
  //     date: "Nov 06, 2019 18:37:31",
  //     action: (
  //       <>
  //         <EditOutlined style={{ fontSize: "30px" }} />
  //         <DeleteOutlined style={{ fontSize: "30px" }} />
  //       </>
  //     ),
  //   },

  // ];

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
  }, [currentPage, pageSize]);
  return (
    <AllUserWrapper byTheme={byTheme}>
      <div className="allUsersHeader">
        <h1 className="allUsersHeading">All Completed Offers</h1>
      </div>

      <div className="tableDiv">
        <TableNew
          columns={columns}
          data={userData}
          scroll={scrollConfig}
          Actions={formActions}
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
