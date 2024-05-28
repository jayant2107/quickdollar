import React, { useState } from "react";
import styled from "styled-components";
import { MdModeEditOutline } from "react-icons/md";
import { BsEyeFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditDriver from "../DriverActions/EditDriver";
import IntlMassage from "../../Utils/IntlMassage";
import store from "../../Store/Store";
import { activateuser, viewadmin } from "../../Collection/Collection";
import { toast } from "react-toastify";
import { Switch } from "antd";
import TableActions from "./TableActions";
import Loader from "../Loader/Loader";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Table = ({
  tableHeader,
  tableData,
  handleActivateUser,
  Actions,
  loader,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewLoader, setViewLoader] = useState(false);
  const byTheme = useSelector((state) => state?.changeColors?.theme);

  const showModal = () => {
    setDeleteModal(true);
  };

  const handleCancel = () => {
    setDeleteModal(false);
  };
  const showEditModal = () => {
    setEditModal(true);
    // editModalData();
  };

  const handleEditCancel = () => {
    setEditModal(false);
  };

  const nightMode = {
    color: "#fff",
    whiteSpace: "nowrap",
  };
  const dayMode = {
    color: "#000",
    whiteSpace: "nowrap",
  };
  const dayTableBorder = {
    border: "none",
  };
  const nightTableBorder = {
    borderTop: "0.5px solid #484748",
  };

  if (viewLoader) {
    return <Loader />;
  }

  return (
    <TableWrapper byTheme={byTheme}>
      {deleteModal && (
        <DeleteModal
          showModal={showModal}
          handleCancel={handleCancel}
          deleteModal={deleteModal}
        />
      )}
      {editModal && (
        <EditDriver
          showEditModal={showEditModal}
          handleEditCancel={handleEditCancel}
          editModal={editModal}
        />
      )}
      <div className="tableDiv">
        <div
          style={{
            position: "relative",
            background: "transparent",
            width: "100%",
            height: "100%",
          }}
          className="forNightMod"
        >
          <div className="tablInner">
            <table>
              <thead>
                <tr>
                  {tableHeader.map((value) => {
                    return (
                      <>
                        <th
                          className="th1-border"
                          style={byTheme == "day" ? dayMode : nightMode}
                        >
                          <IntlMassage id={value.id} />
                        </th>
                      </>
                    );
                  })}
                </tr>
              </thead>
              {byTheme == "day" ? <div className="marginDiv"></div> : ""}

              {!loader ? (
                tableData.length > 0 ? (
                  <tbody
                    style={byTheme == "day" ? dayTableBorder : nightTableBorder}
                  >
                    {tableData.map((val, index) => {
                      return (
                        <>
                          <tr className="trBorder">
                            <td className="th1-border">{index + 1}</td>
                            {/* <td>{val.profilePicture}</td> */}
                            <td>{val.driverNaem}</td>
                            <td>{val.lastName}</td>
                            <td>{val.email}</td>
                            <td>{val.phoneNumber}</td>
                            <td>
                              <Switch
                                defaultChecked={!val?.isDeactivate}
                                onChange={(event) => {
                                  handleActivateUser(event, val?.id);
                                  // setFieldValue(
                                  //   "disableOrders",
                                  //   checked ? true : false
                                  // );
                                }}
                              />
                            </td>
                            <td className="th2-border">
                              <ul className="tableUl">
                                {/* <li>
                            <BsEyeFill
                              className="tableUlIcon"
                              onClick={() => {
                                showEditModal();
                                handleView(val?.id);
                              }}
                            />
                          </li>
                          <li>
                            <MdModeEditOutline className="tableUlIcon1" />
                          </li>
                          <li>
                            <MdDelete
                              className="tableUlIcon2"
                              onClick={() => showModal()}
                            />
                          </li> */}
                                {Actions.apply ? (
                                  <li
                                  // datalable={intl.formatMessage({
                                  //   id: "table.action",
                                  // })}
                                  >
                                    <TableActions
                                      Data={tableData}
                                      Action={Actions}
                                      id={val.id}
                                      showEditModal={showEditModal}
                                      valId={val?.id}
                                    />
                                  </li>
                                ) : (
                                  {
                                    /* <td
                              datalable={intl.formatMessage({
                                id: "table.action",
                              })}
                            >
                              <NotificationAction
                                Action={Action}
                                id={Data.id}
                              />
                            </td> */
                                  }
                                )}
                              </ul>
                            </td>
                          </tr>
                          {byTheme == "day" ? (
                            <div className="marginDiv"></div>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                  </tbody>
                ) : (
                  <h1
                    style={{
                      width: "100%",
                      position: "absolute",
                      paddingTop: "100px",
                    }}
                  >
                    <i>No Data Found</i>
                  </h1>
                )
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: "200px",
                    left: 0,
                    right: 0,
                    color: "red",
                  }}
                >
                  <CircularProgress color="inherit" />
                </div>
              )}
            </table>
          </div>
        </div>
      </div>
    </TableWrapper>
  );
};

export default Table;

const TableWrapper = styled.div`
  margin-bottom: 20px;
  .tableDiv {
    margin-top: 20px;
    background: ${({ theme }) => theme?.sidebarInnnerDivBg};
    box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
    border-radius: 10px;

    .forNightMod {
      border: ${({ byTheme }) =>
        byTheme == "day" ? "none" : "0.5px solid #484748"};
      border-radius: 8px;
    }
    .tablInner {
      padding: ${({ byTheme }) =>
        byTheme == "day" ? "40px 10px" : "40px 0px"};
      min-height: 400px;

      .trBorder {
        border-bottom: ${({ byTheme }) =>
          byTheme == "day" ? "none" : "0.5px solid #484748"};
        .tableUl {
          list-style-type: none;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0px;
          margin: 0px;

          .tableUlIcon {
            font-size: 18px;
          }
          .tableUlIcon1 {
            font-size: 18px;
            color: ${({ theme }) => theme?.iconFillColor};
          }
          .tableUlIcon2 {
            font-size: 20px;
          }

          li {
            cursor: pointer;
          }
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 47px;
          height: 22px;

          input {
            opacity: 0;
            width: 0;
            height: 0;
          }
          input:checked + .slider {
            background-color: ${({ theme }) => theme?.activeButtonBg};
          }

          input:focus + .slider {
            box-shadow: 0 0 1px #2196f3;
          }

          input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
          }
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: 0.4s;
            transition: 0.4s;

            &:before {
              position: absolute;
              content: "";
              height: 19px;
              width: 19px;
              left: 2px;
              right: 2px;
              bottom: 2px;
              background-color: white;
              -webkit-transition: 0.4s;
              transition: 0.4s;
            }
          }
          .slider.round {
            border-radius: 34px;
          }

          .slider.round:before {
            border-radius: 50%;
          }
        }
      }

      table {
        border-collapse: collapse;
        width: 100%;
        height: 100%;
        ${"" /* position: relative; */}
        .marginDiv {
          margin-bottom: 8px;
        }

        tr {
          border-radius: 10px;
          border-collapse: separate;
          border-radius: 8px;

          .th1-border {
            border-radius: 10px 0px 0px 10px;
          }
          .th2-border {
            border-radius: 0px 10px 10px 0px;
          }
          th {
            text-align: left;
            padding: 12px 15px;
            font-size: 14px;
            font-family: ${({ theme }) => theme?.fontFamily};
          }
          td {
            text-align: left;
            padding: 12px 15px;
            font-size: 14px;
            color: ${({ theme }) => theme?.tableRowColor};
            background: ${({ theme }) => theme?.tableRowBg};
            font-family: ${({ theme }) => theme?.fontFamily};
          }
        }
      }

      @media (max-width: 1150px) {
        display: flex;
        overflow-x: scroll;
      }
    }
  }
`;
