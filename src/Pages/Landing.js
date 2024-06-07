import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import { changebgcolor } from "../Store/ColorTheme";
import IntlMassage from "../Utils/IntlMassage";

const Landing = () => {
  const dir = useSelector((state) => state?.selectLang?.dir);
  const byTheme = useSelector((state) => state?.changeColors?.theme);

  return (
    <div dir={dir}>
      <LandingWrapper byTheme={byTheme}>
        <div className="landingSidebar">
          <Sidebar />
        </div>
        <div className="headerOutletDiv">
          <div className="headerOutletInner">
            <Header />
            <div className="outletDiv">
              <Outlet />
              <div className="policyDiv">

              </div>
            </div>
          </div>
        </div>
      </LandingWrapper>
    </div>
  );
};

export default Landing;

const LandingWrapper = styled.div`
  @media only screen and (max-width: 982px) and (min-width: 550px) {
    background: ${({ theme }) => theme?.landingOutletBg};
  }
  display: flex;
  .landingSidebar {
    height: 100vh;
    min-height: 550px;
    width: 277px;

    @media only screen and (max-width: 982px) and (min-width: 550px) {
      background: transparent !important;
    }

    @media (max-width: 982px) {
      width: 13%;
      background: ${({ theme }) => theme?.landingOutletBg};
    }
    @media (max-width: 910px) {
      width: 13.2%;
    }
    @media (max-width: 860px) {
      width: 13.8%;
    }
    @media (max-width: 705px) {
      width: 14.6%;
    }
    @media (max-width: 603px) {
      width: 15%;
    }
    @media (max-width: 982px) {
      display: none;
    }
  }
  .headerOutletDiv {
    width: calc(100% - 277px);
    background: ${({ theme }) => theme?.landingOutletBg};
    position: relative;
    transition: all 0.4s ease-out 0s;

    @media only screen and (max-width: 982px) and (min-width: 550px) {
      background: transparent;
    }
    @media (max-width: 982px) {
      width: 100%;
    }
    @media (max-width: 910px) {
      width: 100%;
    }
    @media (max-width: 905px) {
      padding-bottom: 25px;
    }
    @media (max-width: 860px) {
      width: 100%;
    }
    @media (max-width: 705px) {
      width: 100%;
    }
    @media (max-width: 603px) {
      width: 100%;
    }
    @media (max-width: 550px) {
      width: 100%;
      height: 100%;
      min-height: 100vh;
    }

    .headerOutletInner {
      padding-top: 36px;
      padding-right: 15px;
      padding-left: 15px;

      @media (max-width: 550px) {
        padding: 10px 15px;
      }
    }
    .policyDiv {
      display: flex;
      gap: 10px;
      justify-content: center;
      position: absolute;
      bottom: 0;
      right: 15px;
      padding-bottom: 5px;
      @media (max-width: 550px) {
        margin-bottom: 20px;
      }
      @media (max-width: 396px) {
        left: 15px;
      }
      .policyDot {
        font-size: 20px;
        font-weight: 500;
      }
      p {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        cursor: pointer;
        color: ${({ byTheme }) =>
    byTheme === "day" ? "rgba(0, 0, 0, 0.6)" : "#fff"};
        display: flex;
        align-items: center;
        margin: 0px;
        font-family: ${({ theme }) => theme?.fontFamily};
      }
    }
    .outletDiv {
      @media (max-width: 550px) {
        margin-top: 60px;
      }
    }
  }
`;
