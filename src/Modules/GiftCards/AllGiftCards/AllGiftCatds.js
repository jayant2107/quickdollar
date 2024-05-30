import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AllGiftCards = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);

  const columns = [
    {
      title: "Gift Card Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      key: "country",
      title: "Gift Card Image",
      dataIndex: "image",
      render: (image) => (
        <TableImageWrapper>
          <img src={image} alt="" />
        </TableImageWrapper>
      ),
    },
    {
      title: "Gift Card Price",
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
      title: "Created Date",
      dataIndex: "createdat",
      key: "createdat",
    },
    
  ];

  const userData = [
    {
      key: "1",
      name: "Paypal",
      image: "https://quickdollarapp.com/kinso2015/assets/images/giftcardimages/paypal_1588529561.png",
      status: "active",
      price: "50$",
      createdat: "Nov 06, 2019 18:37:31",
      action: (
        <>
          <EditOutlined style={{ fontSize: "30px" }} />
          <DeleteOutlined style={{ fontSize: "30px" }} />
        </>
      ),
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
        <h1 className="allUsersHeading">All Gift Card</h1>
      </div>

      <div className="tableDiv">
        <TableNew columns={columns} data={userData} scroll={scrollConfig} Actions={formActions}/>
      </div>
    </AllUserWrapper>
  );
};

export default AllGiftCards;

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

const StyledText = styled.span`
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  padding: 5px 10px;
  border-radius: 5px;
`;
const TableImageWrapper = styled.div`

img {
  width:100px;
  object-fit:contain;
}

`;