import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Applogo, BackgroundImg } from "../Utils/Images";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import InputField from "../validations/InputField";
import { EyeIcon, HideEyeIcon } from "../Utils/SvgIcons";
import { authlogin } from "../Store/Authentication";
import { adminLogin } from "../Services/Collection";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const initialValues = {
    email: "",
    password: "",
  };
  const FormikFieldValues = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter email",
      component: InputField,
    },
    {
      label: "Password",
      name: "password",
      type: passwordType,
      placeholder: "Enter password",
      component: InputField,
      EyeComponent: (
        <PasswordEyeWrapper
          onClick={() =>
            setPasswordType(passwordType === "password" ? "text" : "password")
          }
        >
          {passwordType == "password" ? (
            <HideEyeIcon />
          ) : (
            <EyeIcon style={{ margin: "0px" }} />
          )}
        </PasswordEyeWrapper>
      ),
      ForgotPassword: (
        <div className="forgot-password">
          <p style={{ userSelect: "none" }} onClick={() => navigate("forgot")}>
            <u>Forgot Password?</u>
          </p>
        </div>
      ),
    },
  ];

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  document.title="Login - Quickdollarapp"

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let requestPayload = {
        emailAddress: values?.email,
        Password: values?.password,
      };
      let res = await adminLogin(requestPayload);
      if (res?.status === 200) {
        let filterData = {
          ...res?.data,
          token: res?.token,
        };
     
        toast.success("Login Successfully");
        navigate("/quickdollar/dashboard");
        dispatch(authlogin(filterData));
        setLoading(false);
      } else {
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
        toast.error(message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "error");
      toast.error(error?.message || "Something went wrong");
    }
  };
  return (
    <LoginWrapper>
      <div className="flex-div">
        <div className="gradient-bg">
          <img src={BackgroundImg} alt="" />
        </div>
        <div className="inner-wrap">
          <img src={Applogo} alt="" />
          <div className="inner-part">
            <div className="main-box">
              <div className="logo-div">
                {/* <img src={MainLogo} alt="" /> */}

                <h4>Sign in your account</h4>
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                render={() => (
                  <Form>
                    <div className="content">
                      {FormikFieldValues?.map((field) => (
                        <div style={{ position: "relative" }}>
                          <label>{field?.label}</label>
                          <Field
                            name={field?.name}
                            type={field?.type}
                            placeholder={field?.placeholder}
                            component={field?.component}
                          />
                          {field?.EyeComponent}
                          {field?.ForgotPassword && field?.ForgotPassword}
                        </div>
                      ))}

                      {loading ? (
                        <button style={{ fontFamily: "Poppins" }}>
                          Loading...
                        </button>
                      ) : (
                        <button type="submit" style={{ fontFamily: "Poppins" }}>
                          Sign In
                        </button>
                      )}
                    </div>
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default Login;

export const LoginWrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  width: 100%;
  height: 100vh;
  background: #ffffff;
  overflow: hidden;
  ${
    "" /* display: flex;
  justify-content: center;
  align-items: center; */
  }

  .forgot-password {
    position: absolute;
    bottom: -44px;
    cursor: pointer;
    right: 5px;
    p {
      color: red;
      font-family: "Poppins";
      font-size: 14px;
      font-weight: 400 !important;
      text-align: left;

      &:hover {
        color: blue;
      }
    }
  }

  .flex-div {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .gradient-bg {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .inner-wrap {
      position: absolute;
      width: 551.98px;

      img {
        max-width: 300px;
      }
    }

    .inner-part {
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.25);

      .main-box {
        padding: 40px;
        .logo-div {
          text-align: center;
          img {
            width: 150px;
            margin-bottom: 1rem;
          }

          h4 {
            margin-bottom: 1.5rem;
            color: #000;
            font-size: 25px;
            font-family: "Poppins";
          }
        }
        .content {
          div {
            margin-bottom: 1rem;
            label {
              color: #000;
              margin-bottom: 0.25rem;
              display: block;
              font-family: "Poppins";
              font-size: 16px;
              font-weight: 400 !important;
              letter-spacing: 0em;
              text-align: left;
            }
            .password-div {
              display: flex;
              position: relative;
              input {
                background-color: #ffffff;
                color: #000;
                position: relative;
                padding: 0rem 0.75rem;
                width: 100%;
                ${"" /* height: 41px; */}
                height: 56px;
                border-radius: 12px;

                font-family: "Poppins" !important;
                font-size: 14px;

                :focus {
                  outline: none;
                }
                ::placeholder {
                  color: rgba(0, 0, 0, 0.39) !important;
                }
              }
              svg {
                position: absolute;
                right: 12px;
                top: 20px;
                cursor: pointer;
              }
              img {
                position: absolute;
                right: 12px;
                top: 15px;
                cursor: pointer;
              }
            }
            input {
              background-color: #ffffff;
              border: 1px solid rgb(193 189 189);
              color: #000;
              position: relative;
              padding: 0rem 0.75rem;
              width: 100%;
              ${"" /* height: 41px; */}
              height: 56px;
              border-radius: 12px;
              font-family: "Poppins" !important;
              font-size: 14px;

              :focus {
                outline: none;
              }
              ::placeholder {
                color: rgba(0, 0, 0, 0.39) !important;
              }
            }
          }
          button {
            font-weight: 500;
            height: 50px;
            cursor: pointer;
            border-radius: 0.75rem;
            width: 100%;
            background-color: #63c76a;
            border: 1px solid #63c76a;
            font-size: 14px;
            color: #fff;
            text-align: center;
            margin-top: 25px;

            ${
              "" /* :hover {
              background-color: #282348;
            } */
            }
          }
          span {
            font-weight: 700;
            height: 50px;
            cursor: pointer;
            border-radius: 0.75rem;
            width: 100%;
            background-color: #363062;
            font-size: 14px;
            border: 1px solid #363062;
            color: #fff;
            text-align: center;
          }
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    .inner-wrap {
      width: 95% !important;
    }
  }
`;

export const PasswordEyeWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 47px;
  cursor: pointer;
  height: 20px;

  svg {
    top: 0px;
  }
`;
