import React, { useState } from "react";
import styled from "styled-components";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Addams, Vector } from "../../../Utils/Images";
import { MdModeEditOutline } from "react-icons/md";
import * as yup from "yup";
import Loader from "../../Loader/Loader";
import SkeletonLoader from "../../Skeleton/SkeletonLoader";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [picLoader, setPicLoader] = useState(false);
  const byTheme = useSelector((state) => state?.changeColors?.theme);

  const validateSchema = yup.object().shape({
    fname: yup.string().required("First name is Required"),
    lname: yup.string().required("Last name is Required"),
    email: yup.string().required("Email is required"),
    number: yup.number().required("Number is required"),
  });
  const handleSubmit = (e) => {
    console.log(e);
  };
  const initialValues = {
    fname:"",
    lname:"",
    email:"",
    number:""
  }
  return (
    // <EditProfileWrapper>
    //   <p className="editHeading">
    //     <BiChevronLeft className="editBackIcon" onClick={() => navigate(-1)} />
    //     Edit Profile
    //   </p>
    //   <div className="editInputDiv">
    //     <div className="div1">
    //       <input type="file" name="pic" onChange={(e) => handleUpdatePic(e)} />
    //     </div>
    //     <div className="iv"></>
    //     <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    //       <Form>
    //         <label>Name</label>
    //         <Field type="text" name="fname"></Field>
    //         <label>Last Name</label>
    //         <Field type="text" name="lname"></Field>
    //         <label>Email</label>
    //         <Field type="text" name="email"></Field>
    //         <label>Number</label>
    //         <Field type="number" name="number"></Field>
    //         <button type="submit">Update</button>
    //       </Form>
    //     </Formik>
    //   </div>
    // </EditProfileWrapper>
    <EditProfileWrapper byTheme={byTheme}>
      <p className="editHeading">
        <BiChevronLeft className="editBackIcon" onClick={() => navigate(-1)} />
        Edit Profile
      </p>
      {!loader ? (
        <div className="profileInfo">
          {!picLoader ? (
            <div className="profilePicDiv">
              <img className="profilePicImg" src={Addams} alt="" />
              <label for="img" className="labelNone">
                <MdModeEditOutline className="editProfileIcon" />
              </label>
              <input
                className="upload-select"
                type="file"
                id="img"
                name="image"
              />
            </div>
          ) : (
            <SkeletonLoader />
          )}

          <div className="aboutProfile">
            <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={handleSubmit}>
              <Form className="editProfilForm">
                <div className="profileInner">
                  <div className="div1">
                    <label>Name </label>
                    <Field type="text" name="fname"></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="fname" />
                    </div>
                  </div>
                  <div className="div1">
                    <label>Last Name </label>
                    <Field type="text" name="lname"></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="lname" />
                    </div>
                  </div>
                </div>
                <div className="profileInner">
                  <div className="div1">
                    <label>Email </label>
                    <Field type="text" name="email"></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div className="div1">
                    <label>Phone </label>
                    <Field type="number" name="number"></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="number" />
                    </div>
                  </div>
                </div>
                <div className="btnDiv">
                  <button className="updateBtn">Update</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </EditProfileWrapper>
  );
};

export default EditProfile;

const EditProfileWrapper = styled.div`
  @media (max-width: 550px) {
    padding-bottom: 20px;
  }
  @media (max-width: 393px) {
    padding-bottom: 35px;
  }
  .editHeading {
    font-size: 24px;
    margin: 0px;
    font-weight: 600;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 20px;
    color: ${({ byTheme }) => (byTheme == "day" ? "#000" : "#fff")};
    @media (max-width: 550px) {
      margin-top: 15px;
      margin-bottom: 10px;
    }

    .editBackIcon {
      font-size: 27px;
      color: ${({ byTheme }) => (byTheme == "day" ? "#000" : "#fff")};
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
    justify-content: space-aroundl;
    @media (max-width: 905px) {
      display: block;
    }

    .profilePicDiv {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .labelNone {
        display: none;
        position: absolute;
      }
      .profilePicImg {
        border-radius: 50%;
        width: 180px;
        height: 180px;
        transition: all ease-in 0.3s;
        cursor: pointer;
      }
      &:hover {
        .profilePicImg {
          opacity: 0.6;
        }
        & .labelNone {
          display: block;
        }
      }

      .editProfileIcon {
        font-size: 25px;
        ${"" /* right: 0; */}
        cursor: pointer;
        ${"" /* bottom: 45px; */}
      }
      .upload-select {
        display: none;
      }
    }

    .aboutProfile {
      display: flex;
      align-items: center;
      @media (max-width: 905px) {
        justify-content: center;
        margin-top: 20px;
      }
      @media (max-width: 550px) {
        justify-content: center;
        margin-top: 25px;
      }
      .editProfilForm {
        @media (max-width: 905px) {
          width: 100%;
        }
        .btnDiv {
          display: flex;
          align-items: center;
          justify-content: end;

          @media (max-width: 905px) {
            display: block;
          }
          .updateBtn {
            background: ${({ theme }) => theme?.secondaryColor};
            color: ${({ theme }) => theme?.primaryColor};
            border: none;
            padding: 10px 15px;
            border-radius: 6px;
            font-weight: 600;
            margin-top: 15px;
            cursor: pointer;
            @media (max-width: 905px) {
              width: 100%;
            }
          }
        }

        .div1 {
          text-align: left;

          @media (max-width: 905px) {
            width: 50%;
          }
          @media (max-width: 650px) {
            width: 100%;
          }
          input {
            font-size: 14px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid black;
            margin-bottom: 6px;
            color: gray;
            border: 2px dashed rgb(183 183 183 / 30%);
            background: ${({ byTheme }) =>
              byTheme == "day" ? "#fff" : "#1d1d1d"};
            @media (max-width: 905px) {
              width: 92%;
            }
            @media (max-width: 452px) {
              width: 92%;
            }
          }
          label {
            font-size: 14px;
            display: block;
            color: ${({ byTheme }) => (byTheme == "day" ? "#000" : "#fff")};
          }
        }
        .profileInner {
          display: flex;
          gap: 40px;

          @media (max-width: 650px) {
            display: block;
          }
          @media (max-width: 452px) {
            display: block;
          }
        }
      }
    }
  }
`;
