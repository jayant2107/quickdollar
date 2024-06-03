import styled from "styled-components";
import "../../Style/global.css";
import { Modal, Button } from "antd";
import { Field, ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import TextArea from "antd/es/input/TextArea";
import { sendUserMessage } from "../../Services/Collection";
import { toast } from "react-toastify";


const SendModal = ({
  handleSendCancel,
  showSendModal,
  sendModal,
  viewLoader,
  record,
}) => {
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
    try {
      let res = await sendUserMessage(values)
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
          maxHeight: "70vh", // Adjust the height as per your requirement
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
                      <InputField name="recipient" placeholder="Recipient" />
                      <RequiredWrapper>
                        <ErrorMessage name="recipient" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Your Subject</Label>
                      <InputField
                        name="yourSubject"
                        placeholder="Message Subject"
                      />
                      <RequiredWrapper>
                        <ErrorMessage name="yourSubject" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Your Message</Label>
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
                    <ResetBtn type="primary" onClick={handleSendCancel}>
                      Cancel
                    </ResetBtn>
                    <SubmitBtn type="primary" htmlType="submit">
                      Send
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
font-family: ${({ theme }) => theme?.fontFamily};`;

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

const InputWrapper = styled.div`
  padding-right: 1.25rem;
`;

const RequiredWrapper = styled.div`
  color: red;
  text-align: left;
  margin-bottom: 1rem;
`;

const SubmitBtn = styled(Button)`
  color: ${({ theme }) => theme?.primaryColor};
  background-color: black !important;
  border: none;
  width: 100%;
  height: 48px;
  border-radius: 10px;
`;
const ResetBtn = styled(Button)`
  color: black;
  background: white;
  width: 100%;
  height: 48px;
  border: 1px solid black;
  border-radius: 10px;
  &:hover {
    color: black !important;
    background: white !important;
    border: 1px solid black;
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
