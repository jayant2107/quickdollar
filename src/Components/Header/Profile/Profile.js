import { Tooltip } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Addams, Vector } from "../../../Utils/Images";

const Profile = () => {
  const navigate = useNavigate();
  const byTheme = useSelector((state) => state?.changeColors?.theme);
  return (
    <ProfileWrapper byTheme={byTheme}>
      <div className="profileHeader">
        <h1>My Profile</h1>
        <button onClick={() => navigate("/landing/profile/editprofile")}>
          EDIT PROFILE
        </button>
      </div>
      <div className="profileInfo">
        <div className="profilePicDiv">
          <img src={Addams} alt="" />
        </div>
        <div className="aboutProfile">
          <div className="aboutProfileInner">
            <div className="div1">
              <label>Name :</label>
              <h1>Wednesday</h1>
            </div>
            <div className="div1">
              <label>Last Name :</label>
              <h1>Addams</h1>
            </div>
            <div className="div1">
              <label>Phone :</label>
              <h1>79721785409</h1>
            </div>
            <div className="div1">
              <label>Email :</label>
              <h1
                className="emailTipDiv"
                style={{
                  cursor: "context-menu",
                  maxWidth: "260px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <Tooltip
                  placement="topLeft"
                  title="wednesdayaddams001@gmail.com"
                >
                  wednesdayaddams001@gmail.com
                </Tooltip>
              </h1>
            </div>
            {/* <div className="div1">
            <label>Role</label>
            <h1>Admin</h1>
          </div>
          <div className="div1">
            <label>Country</label>
            <h1>India</h1>
          </div> */}
          </div>
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  .profileHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;
    margin-top: 30px;

    h1 {
      font-size: 24px;
      margin: 0px;
      font-family: ${({ theme }) => theme?.fontFamily};
      color: ${({ byTheme }) => (byTheme == "day" ? "#000" : "#fff")};
    }
    button {
      font-family: ${({ theme }) => theme?.fontFamily};
      font-size: 14px;
      border-radius: 10px;
      background: ${({ theme }) => theme?.secondaryColor};
      color: ${({ theme }) => theme?.primaryColor};
      border: none;
      font-weight: 600;
      cursor: pointer;
      padding: 10px 15px;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }
  }
  .profileInfo {
    background: ${({ byTheme }) => (byTheme == "day" ? "#fff" : "#212121")};
    border-radius: 10px;
    padding: 25px 30px;
    line-height: 1.6;
    box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
    display: flex;
    gap: 100px;

    @media (max-width: 850px) {
      display: block;
    }
    @media (max-width: 550px) {
      display: block;
    }

    .profilePicDiv {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        border-radius: 50%;
        width: 180px;
        height: 180px;

        @media (max-width: 550px) {
          width: 160px;
          height: 160px;
        }
        @media (max-width: 410px) {
          width: 140px;
          height: 140px;
        }
      }
    }

    .aboutProfile {
      display: flex;
      align-items: center;

      @media (max-width: 550px) {
        margin-top: 20px;
      }

      .aboutProfileInner {
        line-height: 2;
        .div1 {
          text-align: left;
          display: flex;
          gap: 5px;
          h1 {
            font-size: 15px;
            margin: 0px;
            text-align: left;
            font-weight: 400;
            font-family: ${({ theme }) => theme?.fontFamily};
            color: ${({ byTheme }) => (byTheme == "day" ? "#000" : "#fff")};
          }
          label {
            font-size: 14px;
            color: gray;
            white-space: nowrap;
          }

          ${
            "" /* .emailTipDiv {
            @media (max-width: 360px) {
              cursor: context-menu;
              maxwidth: 150px !important;
              textoverflow: ellipsis;
              overflow: hidden;
              whitespace: nowrap;
            }
          } */
          }
        }
      }
    }
  }
`;
