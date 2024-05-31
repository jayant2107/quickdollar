import React, { useState } from "react";
import { LoginWrapper, PasswordEyeWrapper } from "./Login";
import { Applogo, BackgroundImg } from "../Utils/Images";
import { Field, Form, Formik } from "formik";
import InputField from "../validations/InputField";
import { EyeIcon, HideEyeIcon } from "../Utils/SvgIcons";
import * as yup from "yup";

const SetNewPassword = () => {
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmpasswordType, setConfirmPasswordType] = useState("password");

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };
  const FormikFieldValues = [
    {
      label: "New Password",
      name: "newPassword",
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
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: confirmpasswordType,
      placeholder: "Enter password",
      component: InputField,
      EyeComponent: (
        <PasswordEyeWrapper
          onClick={() =>
            setConfirmPasswordType(
              confirmpasswordType === "password" ? "text" : "password"
            )
          }
        >
          {confirmpasswordType == "password" ? (
            <HideEyeIcon />
          ) : (
            <EyeIcon style={{ margin: "0px" }} />
          )}
        </PasswordEyeWrapper>
      ),
    },
  ];

  const validationSchema = yup.object().shape({
    newPassword: yup.string().required("New Password is required").min(3),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  });

  const handleSubmit = async (values) => {
    console.log(values, "valuesvalues");
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

                <h4>Setup new password</h4>
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

export default SetNewPassword;
