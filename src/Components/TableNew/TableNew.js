import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Table } from "antd";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { CgSearch } from "react-icons/cg";
import Loader from "../Loader/Loader";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditDriver from "../DriverActions/EditDriver";
import SendModal from "../SendModal/SendModal";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  /* Custom Scrollbar Styles */
  * {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  }

  *::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }

`;

const TableNew = ({ columns, data, scroll, Actions, loader }) => {
  const [entries, setEntries] = useState(5);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [viewLoader, setViewLoader] = useState(false);

  const columnsWithSno = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      fixed: "left",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    ...columns,
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (text, record) => (
        <div className="actionIcons">
          {Actions?.apply && <IoIosSend className="icon" onClick={showSendModal} />}
          {Actions?.view && <CgSearch className="icon" />}
          {Actions?.edit && <MdModeEditOutline className="icon" onClick={showEditModal} />}
          {Actions?.delete && <MdDelete className="icon" onClick={showModal} />}
        </div>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: entries,
    showSizeChanger: true,
    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    pageSizeOptions: ["5", "10", "20", "50"],
    onChange: (pageSize) => setEntries(pageSize),
  };

  const showModal = () => {
    setDeleteModal(true);
  };

  const handleCancel = () => {
    setDeleteModal(false);
  };

  const showEditModal = () => {
    setEditModal(true);
  };

  const handleEditCancel = () => {
    setEditModal(false);
  };
  const showSendModal = () => {
    setSendModal(true);
  };

  const handleSendCancel = () => {
    setSendModal(false);
  };

  if (viewLoader) {
    return <Loader />;
  }

  return (
    <>
      <GlobalStyle />
      <TableWrapper>
        {deleteModal && <DeleteModal showModal={showModal} handleCancel={handleCancel} deleteModal={deleteModal} />}
        {editModal && <EditDriver showEditModal={showEditModal} handleEditCancel={handleEditCancel} editModal={editModal} />}
        {sendModal && <SendModal showSendModal={showSendModal} handleSendCancel={handleSendCancel} sendModal={sendModal} />}
        <div className="tableContent">
          <div className="allUsersSearchDiv">
            <div className="searchDiv">
              <label htmlFor="" className="searchLabel">
                Search
              </label>
              <div className="searchField">
                <input className="alluserSearch" type="text" placeholder="Search" />
                <CgSearch className="searchIcon" />
              </div>
            </div>
          </div>
          <Table columns={columnsWithSno} dataSource={data} pagination={paginationConfig} scroll={scroll} />
        </div>
      </TableWrapper>
    </>
  );
};

export default TableNew;

const TableWrapper = styled.div`
  margin-bottom: 20px;

  .tableContent {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .allUsersSearchDiv {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    .searchDiv {
      display: flex;
      flex-direction: column;
      gap: 4px;

      label {
        text-align: start;
      }

      .searchField {
        border: 1px solid #000;
        width: max-content;
        display: flex;
        align-items: center;
        background: #fff;
        padding: 11px 20px 11px 10px;
        gap: 10px;
        box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
        border-radius: 10px;
        border: none;
      }

      .searchIcon {
        font-size: 20px;
        color: rgba(20, 93, 160, 0.604);
        margin-top: 2px;
      }

      input {
        border: none;
        font-size: 15px;

        &:focus {
          outline: none;
        }
      }
    }

    button {
      box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
      font-weight: 600;
      border-radius: 10px;
      border: none;
      padding: 11px 30px;
      cursor: pointer;
    }
  }

  .ant-table-thead > tr > th {
    background: #eff2f5;
    color: #000;
    font-weight: bold;

    &:first-child {
      border-radius: 10px 0 0 10px;
    }

    &:last-child {
      border-radius: 0 10px 10px 0;
    }
  }

  .ant-table-tbody > tr > td {
    background: #fff;
    color: #333;
    border: none;
  }

  .ant-pagination {
    margin-top: 16px;
  }

  .actionIcons {
    display: flex;
    gap: 10px;
  }

  .icon {
    font-size: 25px;
    &:hover {
      cursor: pointer;
    }
  }
`;