import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Table } from "antd";
import { CgSearch } from "react-icons/cg";
import Loader from "../Loader";

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

const TableNew = ({
  columns,
  data,
  scroll,
  pagination,
  loader,
  handleSearch,
}) => {
  const columnsWithSno = [...columns];

  return (
    <>
      <GlobalStyle />
      <TableWrapper>
        <div className="tableContent">
          <div className="allUsersSearchDiv">
            <div className="searchDiv">
              <div className="searchField">
                <input
                  className="alluserSearch"
                  type="text"
                  placeholder="Search"
                  onChange={(e) =>
                    handleSearch && handleSearch(e?.target?.value)
                  }
                />
                <CgSearch className="searchIcon" />
              </div>
            </div>
          </div>
          {loader ? (
            <Loader size={28} />
          ) : (
            <Table
              columns={columnsWithSno}
              dataSource={data}
              pagination={pagination}
              scroll={scroll}
            />
          )}
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
