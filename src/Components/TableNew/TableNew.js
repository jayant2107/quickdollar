import React, { useState } from "react";
import styled from "styled-components";
import { Table } from "antd";
import { MdModeEditOutline } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { CgSearch } from "react-icons/cg";

const TableNew = ({ columns, data, scroll }) => {
    const [entries, setEntries] = useState(5);

    const columnsWithSno = [
        {
            title: "S.No",
            dataIndex: "sno",
            key: "sno",
            fixed: "left",
            width: 70,
            render: (index) => index + 1,
        },
        ...columns,
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 100,
            render: () => (
                <div className="actionIcons">
                    <IoIosSend className="icon" />
                    <MdModeEditOutline className="icon" />
                    <MdDelete className="icon" />
                </div>
            ),
        },
    ];

    const paginationConfig = {
        pageSize: entries,
        showSizeChanger: true, // Allow changing the page size
        showTotal: (total, range) =>
            `Showing ${ range[0]} to ${ range[1]} of ${ total } entries`,
                pageSizeOptions: ["5", "10", "20", "50"], // Define the available page size options
                    onChange: (pageSize) => {
                        setEntries(pageSize);
                    },
  };

return (
    <TableWrapper>
        <div className="tableContent">
            <div className="allUsersSearchDiv">
                <div className="searchDiv">
                    <label htmlFor="" className="searchLabel">
                        Search
                    </label>
                    <div className="searchField">
                        <input
                            className="alluserSearch"
                            type="text"
                            placeholder="Search"
                        />
                        <CgSearch className="searchIcon" />
                    </div>
                </div>
            </div>
            <Table
                columns={columnsWithSno}
                dataSource={data}
                pagination={paginationConfig}
                scroll={scroll}
            />
        </div>
    </TableWrapper>
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
    // text-align: left; // Align pagination to the left
  }
  .actionIcons {
    display: flex;
    gap: 10px;
  }

  .icon {
    font-size: 30px;
    &:hover {
      cursor: pointer;
    }
  }
`;