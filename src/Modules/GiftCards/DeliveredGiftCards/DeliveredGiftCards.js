import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";

const DeliveredGift = () => {
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      
    },
    {
        title: "User Type",
        dataIndex: "usertype",
        key: "usertype",
       
        
      },

    {
      title: "Gift Card Code",
      dataIndex: "cardcode",
      key: "cardcode",
    },
    {
      title: "Delivery Date",
      dataIndex: "deliverydate",
      key: "deliverydate",
    },
  ];

  const userData = [
    {
      key: "1",
      giftname: "Paypal",
      price: "10.36$",
      name:"Kerry smith",
      status: "Completed",
      usertype:"Android",
      cardcode:"Transaction ID: 11T08390HD2921411",
      deliverydate: "Nov 06, 2019 18:37:31",
      
    },
  ];

  const scrollConfig = {
    x: 1000, 
  };

  return (
    <AllUserWrapper byTheme={byTheme}>
      <div className="allUsersHeader">
        <h1 className="allUsersHeading">Delivered Gift Card</h1>
      </div>

      <div className="tableDiv">
        <TableNew columns={columns} data={userData} scroll={scrollConfig} />
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