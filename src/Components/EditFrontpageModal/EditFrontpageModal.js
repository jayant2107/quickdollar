import styled from "styled-components";
import "../../Style/global.css";
import { Modal, Button } from "antd";
import { Field, ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";

const EditFrontpageModal = ({

  handleEditCancel,
  showEditModal,
  editModal,
  record,
  viewLoader,
  fetchData,
}) => {
  console.log(record,"recorddddd")
  console.log(record?.frontpageofferTitle,"record.frontpageofferTitle")
  console.log(record?.frontpageofferLink,"record.frontpageofferLink")
  const initialValues = {
    title: record?.frontpageofferTitle||"",
    link: record?.frontpageofferLink|"",
    offerImg: '',
    buttonImg: ''
  };

  const validationSchema = yup.object().shape({

    title: yup.string().required("Title is required"),
    link: yup.string().required('Link is required'),
    offerImg: yup.string().required('Offer image is required'),
    buttonImg: yup.string().required('Button image is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form values:", values);
    resetForm();
  };

  return (
    <>
      <Modal
        centered
        maskStyle={{
          backgroundColor: " rgb(0 0 0 / 70%)",
        }}
        open={editModal}
        onOk={handleEditCancel}
        onCancel={handleEditCancel}
        footer=""
        closable=""
        bodyStyle={{
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        <>
          <Header>Edit Front page Offer</Header>
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
                      <Label>Front Pageoffer Title</Label>
                      <InputField name="title" placeholder="title" />
                      <RequiredWrapper>
                        <ErrorMessage name="title" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Front Pageoffer Link</Label>
                      <InputField
                        name="link"
                        placeholder="link"
                      />
                      <RequiredWrapper>
                        <ErrorMessage name="link" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Front page Offer Image</Label>
                      <FieldContainer>
                        <ChooseContainer>
                          <ChooseFile
                            name="offerImg"
                            type="file"
                          />
                          <UploadInstruction>Max size 2MB and resolution is 250x250 px</UploadInstruction>
                        </ChooseContainer>
                        <RequiredWrapper>
                          <ErrorMessage name="offerImg" />
                        </RequiredWrapper>
                      </FieldContainer>
                    </div>

                    <div>
                      <Label>Front page Button Image</Label>
                      <FieldContainer>
                        <ChooseContainer>
                          <ChooseFile
                            name="buttonImg"
                            type="file"
                          />
                          <UploadInstruction>Max size 2MB and resolution is 250x250 px</UploadInstruction>
                        </ChooseContainer>
                        <RequiredWrapper>
                          <ErrorMessage name="buttonImg" />
                        </RequiredWrapper>
                      </FieldContainer>
                    </div>

                  </InputWrapper>

                  <Footer>
                    <ResetBtn type="primary" onClick={handleEditCancel} >
                      Cancel
                    </ResetBtn>
                    <SubmitBtn type="primary" htmlType="submit">
                      Save
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
export default EditFrontpageModal;

const AnnouncementWrapper = styled.div``;

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
  border-radius: 5px;
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
`;
const ResetBtn = styled(Button)`
color: black;
background: white;
width: 100%;
height: 48px;
border: 1px solid black;
&:hover {
  color: black !important;
  background: white !important;
  border: 1px solid black;
}
`;

const FieldContainer = styled.div`
width: 100%;
`
const ChooseContainer = styled.div`
display:flex;
flex-direction:column;
align-items:start;
width: 100%;
`
const ChooseFile = styled(Field)`
width: -webkit-fill-available;
padding: 0px 0px 5px 0px;
font-size: 14px;
color: #666;
border-radius: 5px;
outline: none;
`;

const UploadInstruction = styled.p`
font-weight: 400;
line-height: 17px;
color: #666666;
display:flex;
align-items:center;
justify-content:start;
margin-bottom: 0.5rem;
margin-top: 0px;
font-size: 14px;
text-align: start;
`