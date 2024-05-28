import React, { useState } from "react";
import styled from "styled-components";
import Table from "../../../Components/Table/Table";
import { CgSearch } from "react-icons/cg";
import AddUser from "../../../Components/UserActions/AddUser";
import IntlMassage from "../../../Utils/IntlMassage";
import { useSelector } from "react-redux";

const UserListing = () => {
  const [addUserModal, setAddUserModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const byTheme = useSelector((state) => state?.changeColors?.theme);

  const showAddUserModal = () => {
    setAddUserModal(true);
  };

  const handleAddUserCancel = () => {
    setAddUserModal(false);
  };

  const tableData = [
    {
      srNo: 1,
      driverNaem: "Pankaj",
      lastName: "Bharadwaj",
      email: "pankaj@gmail.com",
      phoneNumber: "7620441289",
    },
    {
      srNo: 2,
      lastName: "Singh",
      driverNaem: "Lovepreet",
      email: "love@gmail.com",
      phoneNumber: "7744901284",
    },
    {
      srNo: 3,
      driverNaem: "Aman",
      lastName: "preet",
      email: "aman@gmail.com",
      phoneNumber: "9811047240",
    },
    {
      srNo: 1,
      driverNaem: "Pankaj",
      lastName: "Bharadwaj",
      email: "pankaj@gmail.com",
      phoneNumber: "7620441289",
    },
    {
      srNo: 2,
      lastName: "Singh",
      driverNaem: "Lovepreet",
      email: "love@gmail.com",
      phoneNumber: "7744901284",
    },
    {
      srNo: 3,
      driverNaem: "Aman",
      lastName: "preet",
      email: "aman@gmail.com",
      phoneNumber: "9811047240",
    },
    {
      srNo: 1,
      driverNaem: "Pankaj",
      lastName: "Bharadwaj",
      email: "pankaj@gmail.com",
      phoneNumber: "7620441289",
    },
    {
      srNo: 2,
      lastName: "Singh",
      driverNaem: "Lovepreet",
      email: "love@gmail.com",
      phoneNumber: "7744901284",
    },
    {
      srNo: 3,
      driverNaem: "Aman",
      lastName: "preet",
      email: "aman@gmail.com",
      phoneNumber: "9811047240",
    },
  ];
  const tableHeader = [
    {
      id: "table.srno",
      tableHeading: "Sr. No.",
    },
    {
      id: "table.username",
      tableHeading: "	Driver Name",
    },
    {
      id: "table.lastname",
      tableHeading: "	Address",
    },
    {
      id: "table.email",
      tableHeading: "	Location Link",
    },
    {
      id: "table.phonenum",
      tableHeading: "Units",
    },
    {
      id: "table.status",
      tableHeading: "Status",
    },
    {
      id: "table.action",
      tableHeading: "Action",
    },
  ];
  const formActions = {
    apply: true,
    view: true,
    edit: false,
    delete: false,
    pathname: "/home/owners/view",
    pathnameEdit: "/home/owners/edit",
    deletepath: "delete_owner/",
    delete_key: "owners_id",
  };

  return (
    <DriverWrapper byTheme={byTheme}>
      <h1 className="driverHeading">
        <IntlMassage id="user.management" />
      </h1>

      <div className="driverBtnDiv">
        <div className="searchExport">
          <div className="searchDiv">
            <CgSearch className="searchIcon" />
            <input className="userSearch" type="text" placeholder="Search" />
          </div>
          {/* <button>
            <IntlMassage id="button.export" />
          </button> */}
        </div>
        {/* <div className="filterDiv">
          <p>
            <IntlMassage id="admin.statusbyfilters" />
          </p>
          <select>
            <option>
              <IntlMassage id="option.all" />
            </option>
            <option>
              <IntlMassage id="option.active" />
            </option>
            <option>
              <IntlMassage id="option.inactive" />
            </option>
          </select>
        </div> */}
        {/* <div className="addBuildingDiv">
          <button onClick={() => showAddUserModal()}>
            <AiOutlinePlus className="plusIcon" />
            <IntlMassage id="button.addnewuser" />
          </button>
        </div> */}
        {addUserModal && (
          <AddUser
            showAddUserModal={showAddUserModal}
            handleAddUserCancel={handleAddUserCancel}
            addUserModal={addUserModal}
          />
        )}
      </div>
      <Table
        tableData={tableData}
        tableHeader={tableHeader}
        Actions={formActions}
        loader={loader}
      />
    </DriverWrapper>
  );
};

export default UserListing;

const DriverWrapper = styled.div`
  padding-bottom: 35px;
  .driverHeading {
    display: flex;
    font-weight: 600;
    font-size: 24px;
    margin: 20px 0px 20px 0px;
    font-family: ${({ theme }) => theme?.fontFamily};
    color: ${({ byTheme }) => (byTheme == "day" ? "#000" : "#fff")};

    @media (max-width: 550px) {
      margin: 0px;
      margin-top: 67px;
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
  .driverBtnDiv {
    display: flex;
    align-items: center;
    justify-content: end;

    @media (max-width: 550px) {
      display: block;
    }
    .searchExport {
      display: flex;
      gap: 10px;
      .searchDiv {
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

        @media (max-width: 550px) {
          width: 100%;
        }
        .searchIcon {
          font-size: 20px;
          color: rgba(20, 93, 160, 0.604);
          margin-top: 2px;
        }
        input {
          border: none;
          font-size: 15px;
          font-family: ${({ theme }) => theme?.fontFamily};
          @media (max-width: 551px) {
            width: 100%;
          }
          &:focus {
            outline: none;
          }
        }
        .userSearch {
          font-family: ${({ theme }) => theme?.fontFamily};
        }
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
    .filterDiv {
      display: flex;
      align-items: center;
      gap: 10px;
      p {
        color: ${({ theme }) => theme?.sidebarInnerHEadingColor};
        font-weight: 700;
        font-size: 14px;
        font-family: ${({ theme }) => theme?.fontFamily};
      }
      select {
        width: 94px;
        border: none;
        border-radius: 10px;
        background: ${({ theme }) => theme?.secondaryColor};
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: ${({ theme }) => theme?.primaryColor};
        box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        cursor: pointer;
        padding: 11px 10px;
        transition: all 0.3s ease-in 0s;
        font-family: ${({ theme }) => theme?.fontFamily};
      }
    }
    .addBuildingDiv {
      button {
        box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
        font-weight: 600;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 3px;
        padding: 13px 30px;
        color: ${({ theme }) => theme?.primaryColor};
        background: ${({ theme }) => theme?.secondaryColor};
        font-family: ${({ theme }) => theme?.fontFamily};
      }
      .plusIcon {
        font-size: 16px;
        margin-bottom: 2px;
      }
    }
  }
`;
