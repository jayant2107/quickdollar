import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Applogo } from "../../Utils/Images";
import IntlMassage from "../../Utils/IntlMassage";
import useWindowWidth from "../CustomHook/UseWindowWidth";
import "../../Style/global.css";
import { FaUsers, FaGift, FaBell } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { AiFillDashboard } from "react-icons/ai";
import DecryptUserInfo from "../../Modules/User/DecryptUser/DecryptUserInfo";
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import { Switch } from 'antd';


export default function Sidebar() {
  const navigate = useNavigate();
  const [width] = useWindowWidth();
  const location = useLocation();
  const [showMoreUserOptions, setShowMoreUserOptions] = useState(location.state?.showMoreUserOptions || false);
  const [showMoreOfferOptions, setShowMoreOfferOptions] = useState(location.state?.showMoreOfferOptions || false);
  const [showMoreGiftOptions, setShowMoreGiftOptions] = useState(location.state?.showMoreGiftOptions || false);
  const [showMoreFrontPageOptions, setShowMoreFrontPageOptions] = useState(location.state?.showMoreFrontPageOptions || false);
  const [showMoreSettingOptions, setShowMoreSettingOptions] = useState(location.state?.showMoreSettingOptions || false);
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const renderIntlMassage = (text) => {
    const maxLength = 8;
    if (text.length > maxLength) {
      const truncatedText = `${text.slice(0, maxLength)}...`;
      return (
        <Tooltip title={text}>
          <span>{truncatedText}</span>
        </Tooltip>
      );
    } else {
      return <span>{text}</span>;
    }
  };

  const onToggleChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  useEffect(() => {
    navigate(location.pathname, {
      state: {
        showMoreUserOptions,
        showMoreOfferOptions,
        showMoreGiftOptions,
        showMoreFrontPageOptions,
        showMoreSettingOptions
      }
    });
  }, [
    showMoreUserOptions,
    showMoreOfferOptions,
    showMoreGiftOptions,
    showMoreFrontPageOptions,
    showMoreSettingOptions,
    navigate,
    location.pathname
  ]);

  const ItemList = () => {
    return (
      <>
        {location.pathname === "/quickdollar/dashboard" ? (
          <NavIcon onClick={() => navigate("/quickdollar/dashboard")}>
            <AiFillDashboard />
            <p>
              Dashboard
            </p>
          </NavIcon>
        ) : (
          <NavIcon2 onClick={() => navigate("/quickdollar/dashboard")}>
            <AiFillDashboard />
            <p>
              Dashboard
            </p>
          </NavIcon2>
        )}

        {location.pathname === "/quickdollar/user/allusers" || location.pathname === "/quickdollar/user/allabused" || location.pathname === "/quickdollar/user/addadminuser" || location.pathname === "/quickdollar/user/decryptuserinfo" ? (
          <NavIcon onClick={() => handleItemClick("Users")}>
            <FaUsers />
            <p>
              Users
            </p>
          </NavIcon>
        ) : (
          <NavIcon2 onClick={() => handleItemClick("Users")}>
            <FaUsers />
            <p>
              Users
            </p>
          </NavIcon2>
        )}
        {showMoreUserOptions && (
          <div style={{ paddingLeft: "30px" }}>
            <NavIcon2 isActive={location.pathname === "/quickdollar/user/allusers"} onClick={() => navigate("/quickdollar/user/allusers")}>
              <p>
                All Users
              </p>
            </NavIcon2>
            <NavIcon2 isActive={location.pathname === "/quickdollar/user/allabused"} onClick={() => navigate("/quickdollar/user/allabused")}>
              <p>
                All Abused Users
              </p>
            </NavIcon2>
            <NavIcon2 isActive={location.pathname === "/quickdollar/user/addadminuser"} onClick={() => navigate("/quickdollar/user/addadminuser")}>
              <p>
                Add Admin User
              </p>
            </NavIcon2>
            <NavIcon2 onClick={handleModalOpen}>
              <p>
                Decrypt User info
              </p>
            </NavIcon2>
          </div>
        )}

        {location.pathname === "/quickdollar/offer/alloffers" || location.pathname === "/quickdollar/offer/addoffer" || location.pathname === "/quickdollar/offer/addcustomoffers" || location.pathname === "/quickdollar/offer/viewcustomoffers" || location.pathname === "/quickdollar/offer/completedoffers" ||  location.pathname === "/quickdollar/offer/editOffer" ? (
          <NavIcon onClick={() => handleItemClick("Offers")}>
            <IoMail />
            <p>
              Offers
            </p>
          </NavIcon>
        ) : (
          <NavIcon2 onClick={() => handleItemClick("Offers")}>
            <IoMail />
            <p>
              Offers
            </p>
          </NavIcon2>
        )}
        {showMoreOfferOptions && (
          <div style={{ paddingLeft: "30px" }}>
            <NavIcon2 isActive={location.pathname === "/quickdollar/offer/alloffers"} onClick={() => navigate("/quickdollar/offer/alloffers")}>
              <p>
                All Offers
              </p>
            </NavIcon2>
            <NavIcon2 isActive={location.pathname === "/quickdollar/offer/addoffer"} onClick={() => navigate("/quickdollar/offer/addoffer")}>
              <p>
                Add Offer
              </p>
            </NavIcon2>
            {/* <NavIcon2 isActive={location.pathname === "/quickdollar/offer/addcustomoffers"} onClick={() => navigate("/quickdollar/offer/addcustomoffers")}>
              <p>
                Add Custom Offers
              </p>
            </NavIcon2> */}
            <NavIcon2 isActive={location.pathname === "/quickdollar/offer/viewcustomoffers"} onClick={() => navigate("/quickdollar/offer/viewcustomoffers")}>
              <p>
                View Custom Offers
              </p>
            </NavIcon2>
            <NavIcon2 isActive={location.pathname === "/quickdollar/offer/completedoffers"} onClick={() => navigate("/quickdollar/offer/completedoffers")}>
              <p>
                Completed Offers
              </p>
            </NavIcon2>
          </div>
        )}

        {location.pathname === "/quickdollar/giftcard/allgiftcard" || location.pathname === "/quickdollar/giftcard/addgiftcard" || location.pathname === "/quickdollar/giftcard/requestedgiftcard" || location.pathname === "/quickdollar/giftcard/deliveredgiftcard" ? (
          <NavIcon onClick={() => handleItemClick("Gift Cards")}>
            <FaGift />
            <p>
              Gift Cards
            </p>
          </NavIcon>
        ) : (
          <NavIcon2 onClick={() => handleItemClick("Gift Cards")}>
            <FaGift />
            <p>
              Gift Cards
            </p>
          </NavIcon2>
        )}
        {showMoreGiftOptions && (
          <div style={{ paddingLeft: "30px" }}>
            <NavIcon2 isActive={location.pathname === "/quickdollar/giftcard/allgiftcard"} onClick={() => navigate("/quickdollar/giftcard/allgiftcard")}>
              <p>
                All Gift Cards
              </p>
            </NavIcon2>
            <NavIcon2 isActive={location.pathname === "/quickdollar/giftcard/addgiftcard"} onClick={() => navigate("/quickdollar/giftcard/addgiftcard")}>
              <p>
                Add Gift Card
              </p>
            </NavIcon2>
            <NavIcon2 isActive={location.pathname === "/quickdollar/giftcard/requestedgiftcard"} onClick={() => navigate("/quickdollar/giftcard/requestedgiftcard")}>
              <p>
                Requested Gift Card
              </p>
            </NavIcon2>
            <NavIcon2 isActive={location.pathname === "/quickdollar/giftcard/deliveredgiftcard"} onClick={() => navigate("/quickdollar/giftcard/deliveredgiftcard")}>
              <p>
                Delivered Gift Cards
              </p>
            </NavIcon2>
          </div>
        )}

        {location.pathname === "/quickdollar/sendmessage" ? (
          <NavIcon onClick={() => navigate("/quickdollar/sendmessage")}>
            <IoMail />
            <p>
              Send Message
            </p>
          </NavIcon>
        ) : (
          <NavIcon2 onClick={() => navigate("/quickdollar/sendmessage")}>
            <IoMail />
            <p>
              Send Message
            </p>
          </NavIcon2>
        )}

        {location.pathname === "/quickdollar/frontpageoffer/allfrontageoffer" || location.pathname === "/quickdollar/frontpageoffer/addfrontpageoffer" ? (
          <NavIcon onClick={() => handleItemClick("Frontpage Offer")}>
            <IoMail />
            <p>
              Frontpage Offer
            </p>
          </NavIcon>
        ) : (
          <NavIcon2 onClick={() => handleItemClick("Frontpage Offer")}>
            <IoMail />
            <p>
              Frontpage Offer
            </p>
          </NavIcon2>
        )}
        {showMoreFrontPageOptions && (
          <div style={{ paddingLeft: "30px" }}>
            <NavIcon2 isActive={location.pathname === "/quickdollar/frontpageoffer/allfrontageoffer"} onClick={() => navigate("/quickdollar/frontpageoffer/allfrontageoffer")}>
              <p>
                All Frontpage Offer
              </p>
            </NavIcon2>
            <NavIcon2 isActive={location.pathname === "/quickdollar/frontpageoffer/addfrontpageoffer"} onClick={() => navigate("/quickdollar/frontpageoffer/addfrontpageoffer")}>
              <p>
                Add Frontpage Offer
              </p>
            </NavIcon2>
          </div>
        )}

        {location.pathname === "/quickdollar/announcement" ? (
          <NavIcon onClick={() => navigate("/quickdollar/announcement")}>
            <FaBell />
            <p>
              Announcement
            </p>
          </NavIcon>
        ) : (
          <NavIcon2 onClick={() => navigate("/quickdollar/announcement")}>
            <FaBell />
            <p>
              Announcement
            </p>
          </NavIcon2>
        )}

        {location.pathname === "/quickdollar/promotionEmail" ? (
          <NavIcon onClick={() => navigate("/quickdollar/promotionEmail")}>
            <FaBell />
            <p>
              Promotion Email
            </p>
          </NavIcon>
        ) : (
          <NavIcon2 onClick={() => navigate("/quickdollar/promotionEmail")}>
            <FaBell />
            <p>
              Promotion Email
            </p>
          </NavIcon2>
        )}

        {location.pathname === "/quickdollar/settings/web" || location.pathname === "/quickdollar/settings/android" || location.pathname === "/quickdollar/settings/ios" ? (
          <NavIcon onClick={() => handleItemClick("Settings")}>
            <SettingsIcon />
            <p>
              Settings
            </p>
          </NavIcon>
        ) : (
          <NavIcon2 onClick={() => handleItemClick("Settings")}>
            <SettingsIcon />
            <p>
              Settings
            </p>
          </NavIcon2>
        )}
        {showMoreSettingOptions && (
          <div style={{ paddingLeft: "30px" }}>
            <NavIcon2 isActive={location.pathname === "/quickdollar/settings/web"} onClick={() => navigate("/quickdollar/settings/web")}>
              <p>
                WEB
              </p>
            </NavIcon2>
            <NavIcon2 isActive={location.pathname === "/quickdollar/settings/android"} onClick={() => navigate("/quickdollar/settings/android")}>
              <p>
                Android
              </p>
            </NavIcon2>
            <NavIcon2 isActive={location.pathname === "/quickdollar/settings/ios"} onClick={() => navigate("/quickdollar/settings/ios")}>
              <p>
                IOS
              </p>
            </NavIcon2>
          </div>
        )}
        <NavIcon2>
          <p>
            Pause API Survey
          </p>
          <Switch onChange={onToggleChange} />
        </NavIcon2>
      </>
    )
  }
  const handleItemClick = (item) => {
    switch (item) {
      case "Users":
        setShowMoreUserOptions((prev) => !prev);
        break;
      case "Offers":
        setShowMoreOfferOptions((prev) => !prev);
        break;
      case "Gift Cards":
        setShowMoreGiftOptions((prev) => !prev);
        break;
      case "Frontpage Offer":
        setShowMoreFrontPageOptions((prev) => !prev);
        break;
      case "Settings":
        setShowMoreSettingOptions((prev) => !prev);
        break;
      default:
        navigate(item.path);
        break;
    }
  };

  return (
    <>
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
      <DecryptUserInfo triggerModal={showModal} setTriggerModal={setShowModal} />
    </>

  );

}

