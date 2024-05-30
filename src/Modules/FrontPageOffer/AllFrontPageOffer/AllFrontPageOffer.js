import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";

const AllFrontPageOffer = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const [loader, setLoader] = useState();
  const columns = [
    {
      title: "Offer Text",
      width: 200,
      dataIndex: "offertext",
      key: "offertext",
      fixed: "left",
    },
    {
      title: "Offer Link",
      dataIndex: "offerlink",
      key: "offerlink",
      render: (offerlink) => (
        <TableImageWrapper>
          <a href={offerlink}>{offerlink}</a>
        </TableImageWrapper>
      ),
    },
    {
      title: "Offer Image",
      dataIndex: "offerimage",
      key: "offerimage",
      render: (offerimage) => (
        <TableImageWrapper>
          <img src={offerimage} alt="" />
        </TableImageWrapper>
      ),
    },
    {
      title: "Offer Button Image",
      dataIndex: "offerbuttonimage",
      key: "offerbuttonimage",
      render: (offerbuttonimage) => (
        <TableImageWrapper>
          <img src={offerbuttonimage} alt="" />
        </TableImageWrapper>
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
      key: 1,
      offertext: "$5 Bonus Take surveys. Get PAID. Be an influencer. Share your opinion to help brands deliver better products & services. Earn Bonus today",
      offerlink: "https://quickdollarapp.com/kinso2015/assets/images/giftcardimages/paypal_1588529561.png",
      offerimage: "https://quickdollarapp.com/kinso2015/assets/images/giftcardimages/paypal_1588529561.png",
      offerbuttonimage: "https://quickdollarapp.com/kinso2015/assets/images/giftcardimages/paypal_1588529561.png",
      createdat: "2024-05-29",
    },
    {
      key: 2,
      offertext: "Jane Smith",
      offerlink: "https://quickdollarapp.com/kinso2015/assets/images/giftcardimages/paypal_1588529561.png",
      offerimage: "https://quickdollarapp.com/kinso2015/assets/images/giftcardimages/paypal_1588529561.png",
      offerbuttonimage: "https://quickdollarapp.com/kinso2015/assets/images/giftcardimages/paypal_1588529561.png",
      createdat: "2024-05-28",
    },
  ];

  const scrollConfig = {
    x: 1000, // Horizontal scrolling
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
      <div className="allabusedUserHeader">
        <h1 className="allabusedUserHeading">All Front Page Offers</h1>
        {/* <button>Export User Details</button> */}
      </div>

      <div className="tableDiv">
        <TableNew columns={columns} data={userData} scroll={scrollConfig} Actions={formActions}
          loader={loader} />
      </div>
    </AllUserWrapper>
  );
};

export default AllFrontPageOffer;

const AllUserWrapper = styled.div`
  padding-bottom: 35px;
  @media (max-width: 550px) {
    padding-bottom: 25px;
  }

  .allabusedUserHeading {
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

  .allabusedUserHeader {
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

const TableImageWrapper = styled.div`
img {
  width:100px;
  object-fit:contain;
}
`;