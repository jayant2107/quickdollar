import styled from "styled-components";
import '../../../Style/global.css';
import { Modal, Button } from "antd";
import { Field, ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";

const DecryptUserInfo = ({
  triggerModal,
  setTriggerModal,
}) => {
  const initialValues = {
    decryptKey: ''
  };

  const validationSchema = yup.object().shape({
    decryptKey: yup.string().required("Encrypt Key is required")
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form values:", values);
    resetForm();
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
                  <Label>Encrypted Key</Label>
                  <InputField name="decryptKey" placeholder="Encrypted Key" />
                  <RequiredWrapper>
                    <ErrorMessage name="decryptKey" />
                  </RequiredWrapper>
                </div>
              </InputWrapper>

              <Footer>
                <ResetBtn type="primary" onClick={handleCancel}>
                  Cancel
                </ResetBtn>
                <SubmitBtn type="primary" htmlType="submit">
                  Save
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

const SubmitBtn = styled(Button)`

color: ${({ theme }) => theme?.primaryColor};
background-color: black !important;
border: none;
width: 100%;
height: 48px;
font-family: Poppins;
`;
const ResetBtn = styled(Button)`
color: black;
background: white;
width: 100%;
height: 48px;
border: 1px solid black;
font-family: Poppins;
&:hover {
  color: black !important;
  background: white !important;
  border: 1px solid black;
}
`;