const SidebarContainer = styled.div`
  height: 100vh;
  min-height: 550px;
  width: 277px;
  background-color: #252529;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme?.sidebarInnnerDivBg};
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  color: #000;
  position: fixed;
  transition: all ease-out 0.8s;
  // overflow-y: scroll;






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
  width: 80%;
`;
const SidebarMenu = styled.ul`
  display: flex;
  ${"" /* align-items: center; */}
  flex-direction: column;
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  height:78vh;
  scrollbar-width: none;
 
`;
// const SidebarMenuItem = styled.li`
//   display: flex;
//   height: 40px;
//   text-decoration: none;
//   font-weight: 500;
//   font-size: 14px;
//   line-height: 17px;
//   align-items: center;
//   flex-direction: row;
//   justify-content: flex-start;
//   width: 100%;
//   margin-top: 5px;
//   .active2 {
//     color: red;
//   }
//   a {
//     width: 100%;
//     font-weight: 500;
//     font-size: 14px;
//     line-height: 17px;
//     color: rgba(0, 0, 0, 0.6);
//     text-decoration: none;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: start;
//     border-radius: 10px;
//     height: 40px;
//     text-decoration: none;
//     &:hover {
//       background: rgba(0, 0, 0, 0.15);
//     }
//   }
//   .activeLink {
//     background: #145da0;
//     color: #ffffff;
//     &:hover {
//       background: #145da0;
//       color: #ffffff;
//     }
//   }
// `;
const InnerContainer = styled.div`
  width: 79%;
  margin: 0 auto;
  padding-top: 40px;
`;
const NavIcon = styled.div`
  padding-left: 8px;
  background: ${({ theme }) => theme?.secondaryColor};
  padding-right: 8px;
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
width: calc(100% - 20px);
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

// const NavIcon4 = styled.div`
//   padding-left: 20px;
//   background: ${({ theme }) => theme?.secondaryColor};
//   padding-right: 20px;
//   font-size: 20px;
//   cursor: pointer;
//   line-height: 17px;
//   color: ${({ theme }) => theme?.sidebarclickheadingcolor};
//   display: flex;
//   gap: 10px;
//   align-items: center;
//   ${"" /* justify-content: center; */}
//   padding-top: 15px;
//   padding-bottom: 15px;
//   border-radius: 10px;

