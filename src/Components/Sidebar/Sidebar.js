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
import { FaUsers } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaGift } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";

export default function Sidebar({ dir, open }) {
  //   const unreadComment = useSelector(
  //     (state) => state.Notification.unReadMessage
  //   );
  const navigate = useNavigate();
  const [type, setType] = useState(false);
  const [width] = useWindowWidth();
  const [isShown, setIsShown] = useState(false);
  const location = window.location.pathname === "/quickdollar/dashboard";
  console.log(location, "location is here!");
  const [showMoreUserOptions, setShowMoreUserOptions] = useState(false);
  const [showMoreOfferOptions, setShowMoreOfferOptions] = useState(false);
  const [showMoreGiftOptions, setShowMoreGiftOptions] = useState(false);
  const [showMoreFrontPageOptions, setShowMoreFrontPageOptions] = useState(false);


  const SidebarData = [
    // {
    //   id: "sidebar.dashboard",
    //   path: "/quickdollar/dashboard",
    //   logo: <MdOutlineDashboardCustomize />,
    // },
    {
      id: "sidebar.drivers",
      path: "/quickdollar/driver",
      logo: <AiOutlineCar />,
    },
    {
      id: "sidebar.dashboard",
      path: "/quickdollar/dashboard",
      logo: <AiFillDashboard />,
    },
    {
      id: "sidebar.user",
      path: "/quickdollar/user",
      logo: <FaUsers />,
    },
    {
      id: "sidebar.offers",
      path: "/quickdollar/offer",
      logo: <IoMail />,
    },
    {
      id: "sidebar.giftCards",
      path: "/quickdollar/giftcard",
      logo: <FaGift />,
    },
    {
      id: "sidebar.sendMessage",
      path: "/quickdollar/sendmessage",
      logo: <IoMail />,
    },
    {
      id: "sidebar.frontPageOffer",
      path: "/quickdollar/frontpageoffer",
      logo: <IoMail />,
    },
    {
      id: "sidebar.announcement",
      path: "/quickdollar/announcement",
      logo: <FaBell />,
    },
    {
      id: "sidebar.promotionEmail",
      path: "/quickdollar/promotionEmail",
      logo: <FaBell />,
    },
  ];

  const additionalUserOptions = [
    {
      id: "sidebar.allUsers",
      path: "/quickdollar/user/allusers",
    },
    {
      id: "sidebar.allAbusedUsers",
      path: "/quickdollar/user/allabused",
    },
    {
      id: "sidebar.addAdminUsers",
      path: "/quickdollar/user/addadminuser",
    },
    {
      id: "sidebar.decryptUserInfo",
      path: "/quickdollar/user/decryptuserinfo",
    },
  ];

  const additionalOffersOptions = [
    {
      id: "sidebar.allOffers",
      path: "/quickdollar/offer/alloffers",
    },
    {
      id: "sidebar.addOffer",
      path: "/quickdollar/offer/addoffer",
    },
    {
      id: "sidebar.addCustomOffers",
      path: "/quickdollar/offer/addcustomoffers",
    },
    {
      id: "sidebar.viewCustomOffers",
      path: "/quickdollar/offer/viewcustomoffers",
    },
    {
      id: "sidebar.completedOffers",
      path: "/quickdollar/offer/completedoffers",
    },
  ];

  const additionalGiftsOptions = [
    {
      id: "sidebar.allGiftCards",
      path: "/quickdollar/giftcard/allgiftcard",
    },
    {
      id: "sidebar.addGiftCard",
      path: "/quickdollar/giftcard/addgiftcard",
    },
    {
      id: "sidebar.requestedGiftCards",
      path: "/quickdollar/giftcard/requestedgiftcard",
    },
    {
      id: "sidebar.deliveredGiftCards",
      path: "/quickdollar/giftcard/deliveredgiftcard",
    },
  ];

  const additionalFrontPageOptions = [
    {
      id: "sidebar.allFrontPageOffer",
      path: "/quickdollar/frontpageoffer/allfrontageoffer",
    },
    {
      id: "sidebar.addFrontPageOffer",
      path: "/quickdollar/frontpageoffer/addfrontpageoffer",
    },
  ];

  const ItemList = () => {
    return (
      <>
        {SidebarData.map((val) => {
          const active = window.location.pathname?.includes(val.path);

          if (active) {
            return (
              <>
                <div key={val.id}>
                  <NavIcon onClick={() => window.location.pathname?.includes(val.path) ? handleItemClick(val.id) : navigate(val.path)}>
                    {val.logo}
                    <p>
                      <IntlMassage id={val.id} />
                    </p>
                  </NavIcon>
                  {getAdditionalOptions(val.id).map((option) => (
                    <NavIcon2 key={option.id} onClick={() => navigate(option.path)}
                      isSubActive={option.path?.includes(window.location.pathname)}

                    >
                      {option.logo}
                      <p>
                        <IntlMassage id={option.id} />
                      </p>
                    </NavIcon2>
                  ))}
                </div>


              </>
            );
          } else {
            return (
              <NavIcon2 key={val.id} onClick={() => navigate(val.path)}>
                {val.logo}
                <p>
                  <IntlMassage id={val.id} />
                </p>
              </NavIcon2>
            );
          }
        })}
      </>
    );

    function handleItemClick(itemId) {
      switch (itemId) {
        case "sidebar.user":
          setShowMoreUserOptions((prev) => !prev);
          setShowMoreOfferOptions(false);
          setShowMoreGiftOptions(false);
          setShowMoreFrontPageOptions(false);
          break;
        case "sidebar.offers":
          setShowMoreUserOptions(false);
          setShowMoreOfferOptions((prev) => !prev);
          setShowMoreGiftOptions(false);
          setShowMoreFrontPageOptions(false);
          break;
        case "sidebar.giftCards":
          setShowMoreUserOptions(false);
          setShowMoreOfferOptions(false);
          setShowMoreGiftOptions((prev) => !prev);
          setShowMoreFrontPageOptions(false);
          break;
        case "sidebar.frontPageOffer":
          setShowMoreUserOptions(false);
          setShowMoreOfferOptions(false);
          setShowMoreGiftOptions(false);
          setShowMoreFrontPageOptions((prev) => !prev);
          break;
        default:
          break;
      }
    }

    function getAdditionalOptions(itemId) {
      console.log(itemId, "itemID")
      switch (itemId) {
        case "sidebar.user":
          return showMoreUserOptions ? additionalUserOptions : [];
        case "sidebar.offers":
          return showMoreOfferOptions ? additionalOffersOptions : [];
        case "sidebar.giftCards":
          return showMoreGiftOptions ? additionalGiftsOptions : [];
        case "sidebar.frontPageOffer":
          return showMoreFrontPageOptions ? additionalFrontPageOptions : [];
        default:
          return [];
      }
    }
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
              setIsShown((current) => !current);
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
  overflow-y: scroll;

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px; 
}

::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 10px; 
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

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
  color: ${({ isSubActive }) => isSubActive && "red"};
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

