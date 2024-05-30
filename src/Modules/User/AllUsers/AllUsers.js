import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";

const AllUsers = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [loader, setLoader] = useState();
  const columns = [
    {
      title: "Full Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => (
        <StyledText color="blue">{record.role}</StyledText>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <StyledText color="green">{record.status}</StyledText>
      ),
    },
    {
      title: "UserType",
      dataIndex: "usertype",
      key: "usertype",
      render: (text, record) => (
        <StyledText color="orange">{record.usertype}</StyledText>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdat",
      key: "createdat",
    },
  ];

  const userData = [
    {
      key: 1,
      name: "John Doe",
      country: "USA",
      points: 100,
      role: "Admin",
      status: "Active",
      usertype: "Internal",
      createdat: "2024-05-29",
    },
    {
      key: 2,
      name: "Jane Smith",
      country: "Canada",
      points: 75,
      role: "User",
      status: "Inactive",
      usertype: "External",
      createdat: "2024-05-28",
    },
  ];

  const scrollConfig = {
    x: 1500, // Horizontal scrolling
  };
  const formActions = {
    apply: true,
    view: false,
    edit: true,
    delete: true,
    pathname: "/home/owners/view",
    pathnameEdit: "/home/owners/edit",
    deletepath: "delete_owner/",
    delete_key: "owners_id",
  };

  return (
    <AllUserWrapper byTheme={byTheme}>
      <div className="allUsersHeader">
        <h1 className="allUsersHeading">All Users</h1>
        <button>Export User Details</button>
      </div>

      <div className="tableDiv">
        <TableNew columns={columns} data={userData} scroll={scrollConfig} Actions={formActions}
          loader={loader} />
      </div>
    </AllUserWrapper>
  );
};

export default AllUsers;

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
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  padding: 5px 10px;
  border-radius: 5px;
`;