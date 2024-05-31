import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";

const RequestGiftCard = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);

  const columns = [
    {
      title: "Gift Card Name",
      width: 150,
      dataIndex: "giftname",
      key: "giftname",
      fixed: "left",
    },
    {
      title: "Gift Card Price",
      dataIndex: "price",
      key: "price",

    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",

    },
    {
      title: "User Total Amount",
      dataIndex: "price",
      key: "price",
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
      title: "Send Reward",
      dataIndex: "reward",
      key: "reward",
    },
    {
      title: "Requested Date",
      dataIndex: "requesteddate",
      key: "requesteddate",
    },
  ];

  const userData = [
    {
      key: "1",
      giftname: "Gift Card Name",
      name: "name",
      status: "active",
      price: "50$",
      reward: "reward",
      requesteddate: "Nov 06, 2019 18:37:31",

    },
  ];

  const scrollConfig = {
    x: 1000,
  };

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

  return (
    <AllUserWrapper byTheme={byTheme}>
      <div className="allUsersHeader">
        <h1 className="allUsersHeading">Requested Gift Cards</h1>
      </div>

      <div className="tableDiv">
        <TableNew columns={columns} data={userData} scroll={scrollConfig} Actions={formActions} />
      </div>
    </AllUserWrapper>
  );
};

export default RequestGiftCard;

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