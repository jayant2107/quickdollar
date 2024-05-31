import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AllOffers = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);

  const columns = [
    {
      title: "Offer Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Offer Link",
      key: "link",
      dataIndex: "link",
      render: (text, record) => (
        <a>{record.link}</a>
      ),
    },
    {
      title: "Offer Amount in $",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Offer Short Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Geo Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text, record) => (
        <StyledText color={`${ record.status == "Active" ? "green" : "red"}`}>{record.status}</StyledText>
      ),
    },
    {
      title: "Daily Cap Limit",
      key: "limit",
      dataIndex: "limit",
    },
    {
      title: "App Installation",
      key: "installation",
      dataIndex: "installation",
      render: (text, record) => (
        <StyledText color={`${text == "Yes" ? "green" : "red"}`}>
          {text}
        </StyledText>
      ),
    },
    {
      title: "Daily Offer",
      key: "offer",
      dataIndex: "offer",
      render: (text, record) => (
        <StyledText color={`${text == "Yes" ? "green" : "red"}`}>
          {text}
        </StyledText>
      ),
    },
    {
      title: "APPLICATION GROUP ONE-ANDROID",
      key: "oneAndroid",
      dataIndex: "oneAndroid",
      render: (text, record) => (
        <StyledText color={`${text == "Yes" ? "green" : "red"}`}>
          {text}
        </StyledText>
      ),
    },
    {
      title: "APPLICATION GROUP TWO-ANDROID",
      key: "twoAndroid",
      dataIndex: "twoAndroid",
      render: (text, record) => (
        <StyledText color={`${text == "Yes" ? "green" : "red"}`}>
          {text}
        </StyledText>
      ),
    },
    {
      title: "APPLICATION GROUP ONE-IOS",
      key: "oneIos",
      dataIndex: "oneIos",
      render: (text, record) => (
        <StyledText color={`${text == "Yes" ? "green" : "red"}`}>
          {text}
        </StyledText>
      ),
    },
    {
      title: "APPLICATION GROUP TWO-IOS",
      key: "twoIos",
      dataIndex: "twoIos",
      render: (text, record) => (
        <StyledText color={`${text == "Yes" ? "green" : "red"}`}>
          {text}
        </StyledText>
      ),
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
  ];
  const userData = [
    {
      key: "1",
      title: "P Branded Surveys - CA 16950",
      link: "https://www.bigcattracks.com/aff_c?offer_id=16950&aff_id=16085",
      amount: "NA",
      description: "$35 Per Survey",
      code: "CA, IN",
      status: "Active",
      limit: "NA",
      installation: "No",
      offer: "No",
      oneAndroid: "Yes",
      twoAndroid: "No",
      oneIos: "Yes",
      twoIos: "No",
      date: "Nov 06, 2019 18:37:31",
      action: (
        <>
          <EditOutlined style={{ fontSize: "30px" }} />
          <DeleteOutlined style={{ fontSize: "30px" }} />
        </>
      ),
    },
  ];

  const items = [
    {
      label: <a href="/">India(IN)</a>,
      key: "0",
    },
    {
      label: <a href="/">Japan(JP)</a>,
      key: "1",
    },
    {
      label: "Italy(IT)",
      key: "2",
    },
  ];

  const formActions = {
    apply: false,
    view: false,
    edit: true,
    delete: true,
    pathname: "/home/owners/view",
    pathnameEdit: "/home/owners/edit",
    deletepath: "delete_owner/",
    delete_key: "owners_id",
  };

  const scrollConfig = {
    x: 2100, // Horizontal scrolling
  };

  return (
    <AllUserWrapper byTheme={byTheme}>
      <div className="allUsersHeader">
        <h1 className="allUsersHeading">All Offers</h1>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a className="dropdown" onClick={(e) => e.preventDefault()}>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                opacity: "0.5",
              }}
            >
              Afghanistan AF
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <div style={{ display: "flex", gap: "20px" }}>
          <button style={{ background: "#ff0e0e" }} >De-active All Offers</button>
          <button >Active All Offers</button>{" "}
        </div>
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

  .dropdown {
    width: 20rem;
    background-color: #fff;
    box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
    font-weight: 600;
    border-radius: 10px;
    border: none;
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
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  padding: 5px 10px;
  border-radius: 5px;
`;
