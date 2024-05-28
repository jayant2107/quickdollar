import React, { useState } from "react";
import { IntlProvider } from "react-intl";
// import { useSelector } from "react-redux";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Applogo, Vector } from "../../Utils/Images";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineCar } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import IntlMassage from "../../Utils/IntlMassage";
import { useRef } from "react";
import useWindowWidth from "../CustomHook/UseWindowWidth";
import { GoThreeBars } from "react-icons/go";
import "../../Style/global.css";

export default function Sidebar({ dir, open }) {
  //   const unreadComment = useSelector(
  //     (state) => state.Notification.unReadMessage
  //   );
  const navigate = useNavigate();
  const [type, setType] = useState(false);
  const [width] = useWindowWidth();
  const location = window.location.pathname === "/landing/dashboard";
  console.log(location, "location is here!");

  const SidebarData = [
    // {
    //   id: "sidebar.dashboard",
    //   path: "/landing/dashboard",
    //   logo: <MdOutlineDashboardCustomize />,
    // },
    {
      id: "sidebar.drivers",
      path: "/landing/driver",
      logo: <AiOutlineCar />,
    },
    {
      id: "sidebar.users",
      path: "/landing/user",
      logo: <FiUserPlus />,
    },
  ];

  const ItemList = () => {
    return SidebarData.map((val) => {
      const active = window.location.pathname === val.path;
      if (active) {
        return (
          // <Selecteditem onClick={() => navigate(val.path)}>
          //   <img className="dashImg" src={val.img} alt="" />
          //   {val.Label}
          // </Selecteditem>
          <NavIcon onClick={() => navigate(val.path)}>
            {val.logo}
            <p>
              <IntlMassage id={val.id} />
            </p>
          </NavIcon>
        );
      }
      return (
        <NavIcon2 onClick={() => navigate(val.path)}>
          {val.logo}
          <p>
            <IntlMassage id={val.id} />
          </p>
        </NavIcon2>
      );
    });
  };

  const ItemList2 = () => {
    return SidebarData.map((val) => {
      const active = window.location.pathname === val.path;
      if (active) {
        return (
          // <Selecteditem onClick={() => navigate(val.path)}>
          //   <img className="dashImg" src={val.img} alt="" />
          //   {val.Label}
          // </Selecteditem>
          <NavIcon4 onClick={() => navigate(val.path)}>
            {val.logo}
            <p>
              <IntlMassage id={val.id} />
            </p>
          </NavIcon4>
        );
      }
      return (
        <NavIcon3 onClick={() => navigate(val.path)}>
          {val.logo}
          <p>
            <IntlMassage id={val.id} />
          </p>
        </NavIcon3>
      );
    });
  };

  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <>
      {width > 982 ? (
        <SidebarContainer>
          <InnerContainer>
            <LogoWrap>
              <NavLogo src={Applogo}></NavLogo>
            </LogoWrap>
            <SidebarMenu>
              <ItemList />
            </SidebarMenu>
          </InnerContainer>
        </SidebarContainer>
      ) : (
        <>
          <div
            onClick={() => {
              handleClick();
              setType((type) => !type);
            }}
            className="openBtnDiv"
            style={
              type
                ? {
                    width: "26%",
                    display: "flex",
                    justifyContent: "end",
                    zIndex: 9,
                    position: "absolute",
                  }
                : { display: "flex", float: "right" }
            }
          >
            <GoThreeBars style={{ fontSize: "30px" }} />
          </div>

          <SidebarContainer>
            <InnerContainer>
              <LogoWrap>
                <NavLogo src={Applogo}></NavLogo>
              </LogoWrap>
              <SidebarMenu>
                <ItemList />
              </SidebarMenu>
            </InnerContainer>
          </SidebarContainer>
          {isShown ? (
            <SidebarContainer
              style={{
                position: "fixed",
                width: "23%",
                zIndex: 9,
                transition: "all 2s ease",
              }}
              className="clickOpenDiv"
            >
              {/* <div
                style={{ display: "flex", float: "right" }}
                onClick={handleClick}
              >
                <GoThreeBars style={{ fontSize: "30px" }} />
              </div> */}
              <InnerContainer>
                <LogoWrap>
                  <NavLogo src={Applogo}></NavLogo>
                </LogoWrap>
                <SidebarMenu>
                  <ItemList2 />
                </SidebarMenu>
              </InnerContainer>
            </SidebarContainer>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}

const SidebarContainer = styled.div`
  height: 100vh;
  min-height: 550px;
  width: 19%;
  background-color: #252529;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme?.sidebarInnnerDivBg};
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  color: #000;
  position: fixed;
  transition: all ease-out 0.4s;

  @media (max-width: 982px) {
    width: 10%;
  }
`;
const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;
const NavLogo = styled.img`
  width: 45%;
`;
const SidebarMenu = styled.ul`
  display: flex;
  ${"" /* align-items: center; */}
  flex-direction: column;
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
`;
const SidebarMenuItem = styled.li`
  display: flex;
  height: 40px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-top: 5px;
  .active2 {
    color: red;
  }
  a {
    width: 100%;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    border-radius: 10px;
    height: 40px;
    text-decoration: none;
    &:hover {
      background: rgba(0, 0, 0, 0.15);
    }
  }
  .activeLink {
    background: #145da0;
    color: #ffffff;
    &:hover {
      background: #145da0;
      color: #ffffff;
    }
  }
`;
const InnerContainer = styled.div`
  width: 79%;
  margin: 0 auto;
  padding-top: 40px;
`;
const NavIcon = styled.div`
  padding-left: 20px;
  background: ${({ theme }) => theme?.secondaryColor};
  padding-right: 20px;
  font-size: 20px;
  cursor: pointer;
  line-height: 17px;
  color: ${({ theme }) => theme?.sidebarclickheadingcolor};
  display: flex;
  gap: 10px;
  align-items: center;
  ${"" /* justify-content: center; */}
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 10px;

  @media (max-width: 982px) {
    justify-content: center;
    padding-left: 0px;
    padding-right: 0px;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
    margin: 0px;
    font-family: ${({ theme }) => theme?.fontFamily};

    @media (max-width: 982px) {
      display: none;
    }
  }
`;

const NavIcon4 = styled.div`
  padding-left: 20px;
  background: ${({ theme }) => theme?.secondaryColor};
  padding-right: 20px;
  font-size: 20px;
  cursor: pointer;
  line-height: 17px;
  color: ${({ theme }) => theme?.sidebarclickheadingcolor};
  display: flex;
  gap: 10px;
  align-items: center;
  ${"" /* justify-content: center; */}
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 10px;

  @media (max-width: 982px) {
    padding-left: 10px;
    padding-right: 0px;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
    margin: 0px;
    font-family: ${({ theme }) => theme?.fontFamily};
  }
`;

const NavIcon2 = styled.div`
  padding-left: 20px;
  cursor: pointer;
  padding-right: 20px;
  font-size: 20px;
  line-height: 17px;
  color: ${({ theme }) => theme?.sidebarheadingcolor};
  display: flex;
  gap: 10px;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;

  @media (max-width: 982px) {
    justify-content: center;
    padding-left: 0px;
    padding-right: 0px;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
    margin: 0px;
    font-family: ${({ theme }) => theme?.fontFamily};

    @media (max-width: 982px) {
      display: none;
    }
  }
`;

const NavIcon3 = styled.div`
  padding-left: 20px;
  cursor: pointer;
  padding-right: 20px;
  font-size: 20px;
  line-height: 17px;
  color: ${({ theme }) => theme?.sidebarheadingcolor};
  display: flex;
  gap: 10px;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;

  @media (max-width: 982px) {
    padding-left: 10px;
    padding-right: 0px;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
    margin: 0px;
    font-family: ${({ theme }) => theme?.fontFamily};
  }
`;

const Badge = styled.span`
  width: 24px;
  height: 24px;
  margin: 18px 0 0 10px;
  border-radius: 50%;
  background: red;
  color: #fff;
  font-weight: 500;
  left: ${({ Dir }) => Dir === "rtl" && "0px"};
  right: ${({ Dir }) => Dir === "ltr" && "0px"};
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-10px);
`;
