import React from "react";
import { Button } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styled from "styled-components";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { changeAdminPass } from "../../Services/Collection";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const passwordRules = yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .matches(/^(?=.*\d)/, "Password must contain at least one number")
    .matches(
      /^(?=.*[@$!%*?&])/,
      "Password must contain at least one special character"
    );

  const validationSchema = yup.object().shape({
    oldPassword: yup.string().required("Old Password is required"),
    newPassword: passwordRules,
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Form values:", values);
    const payload = {
      oldpassword: values.oldPassword,
      password: values.newPassword,
    };
    console.log(payload);
    try {
      let res = await changeAdminPass(payload);
      if (res?.status === 200) {
        toast.success("Change Password successfully");
        resetForm();
      } else {
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
        toast.error(message);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.message || "Something went wrong");
    }

    resetForm();
  };

  return (
    <div>
      <Header>Change Password</Header>
      <AnnouncementWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputWrapper>
              <div>
                <Label>Old Password</Label>
                <InputField name="oldPassword" placeholder="Old Password" />
                <RequiredWrapper>
                  <ErrorMessage name="oldPassword" />
                </RequiredWrapper>
              </div>

              <div>
                <Label>New Password</Label>
                <InputField name="newPassword" placeholder="New Password" />
                <RequiredWrapper>
                  <ErrorMessage name="newPassword" />
                </RequiredWrapper>
              </div>

              <div>
                <Label>Confirm Password</Label>
                <InputField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <RequiredWrapper>
                  <ErrorMessage name="confirmPassword" />
                </RequiredWrapper>
              </div>
            </InputWrapper>

            <Footer>
              <SubmitBtn type="primary" htmlType="submit">
                Submit
              </SubmitBtn>
              <ResetButton
                type="button"
                onClick={() => navigate("/quickdollar/dashboard")}
              >
                Cancel
              </ResetButton>
            </Footer>
          </Form>
        </Formik>
      </AnnouncementWrapper>
    </div>
  );
};

export default ChangePassword;

const AnnouncementWrapper = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Header = styled.p`
  display: flex;
  font-weight: 600;
  font-size: 24px;
  margin: 20px 0px;
  font-family: Poppins;
  color: rgb(0, 0, 0);
`;

const Footer = styled.p`
  background: #f7f7f7;
  margin: 0px;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: start;
  font-weight: 700;
  line-height: 17px;
  color: #666666;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  gap: 10px;
`;

const Label = styled.p`
  font-weight: 400;
  line-height: 17px;
  color: #282828;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 0.5rem;
  margin-top: 0px;
  font-size: 17px;
  font-family: Poppins;
`;
const InputField = styled(Field)`
  width: -webkit-fill-available;
  padding: 15px 0px 15px 15px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
  color: #666;
  border-radius: 5px;
  outline: none;
  margin-bottom: 3px;
`;

const InputWrapper = styled.div`
  padding: 1.25rem;
`;

const RequiredWrapper = styled.div`
  color: red;
  text-align: left;
  margin-bottom: 1rem;
`;

const SubmitBtn = styled(Button)`
  color: ${({ theme }) => theme?.primaryColor};
  background: ${({ theme }) => theme?.secondaryColor};
  border: none;
`;

const ResetButton = styled(Button)`
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
`;
