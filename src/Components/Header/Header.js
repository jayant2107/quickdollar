import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BsBell } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { Addams, Applogo } from "../../Utils/Images";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authlogout } from "../../Store/Authentication";
import IntlMassage from "../../Utils/IntlMassage";
import { useNavigate } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineCar } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import useWindowWidth from "../CustomHook/UseWindowWidth";
import { GoThreeBars } from "react-icons/go";

const Header = () => {
  const [type, setTtype] = useState(false);
  const [typeBtn, setTypeBtn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [width] = useWindowWidth();
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const profileDivRef = useRef(null);

  const SidebarData = [
    {
      id: "sidebar.dashboard",
      path: "/landing/dashboard",
      logo: <MdOutlineDashboardCustomize />,
    },
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

  const ItemList2 = () => {
    return SidebarData.map((val) => {
      const active = window.location.pathname === val.path;
      if (active) {
        return (
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
    setIsShown((current) => !current);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDivRef.current && !profileDivRef.current.contains(event.target)) {
        setTtype(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDivRef]);

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
      {width < 551 && width > 280 ? (
        <div className="headerBtnDiv">
          <div
            className="openBtnDiv"
            style={
              typeBtn
                ? {
                  width: "26%",
                  display: "flex",
                  justifyContent: "end",
                  zIndex: 9,
                  position: "absolute",
                }
                : { display: "flex", padding: "0px" }
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
              className="clickOpenDiv2"
              style={{
                position: "absolute",
                width: "23%",
                zIndex: 9,
                transition: "all 2s ease",
                height: "110vh",
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
  @media (max-width: 550px) {
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

    @media (max-width: 550px) {
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
      @media (max-width: 550px) {
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

        @media (max-width: 550px) {
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
  background: ${({ theme }) => theme?.secondaryColor};
  padding-right: 20px;
  font-size: 20px;
  cursor: pointer;
  line-height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    margin: 0px;
  }
`;
const NavIcon2 = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  font-size: 20px;
  cursor: pointer;
  line-height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    margin: 0px;
  }
`;
const NavIcon3 = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  font-size: 20px;
  cursor: pointer;
  line-height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    margin: 0px;
  }
`;
const NavIcon4 = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  font-size: 20px;
  cursor: pointer;
  background: ${({ theme }) => theme?.primaryColor};
  color: ${({ theme }) => theme?.secondaryColor};
  line-height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    margin: 0px;
  }
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
  width: 100%;
  height: 100%;
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
  max-width: 80px;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;