import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import { Applogo } from "../../Utils/Images";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authlogout } from "../../Store/Authentication";
import IntlMassage from "../../Utils/IntlMassage";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowWidth from "../CustomHook/UseWindowWidth";
import { GoThreeBars } from "react-icons/go";
import { FaUsers, FaGift, FaBell } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { AiFillDashboard } from "react-icons/ai";
import SettingsIcon from '@mui/icons-material/Settings';
import { Switch } from 'antd';

const Header = () => {
  const [type, setTtype] = useState(false);
  const [typeBtn, setTypeBtn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [width] = useWindowWidth();
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const profileDivRef = useRef(null);
  const sideBarDivRef = useRef(null);
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

  const ItemList2 = () => {
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

        {location.pathname === "/quickdollar/offer/alloffers" || location.pathname === "/quickdollar/offer/addoffer" || location.pathname === "/quickdollar/offer/addcustomoffers" || location.pathname === "/quickdollar/offer/viewcustomoffers" || location.pathname === "/quickdollar/offer/completedoffers" || location.pathname === "/quickdollar/offer/editOffer" ? (
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
                <IntlMassage id="Add Custom Offers" />
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
                Requested Gift Cards
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

  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDivRef.current && !profileDivRef.current.contains(event.target)) {
        setTtype(false);
      }
      else if (sideBarDivRef.current && !sideBarDivRef.current.contains(event.target)) {
        setIsShown(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDivRef, sideBarDivRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarDivRef.current && !sideBarDivRef.current.contains(event.target)) {
        setIsShown(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sideBarDivRef]);

  const handleChangePassword = () => {
    navigate("/quickdollar/profile")
    setTtype(false);
  }
  const logout = () => {
    dispatch(authlogout());
    setTtype(false);
  };

  return (
    <HeaderWrapper byTheme={byTheme}>
      {width < 983 && width > 280 ? (
        <div className="headerBtnDiv">
          <div
            className="openBtnDiv"
            style={
              { display: "flex", paddingLeft: "20px" }
            }
          >
            <GoThreeBars
              style={{ fontSize: "30px" }}
              onClick={() => {
                handleClick();
                setTypeBtn((type) => !type);
              }}
            />
          </div>
          {isShown ? (
            <SidebarContainer
              ref={sideBarDivRef}
              className="clickOpenDiv2"
              style={{
                position: "absolute",
                width: "23%",
                zIndex: 9,
                transition: "all 2s ease",
                height: "100vh",
              }}
            >
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
          <div
            className="headerInner"
            style={{
              position: "absolute",
              right: "5px",
            }}
          >
            <div className="profileDiv" ref={profileDivRef}>
              {/* <img src={Addams} alt="" /> */}
              <p className="quickAdmin" onClick={() => setTtype(!type)}>Quick Admin</p>
              <FiChevronDown
                className="FiIcon"
                onClick={() => setTtype(!type)}
              />
              {type && (
                <div className="hiddenHeaderDiv">
                  <h4
                    className="hiddenHead1"
                    onClick={() => handleChangePassword()}
                  >
                    <FaUser className="hiddenLogo" />
                    Change Password
                  </h4>
                  <hr className="hrTag" />
                  <h4 onClick={logout} className="hiddenHead2">
                    <RiLogoutCircleRLine className="hiddenLogo2" />
                    Logout
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="headerInner">
          <div className="profileDiv" ref={profileDivRef}>
            {/* <img src={Addams} alt="" /> */}
            <p className="quickAdmin" onClick={() => setTtype(!type)}>Quick Admin</p>
            <FiChevronDown className="FiIcon" onClick={() => setTtype(!type)} />
            {type && (
              <div className="hiddenHeaderDiv">
                <h4
                  className="hiddenHead1"
                  onClick={() => handleChangePassword()}
                >
                  <FaUser className="hiddenLogo" />
                  Change Password
                </h4>
                <hr className="hrTag" />
                <h4 onClick={logout} className="hiddenHead2">
                  <RiLogoutCircleRLine className="hiddenLogo2" />
                  <IntlMassage id="header.logout" />
                </h4>
              </div>
            )}
          </div>
        </div>
      )}
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  @media (max-width: 983px) {
    height: 50px;
    position: fixed;
    width: 100%;
    z-index: 9;

    -webkit-box-shadow: 0 3px 5px -3px #000;
    -moz-box-shadow: 0 3px 5px -3px #000;
    box-shadow: 0 3px 5px -3px #000;
    left: 0;
    top: 0;
    background: #fff;
    border-radius: 6px;
  }
  .headerBtnDiv {
    position: relative;
    display: flex;

    @media (max-width: 983px) {
      align-items: center;
      height: 50px;
    }
  }
  .headerInner {
    display: flex;
    gap: 35px;
    justify-content: end;

    .profileDiv {
      display: flex;
      align-items: center;
      gap: 15px;
    .quickAdmin{
   font-size: 18px;
    font-weight: 500;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
    }
      @media (max-width: 983px) {
        gap: 5px;
      }
      .FiIcon {
        font-size: 25px;
        font-weight: 500;
        cursor: pointer;
        color: ${({ byTheme }) => (byTheme == "day" ? "#000" : "#fff")};
      }
      img {
        height: 42px;
        width: 42px;
        border-radius: 50%;
        border: none;
        border: ${({ byTheme }) =>
    byTheme == "day" ? "none" : "2.5px solid #fff"};
      }
      .hiddenHeaderDiv {
        background: #fff;
        position: absolute;
        top: 90px;
        min-width: 300px;
        right: 40px;
        padding: 10px 5px;
        border-radius: 7px;
        box-shadow: rgba(61, 107, 192, 0.5) 0px 2px 8px;
        transition: all 0.5s ease-out 0s;
        z-index: 9;
        @media only screen and (min-width: 320px) and (max-width: 480px) {
          min-width: 200px;
          }

        @media (max-width: 983px) {
          top: 55px;
          right: 8px;
        }
        .hiddenHead1 {
          margin: 0px;
          font-size: 14px;
          padding: 10px;
          display: flex;
          align-items: center;
          cursor: pointer;
          gap: 15px;
          font-family: ${({ theme }) => theme?.fontFamily};

          .hiddenLogo {
            font-size: 17px;
          }
          :hover{
          color:#145da0
          }
        }
        .hiddenHead2 {
          margin: 0px;
          font-size: 14px;
          padding: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 15px;
          font-family: ${({ theme }) => theme?.fontFamily};
          :hover{
            color:#145da0
            }
          .hiddenLogo2 {
            font-size: 17px;
            color: #ff0000d6;
          }
        }
        .hrTag {
          width: 90%;
          margin: auto;
        }
      }
    }
  }
`;

const NavIcon = styled.div`
  padding-left: 20px;
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
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 10px;
  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
    margin: 0px;
    font-family: ${({ theme }) => theme?.fontFamily};
`;
const NavIcon2 = styled.div`
padding-left: 20px;
cursor: pointer;
padding-right: 20px;
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
p {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0px;
  font-family: ${({ theme }) => theme?.fontFamily};
  ${({ isActive }) => isActive && `
  color: #3892EE;
`}
`;

const SidebarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 25px;
  height: 100%;
  padding: 10px 0px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: max-content;
  // height: 100%;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 20px;
  color: rgb(0, 0, 0);
  position: fixed;
  transition: all 0.4s ease-out 0s;
  // overflow-y: scroll;
  top: 3px;
    height: 100vh;
    
`;

const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NavLogo = styled.img`
  height: 80px;
  width: 100%;
  max-width: 130px;
  padding-top:35px

`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding:20px;
  overflow-y: scroll;
  height: 78vh;
  scrollbar-width: none;
  
  
`;