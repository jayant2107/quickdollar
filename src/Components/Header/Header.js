import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsBell } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { Addams, Applogo } from "../../Utils/Images";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authlogout } from "../../Store/Authentication";
import { changelanguage } from "../../Store/Language";
import IntlMassage from "../../Utils/IntlMassage";
import { useNavigate } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineCar } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import useWindowWidth from "../CustomHook/UseWindowWidth";
import { GoThreeBars } from "react-icons/go";
import { MdModeNight } from "react-icons/md";
import { changebgcolor } from "../../Store/ColorTheme";
import { RiSunFill } from "react-icons/ri";

const Header = () => {
  const [type, setTtype] = useState(false);
  const [typeBtn, setTypeBtn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [width] = useWindowWidth();
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  const SwitchLanguage = (type) => {
    if (type === "Ar") {
      dispatch(changelanguage({ language: "ar", dir: "rtl" }));
    }
    if (type === "En") {
      dispatch(changelanguage({ language: "en", dir: "ltr" }));
    }
  };
  const handleBgChange = (key) => {
    console.log(key, "keyyyyy");
    dispatch(changebgcolor(key));
  };

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
    setIsShown((current) => !current);
  };

  const logout = () => {
    dispatch(authlogout());
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
          <div
            className="headerInner"
            style={{
              position: "absolute",
              right: "5px",
            }}
          >
            <div className="nightMode">
              {byTheme == "day" ? (
                <MdModeNight
                  className="moon"
                  onClick={() => handleBgChange("night")}
                />
              ) : (
                <RiSunFill
                  className="sun"
                  onClick={() => handleBgChange("day")}
                />
              )}
            </div>
            <div className="inputDiv">
              <select onChange={(e) => SwitchLanguage(e.target.value)}>
                <option value="En">
                  <IntlMassage id="header.languageeng" />
                </option>
                <option value="Ar">
                  <IntlMassage id="header.languagearb" />
                </option>
              </select>
            </div>
            <div className="profileDiv">
              <img src={Addams} alt="" />
              <FiChevronDown
                className="FiIcon"
                onClick={() => setTtype(!type)}
              />
              {type && (
                <div className="hiddenHeaderDiv">
                  <h4
                    className="hiddenHead1"
                    onClick={() => navigate("/landing/profile")}
                  >
                    <FaUser className="hiddenLogo" />
                    <IntlMassage id="header.profile" />
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
        </div>
      ) : (
        <div className="headerInner">
          <div className="nightMode">
            {byTheme == "day" ? (
              <MdModeNight
                className="moon"
                onClick={() => handleBgChange("night")}
              />
            ) : (
              <RiSunFill
                className="sun"
                onClick={() => handleBgChange("day")}
              />
            )}
          </div>
          <div className="inputDiv">
            <select onChange={(e) => SwitchLanguage(e.target.value)}>
              <option value="En">
                <IntlMassage id="header.languageeng" />
              </option>
              <option value="Ar">
                <IntlMassage id="header.languagearb" />
              </option>
            </select>
          </div>
          <div className="profileDiv">
            <img src={Addams} alt="" />
            <FiChevronDown className="FiIcon" onClick={() => setTtype(!type)} />
            {type && (
              <div className="hiddenHeaderDiv">
                <h4
                  className="hiddenHead1"
                  onClick={() => navigate("/landing/profile")}
                >
                  <FaUser className="hiddenLogo" />
                  <IntlMassage id="header.profile" />
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
      {/* <div className="headerInner">
        <div className="profileDiv">
          <img src={image_url + profilePic} alt="" />
          <FiChevronDown className="FiIcon" onClick={() => setTtype(!type)} />
          {type && (
            <div className="hiddenHeaderDiv">
              <h4
                className="hiddenHead1"
                onClick={() => navigate("/landing/profile")}
              >
                <FaUser className="hiddenLogo" />
                <IntlMassage id="header.profile" />
              </h4>
              <hr className="hrTag" />
              <h4 className="hiddenHead2" onClick={() => handleLogout()}>
                <RiLogoutCircleRLine className="hiddenLogo2" />
                <IntlMassage id="header.logout" />
              </h4>
            </div>
          )}
        </div>
      </div> */}
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

    .nightMode {
      display: flex;
      align-items: center;
      .moon {
        rotate: 180deg;
        font-size: 25px;
        cursor: pointer;
      }
      .sun {
        color: #fff;
        font-size: 25px;
        cursor: pointer;
      }
    }
    .inputDiv {
      display: flex;
      align-items: center;
      gap: 40px;
      .bellIcon {
        color: rgb(20, 93, 160);
        font-size: 28px;
      }
      select {
        width: 94px;
        height: 48px;
        border: none;
        border-radius: 10px;
        position: relative;
        background: rgb(255, 255, 255);
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: rgba(0, 0, 0, 0.6);
        box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        cursor: pointer;
        padding: 0px 20px;
        transition: all 0.3s ease-in 0s;
        font-family: ${({ theme }) => theme?.fontFamily};
      }
    }
    .profileDiv {
      display: flex;
      align-items: center;
      gap: 15px;

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
        ${"" /* cursor: pointer; */}
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
        width: 200px;
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

const SidebarContainer = styled.div`
  height: 100vh;
  min-height: 550px;
  width: 19%;
  background-color: #252529;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  color: #000;
  position: fixed;
  transition: all ease-out 0.4s;

  @media (max-width: 982px) {
    width: 10%;
  }
`;
const InnerContainer = styled.div`
  width: 79%;
  margin: 0 auto;
  padding-top: 40px;
`;
const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;
const NavLogo = styled.img`
  width: 35%;
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
