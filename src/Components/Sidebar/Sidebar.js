import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Applogo } from "../../Utils/Images";
import { AiOutlineCar } from "react-icons/ai";
import IntlMassage from "../../Utils/IntlMassage";
import useWindowWidth from "../CustomHook/UseWindowWidth";
import "../../Style/global.css";
import { FaUsers } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaGift } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";


export default function Sidebar() {
  const navigate = useNavigate();
  const [width] = useWindowWidth();
  const [showMoreUserOptions, setShowMoreUserOptions] = useState(false);
  const [showMoreOfferOptions, setShowMoreOfferOptions] = useState(false);
  const [showMoreGiftOptions, setShowMoreGiftOptions] = useState(false);
  const [showMoreFrontPageOptions, setShowMoreFrontPageOptions] = useState(false);

  const SidebarData = [
    {
      name: "sidebar.drivers",
      path: "/quickdollar/driver",
      logo: <AiOutlineCar />,
    },
    {
      name: "Dashboard",
      path: "/quickdollar/dashboard",
      logo: <AiFillDashboard />,
    },
    {
      name: "Users",
      path: "/quickdollar/user",
      logo: <FaUsers />,
    },
    {
      name: "Offers",
      path: "/quickdollar/offer",
      logo: <IoMail />,
    },
    {
      name: "Gift Cards",
      path: "/quickdollar/giftcard",
      logo: <FaGift />,
    },
    {
      name: "Send Message",
      path: "/quickdollar/sendmessage",
      logo: <IoMail />,
    },
    {
      name: "Frontpage Offer",
      path: "/quickdollar/frontpageoffer",
      logo: <IoMail />,
    },
    {
      name: "Annoouncement",
      path: "/quickdollar/announcement",
      logo: <FaBell />,
    },
    {
      name: "Promotion Email",
      path: "/quickdollar/promotionEmail",
      logo: <FaBell />,
    },
  ];

  const additionalUserOptions = [
    {
      name: "All Users",
      path: "/quickdollar/user/allusers",
    },
    {
      name: "All Abused Users",
      path: "/quickdollar/user/allabused",
    },
    {
      name: "Add Admin User",
      path: "/quickdollar/user/addadminuser",
    },
    {
      name: "Decrypt User info",
      path: "/quickdollar/user/decryptuserinfo",
    },
  ];

  const additionalOffersOptions = [
    {
      name: "All Offers",
      path: "/quickdollar/offer/alloffers",
    },
    {
      name: "Add Offer",
      path: "/quickdollar/offer/addoffer",
    },
    {
      name: "Add Custom Offers",
      path: "/quickdollar/offer/addcustomoffers",
    },
    {
      name: "View Custom Offers",
      path: "/quickdollar/offer/viewcustomoffers",
    },
    {
      name: "Completed Offers",
      path: "/quickdollar/offer/completedoffers",
    },
  ];

  const additionalGiftsOptions = [
    {
      name: "All Gift Cards",
      path: "/quickdollar/giftcard/allgiftcard",
    },
    {
      name: "Add Gift Card",
      path: "/quickdollar/giftcard/addgiftcard",
    },
    {
      name: "Requested Gift Cards",
      path: "/quickdollar/giftcard/requestedgiftcard",
    },
    {
      name: "Delivered Gift Cards",
      path: "/quickdollar/giftcard/deliveredgiftcard",
    },
  ];

  const additionalFrontPageOptions = [
    {
      name: "All Frontpage Offer",
      path: "/quickdollar/frontpageoffer/allfrontageoffer",
    },
    {
      name: "Add Frontpage Offer",
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
                <div key={val.name}>
                  <NavIcon onClick={() => handleItemClick(val)} >
                    {val.logo}
                    <p>
                      <IntlMassage id={val.name} />
                    </p>
                  </NavIcon>
                  {val.name === "Users" && showMoreUserOptions && additionalUserOptions.map((option) => (
                    <NavIcon2
                      key={option.name}
                      onClick={() => navigate(option.path)}
                      isSubActive={option.path === window.location.pathname}
                    >
                      {option.logo}
                      <p>
                        <IntlMassage id={option.name} />
                      </p>
                    </NavIcon2>
                  ))}

                  {val.name === "Offers" && showMoreOfferOptions && additionalOffersOptions.map((option) => (
                    <NavIcon2
                      key={option.name}
                      onClick={() => navigate(option.path)}
                      isSubActive={option.path === window.location.pathname}
                    >
                      {option.logo}
                      <p>
                        <IntlMassage id={option.name} />
                      </p>
                    </NavIcon2>
                  ))}
                  {val.name === "Gift Cards" && showMoreGiftOptions && additionalGiftsOptions.map((option) => (
                    <NavIcon2
                      key={option.name}
                      onClick={() => navigate(option.path)}
                      isSubActive={option.path === window.location.pathname}
                    >
                      {option.logo}
                      <p>
                        <IntlMassage id={option.name} />
                      </p>
                    </NavIcon2>
                  ))}
                  {val.name === "Frontpage Offer" && showMoreFrontPageOptions && additionalFrontPageOptions.map((option) => (
                    <NavIcon2
                      key={option.name}
                      onClick={() => navigate(option.path)}
                      isSubActive={option.path === window.location.pathname}
                    >
                      {option.logo}
                      <p>
                        <IntlMassage id={option.name} />
                      </p>
                    </NavIcon2>
                  ))}
                </div>
              </>
            )

          } else {
            return (
              <NavIcon2 key={val.name} onClick={() => navigate(val.path)}>
                {val.logo}
                <p>
                  <IntlMassage id={val.name} />
                </p>
              </NavIcon2>
            );
          }
        })}
      </>
    );
  };


  const handleItemClick = (item) => {
    switch (item.name) {
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
      default:
        navigate(item.path);
        break;
    }
  };


  return (
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

