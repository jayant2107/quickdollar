import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkOutline } from "react-icons/io5";
import DeleteModal from "../../../Components/DeleteModal/DeleteModal";
import EditGiftCardModal from "../../../Components/EditAllGiftCardModal/EditGiftCardModal";
import TableAction from "../../../Components/TableNew/TableActions";

const AllGiftCards = () => {
  
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editModal, setEditModal] = useState(false);
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
        <StatusStyledText status={record.status}>
          {record.status}
          {record.status === "active" ? (
            <IoCheckmarkOutline style={{ color: "white",fontSize:'20px' }} />
          ) : (
            <RxCross2 style={{ color: "white",fontSize:'20px' }} />
          )}
        </StatusStyledText>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdat",
      key: "createdat",
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
          onEdit={() => showEditModal(record)}
          onDelete={() => showDeleteModal(record)}
        />
      ),
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
    
    },
  ];

  const scrollConfig = {
    x: 1000, 
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
  const handleDeleteCancel = () => {
    setDeleteModal(false);
    setSelectedRecord(null);
  };

  const formActions = {
    apply: false,
    edit: true,
    delete: true,
  };

  return (
    <AllUserWrapper byTheme={byTheme}>
      <div className="allUsersHeader">
      {deleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          handleCancel={handleDeleteCancel}
          deleteModal={deleteModal}
          record={selectedRecord}
        />
      )}
      {editModal && (
        <EditGiftCardModal
          showEditModal={showEditModal}
          handleEditCancel={handleEditCancel}
          editModal={editModal}
          record={selectedRecord}
        />
      )}
        <h1 className="allUsersHeading">All Gift Card</h1>
      </div>

      <div className="tableDiv">
        <TableNew columns={columns} data={userData} scroll={scrollConfig} />
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


const TableImageWrapper = styled.div`

img {
  width:100px;
  object-fit:contain;
}

`;

const StatusStyledText = styled.span`
  color: #fff;
  background-color: ${({ status }) => (status === "active" ? "#00e633" : "red")};
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor:pointer;
  text-transform:capitalize;
`;


