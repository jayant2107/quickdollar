import React, { useState } from "react";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import { Applogo, BackgroundImg } from "../Utils/Images";
import { LoginWrapper } from "./Login";
import * as yup from "yup";
import InputField from "../validations/InputField";
import { useNavigate } from "react-router-dom";

export default function Forgot() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };
  const FormikFieldValues = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter email",
      component: InputField,
    },
  ];

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Email is required"),
  });

  const handleSubmit = async (values) => {
    console.log(values, "values");
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
                <h4>Forgot Password</h4>
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
                          {field?.ForgotPassword && field?.ForgotPassword}
                        </div>
                      ))}

                      <BtnWrap>
                        <span
                          className="back-btn"
                          style={{ fontFamily: "Poppins" }}
                          onClick={() => navigate(-1)}
                        >
                          Back
                        </span>
                        {loading ? (
                          <button style={{ fontFamily: "Poppins" }}>
                            Loading...
                          </button>
                        ) : (
                          <button
                            type="submit"
                            style={{ fontFamily: "Poppins" }}
                          >
                            Send link to the email
                          </button>
                        )}
                      </BtnWrap>
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
}

const BtnWrap = styled.div`
  display: flex;
  gap: 10px;
  margin: 0;

  .back-btn {
    background: transparent !important;
    border: 1px solid #000 !important;
    color: #000 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
  }
`;