//   @media (max-width: 982px) {
//     padding-left: 10px;
//     padding-right: 0px;
//   }

//   p {
//     font-size: 14px;
//     font-weight: 600;
//     line-height: 1.3;
//     margin: 0px;
//     font-family: ${({ theme }) => theme?.fontFamily};
//   }
// `;

const NavIcon2 = styled.div`
  padding-left: 8px;
  cursor: pointer;
  padding-right: 8px;
  width: calc(100% - 20px);
  font-size: 20px;
  font-size: 20px;
  line-height: 17px;
  color: ${({ isSubActive }) => isSubActive && "#3892EE"};
  display: flex;
  gap: 10px;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
 &:hover {
    color: #3892EE;
  }
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

    ${({ isActive }) => isActive && `
    color: #3892EE;
  `}

    @media (max-width: 982px) {
      display: none;
    }
  }
`;



// const NavIcon3 = styled.div`
//   padding-left: 20px;
//   cursor: pointer;
//   padding-right: 20px;
//   font-size: 20px;
//   line-height: 17px;
//   color: ${({ theme }) => theme?.sidebarheadingcolor};
//   display: flex;
//   gap: 10px;
//   align-items: center;
//   padding-top: 15px;
//   padding-bottom: 15px;

//   @media (max-width: 982px) {
//     padding-left: 10px;
//     padding-right: 0px;
//   }

//   p {
//     font-size: 14px;
//     font-weight: 600;
//     line-height: 1.3;
//     margin: 0px;
//     font-family: ${({ theme }) => theme?.fontFamily};
//   }
// `;

// const Badge = styled.span`
//   width: 24px;
//   height: 24px;
//   margin: 18px 0 0 10px;
//   border-radius: 50%;
//   background: red;
//   color: #fff;
//   font-weight: 500;
//   left: ${({ Dir }) => Dir === "rtl" && "0px"};
//   right: ${({ Dir }) => Dir === "ltr" && "0px"};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transform: translateY(-10px);
// `;

