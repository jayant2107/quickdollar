import styled from "styled-components";
import "../../Style/global.css";
import { Modal, Button } from "antd";
import { Field, ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import TextArea from "antd/es/input/TextArea";
import { sendUserMessage } from "../../Services/Collection";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useState } from "react";

const SendModal = ({
  handleSendCancel,
  showSendModal,
  sendModal,
  viewLoader,
  record,
}) => {
  const [loader, setLoader] = useState(false) 
  const initialValues = {
    recipient: record?.email,
    yourSubject: "",
    yourMessage: "",
  };

  const validationSchema = yup.object().shape({
    recipient: yup.string().required("Recipient is required"),
    yourSubject: yup.string().required("Subject is required"),
    yourMessage: yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoader(true)
    try {
      let res = await sendUserMessage(values);
      setLoader(false)
      console.log(res, "res");
      if (res?.status === 200) {
        toast.success("Message send Successfully");
        handleSendCancel();
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
  };

  return (
    <>
      <Modal
        centered
        maskStyle={{
          backgroundColor: " rgb(0 0 0 / 70%)",
        }}
        open={sendModal}
        onOk={handleSendCancel}
        onCancel={handleSendCancel}
        footer=""
        closable=""
        bodyStyle={{
          maxHeight: "80vh", // Adjust the height as per your requirement
          overflowY: "auto",
        }}
      >
        <>
          <Header>Are You Sure</Header>
          <AnnouncementWrapper>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form>
                  <InputWrapper>
                    <div>
                      <Label>Recipient</Label>
                      <DisabledInputField name="recipient" placeholder="Recipient" readOnly />
                      <RequiredWrapper>
                        <ErrorMessage name="recipient" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label><Asterisk>*</Asterisk>Your Subject</Label>
                      <InputField
                        name="yourSubject"
                        placeholder="Message Subject"
                      />
                      <RequiredWrapper>
                        <ErrorMessage name="yourSubject" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label><Asterisk>*</Asterisk>Your Message</Label>
                      <TextAreaField
                        name="yourMessage"
                        placeholder="Your Message"
                        rows={3}
                        onChange={(e) =>
                          setFieldValue("yourMessage", e.target.value)
                        }
                      />
                      <RequiredWrapper>
                        <ErrorMessage name="yourMessage" />
                      </RequiredWrapper>
                    </div>
                  </InputWrapper>

                  <Footer>
                    <CancelBtn  onClick={handleSendCancel}>
                      Cancel
                    </CancelBtn>
                    <SubmitBtn  htmlType="submit" disabled={loader}>
                      Send {loader?<Loader/>:""}
                    </SubmitBtn>
                  </Footer>
                </Form>
              )}
            </Formik>
          </AnnouncementWrapper>
        </>
      </Modal>
    </>
  );
};
export default SendModal;

const AnnouncementWrapper = styled.div`
  font-family: ${({ theme }) => theme?.fontFamily};
`;

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
  gap: 20px;
  padding-right: 1.25rem;
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
`;

const InputField = styled(Field)`
  width: -webkit-fill-available;
  padding: 15px 0px 15px 15px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
  color: #666;
  border-radius: 10px;
  outline: none;
  margin-bottom: 3px;
`;

const DisabledInputField = styled(Field)`
  width: -webkit-fill-available;
  padding: 15px 0px 15px 15px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
  color: #666;
  border-radius: 10px;
  outline: none;
  margin-bottom: 3px;
  background: #e5e5e5;
  color: #666;
`;

const InputWrapper = styled.div`
  padding-right: 1.25rem;
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
const TextAreaField = styled(TextArea)`
  width: 100%;
  padding: 15px 0px 15px 15px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
  color: #666;
  border-radius: 10px;
  margin-bottom: 3px;
  &.ant-input:focus,
  &.ant-input-focused,
  &.ant-input:hover {
    outline: none;
    box-shadow: none;
    resize: none;
    border-color: #e5e5e5;
  }
  ::placeholder {
    color: black;
  }
`;

const Asterisk = styled.span`
color: red
`