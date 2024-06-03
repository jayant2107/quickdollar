import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Table } from "antd";
import { CgSearch } from "react-icons/cg";

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

const TableNew = ({ columns, data, scroll }) => {
  const [entries, setEntries] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const columnsWithSno = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      fixed: "left",
      width: 70,
      render: (text, record, index) => (currentPage - 1) * entries + index + 1,
    },
    ...columns,
    
  ];

  const paginationConfig = {
    current: currentPage,
    pageSize: entries,
    showSizeChanger: true,
    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    pageSizeOptions: ["5", "10", "20", "50"],
    onShowSizeChange: (current, size) => {
      setEntries(size);
      setCurrentPage(1); // Reset to first page whenever page size changes
    },
    onChange: (page) => setCurrentPage(page),

  };

  

  return (
    <>
      <GlobalStyle />
      <TableWrapper>
       
        <div className="tableContent">
          <div className="allUsersSearchDiv">
            <div className="searchDiv">
             
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
  font-family: ${({ theme }) => theme?.fontFamily};
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