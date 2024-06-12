import styled from "styled-components";
import '../../../Style/global.css';
import { Modal, Button } from "antd";
import { Field, ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import Loader from "../../../Components/Loader/Loader";
import { useState } from "react";

const DecryptUserInfo = ({
  triggerModal,
  setTriggerModal,
}) => {
  const [loader, setLoader] = useState(false);
  const initialValues = {
    decryptKey: ''
  };

  const validationSchema = yup.object().shape({
    decryptKey: yup.string().required("Encrypt Key is required")
  });

  const handleSubmit = (values, { resetForm }) => {
    setLoader(true)
    console.log("Form values:", values);

    resetForm();
    setLoader(false)
  };

  const handleCancel = () => {
    setTriggerModal(false);
  };

  return (
    <>
      <Modal
        visible={triggerModal}
        centered
        maskStyle={{
          backgroundColor: " rgb(0 0 0 / 70%)",
        }}
        onCancel={handleCancel}
        footer=""
        closable=""
        bodyStyle={{
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        <>
          <Header>Decrypt user info</Header>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <InputWrapper>
                <div>
                  <Label><Asterisk>*</Asterisk>Encrypted Key</Label>
                  <InputField name="decryptKey" placeholder="Encrypted Key" />
                  <RequiredWrapper>
                    <ErrorMessage name="decryptKey" />
                  </RequiredWrapper>
                </div>
              </InputWrapper>

              <Footer>
                <CancelBtn  onClick={handleCancel}>
                  Cancel
                </CancelBtn>
                <SubmitBtn  htmlType="submit" disabled={loader}>
                  Save{loader?<Loader/>:""}
                </SubmitBtn>
              </Footer>
            </Form>
          </Formik>
        </>
      </Modal>
    </>
  );
};
export default DecryptUserInfo;

const Header = styled.p`
  display: flex;
  font-weight: 600;
  font-size: 24px;
  margin: 0px 0px 20px 0px;
  font-family: Poppins;
  color: rgb(0, 0, 0);
`;

const Footer = styled.div`
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: start;
  font-weight: 700;
  line-height: 17px;
  color: #666666;
  gap: 10px;
  // padding-right: 1.25rem;
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
  // padding-right: 1.25rem;
`;

const RequiredWrapper = styled.div`
  color: red;
  text-align: left;
  margin-bottom: 1rem;
`;

const CancelBtn = styled(Button)`
  width: 208px;
  color: black;
  display: flex;
  border-radius: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 17px;
  margin: 5px 10px;
  cursor: pointer;
  background: transparent;
  height: 48px !important;
  align-items: center !important;
  justify-content: center !important;
  border: 1px solid black !important;
  
  &:hover {
    background: transparent;
    color: black !important;
    border: 1px solid black  !important;
  }

  // Remove active effect
  &:active {
    background: transparent;
    color: black !important;
    border: 1px solid black !important;
  }

  // Remove focus effect
  &:focus {
    background: transparent;
    color: black !important;
    border: 1px solid black !important;
  }
`;


const SubmitBtn = styled(Button)`
  width: 208px;
  color: white;
  border-radius: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 17px;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
  margin: 5px 10px;
  cursor: pointer;
  border: none;
  height: 48px !important;
   background-color: black !important;

  // Remove hover effect
  &:hover {
    background-color: black !important;
    color: white !important;
  }

  // Remove active effect
  &:active {
   background-color: black !important;
    color: white !important;
  }

  // Remove focus effect
  &:focus {
    background-color: black !important;
    color: white !important;
  }
`;

const Asterisk = styled.span`
color: red
`