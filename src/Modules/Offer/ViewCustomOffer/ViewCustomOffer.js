import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TableNew from "../../../Components/TableNew/TableNew";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CustomOffers = () => {
  const byTheme = useSelector((state) => state?.changeColors?.theme);

  const columns = [
    {
      title: "Offer Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Offer Link",
      key: "link",
      dataIndex: "link",
      render: (text, record) => <a>{record.link}</a>,
    },
    {
      title: "Offer Amount in $",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Offer Short Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Geo Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text, record) => (
        <StyledText color={`${record.status == "Active" ? "green" : "red"}`}>
          {record.status}
        </StyledText>
      ),
    },
    {
      title: "Daily Cap Limit",
      key: "limit",
      dataIndex: "limit",
    },
    {
      title: "App Installation",
      key: "installation",
      dataIndex: "installation",
      render: (text, record) => (
        <StyledText color={`${text == "Yes" ? "green" : "red"}`}>
          {text}
        </StyledText>
      ),
    },
    {
      title: "Daily Offer",
      key: "offer",
      dataIndex: "offer",
      render: (text, record) => (
        <StyledText color={`${text == "Yes" ? "green" : "red"}`}>
          {text}
        </StyledText>
      ),
    },
    {
      title: "APPLICATION GROUP ONE-ANDROID",
      key: "oneAndroid",
      dataIndex: "oneAndroid",
      render: (text, record) => (
        <StyledText color={`${text == "Yes" ? "green" : "red"}`}>
          {text}
        </StyledText>
      ),
    },
    {
      title: "APPLICATION GROUP TWO-ANDROID",
      key: "twoAndroid",
      dataIndex: "twoAndroid",
      render: (text, record) => (
        <StyledText color={`${text == "Yes" ? "green" : "red"}`}>
          {text}
        </StyledText>
      ),
    },
    {
      title: "APPLICATION GROUP ONE-IOS",
      key: "oneIos",
      dataIndex: "oneIos",
      render: (text, record) => (
        <StyledText color={`${text == "Yes" ? "green" : "red"}`}>
          {text}
        </StyledText>
      ),
    },
    {
      title: "APPLICATION GROUP TWO-IOS",
      key: "twoIos",
      dataIndex: "twoIos",
      render: (text, record) => (
        <StyledText color={`${text == "Yes" ? "green" : "red"}`}>
          {text}
        </StyledText>
      ),
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
  ];
  const userData = [
    {
      key: "1",
      title: "Sayso Three B0220",
      link: "https://survey.saysoforgood.com/trop/survey/5c015f89e4b0e9006fa7afe6/C0220",
      amount: "NA",
      description: "Survey",
      code: "AF, AL, DZ, AS, AD, AO, AI, AQ, AG, AR, AM, AW, AU, AT, AZ, AX, BS, BH, BD, BB, BY, BE, BZ, BJ, BM, BT, BO, BA, BW, BV, BR, IO, VG, BN, BG, BF, BI, KH, CM, CA, CV, BQ, KY, CI, CF, TD, CL, CN, CX, CC, CO, KM, CG, CD, CK, CR, HR, CU, CW, CY, CZ, DK, DJ, DM, DO, EC, EG, SV, GQ, ER, EE, ET, FK, FO, FJ, FI, FR, GF, PF, TF, GA, GM, GE, DE, GH, GI, GR, GL, GD, GP, GU, GT, GG, GN, GW, GY, HT, HM, HN, HK, HU, IS, IN, ID, IR, IQ, IE, IM, IL, IT, JM, JP, JE, JO, KZ, KE, KI, KW, KG, LA, LV, LB, LS, LR, LY, LI, LT, LU, MO, MK, MG, MW, MY, MV, ML, MT, MH, MQ, MR, MU, YT, MX, FM, MD, MC, MN, ME, MS, MA, MZ, MM, NA, NR, NP, NL, NC, NZ, NI, NE, NG, NU, NF, KP, MP, NO, OM, OT, PK, PW, PS, PA, PG, PY, PE, PH, PN, PL, PT, PR, QA, RE, RO, RU, RW, WS, SM, SA, ST, SN, RS, SC, SL, SG, SX, SK, SI, SB, SO, ZA, GS, KR, SS, ES, LK, BL, SH, KN, LC, MF, PM, VC, SD, SR, SJ, SZ, SE, CH, SY, TW, TJ, TZ, TH, TL, TG, TK, TO, TT, TN, TR, TM, TC, TV, UM, VI, UG, UA, AE, GB, US, UY, UZ, VU, VA, VE, VN, WF, EH, YE, ZM, ZW	",
      status: "Active",
      limit: "NA",
      installation: "Yes",
      offer: "Yes",
      oneAndroid: "No",
      twoAndroid: "No",
      oneIos: "Yes",
      twoIos: "No",
      date: "Nov 06, 2019 18:37:31",
      action: (
        <>
          <EditOutlined style={{ fontSize: "30px" }} />
          <DeleteOutlined style={{ fontSize: "30px" }} />
        </>
      ),
    },
  ];

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

  const scrollConfig = {
    x: 7000, // Horizontal scrolling
  };

  return (
    <AllUserWrapper byTheme={byTheme}>
      <div className="allUsersHeader">
        <h1 className="allUsersHeading">All Custom Offers</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <button style={{ background: "red" }}>De-active All Offers</button>
          <button>Active All Offers</button>
        </div>
      </div>

      <div className="tableDiv">
        <TableNew
          columns={columns}
          data={userData}
          scroll={scrollConfig}
          Actions={formActions}
        />
      </div>
    </AllUserWrapper>
  );
};

export default CustomOffers;

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
    box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
    background: rgb(255, 255, 255);
    border-radius: 10px;
  }
`;

const StyledText = styled.span`
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  padding: 5px 10px;
  border-radius: 5px;
`;
