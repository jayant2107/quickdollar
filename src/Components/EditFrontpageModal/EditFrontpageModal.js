import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "../../Style/global.css";
import { Modal, Button } from "antd";
import { Field, ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import { editFrontpageOffer } from "../../Services/Collection";
import { toast } from "react-toastify";

const EditFrontpageModal = ({
  handleEditCancel,
  editModal,
  record,
  fetchData,
}) => {
  console.log(record)
  const [offerImgPreview, setOfferImgPreview] = useState(record?.frontpageofferImage);
  const [buttonImgPreview, setButtonImgPreview] = useState(record?.frontpageofferButton);
  const [flag, setFlag] = useState(false)
  const offerImgInputRef = useRef(null);
  const buttonImgInputRef = useRef(null);

  const initialValues = {
    title: record?.frontpageofferTitle || "",
    link: record?.frontpageofferLink || "",
    offerImg: record?.frontpageofferImage || "",
    buttonImg: ""
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    link: yup.string().required('Link is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('frontpageofferTitle', values.title);
    formData.append('id', record.idfrontpageoffer);
    formData.append('frontpageofferLink', values.link);
    if (flag) {
      formData.append('frontpageofferImage', values.offerImg);
      formData.append('frontpageofferButton', values.buttonImg);
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      const res = await editFrontpageOffer(formData);
      if (res?.status === 200) {
        await fetchData()
        toast.success("Edit Frontpage Offer successfully");
        resetForm();
        setOfferImgPreview(null);
        setButtonImgPreview(null);
        handleEditCancel();
        setOfferImgPreview(null);
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

  const handleFileChange = (e, setFieldValue, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue(e.target.name, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFlag(true)
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (editModal) {
      setOfferImgPreview(record?.frontpageofferImage);
      setButtonImgPreview(record?.frontpageofferButton);
    }
  }, [editModal, record]);

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
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form>
                  <InputWrapper>
                    <div>
                      <Label>Front Pageoffer Title<Asterisk>*</Asterisk></Label>
                      <InputField name="title" placeholder="title" />
                      <RequiredWrapper>
                        <ErrorMessage name="title" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Front Pageoffer Link<Asterisk>*</Asterisk></Label>
                      <InputField name="link" placeholder="link" />
                      <RequiredWrapper>
                        <ErrorMessage name="link" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Front page Offer Image</Label>
                      <FieldContainer>
                        <ChooseContainer>
                          <UploadButton onClick={() => offerImgInputRef.current.click()}>Upload</UploadButton>
                          <input
                            ref={offerImgInputRef}
                            name="offerImg"
                            type="file"
                            onChange={(e) =>
                              handleFileChange(e, setFieldValue, setOfferImgPreview)
                            }
                            style={{ display: "none" }}
                          />
                          <UploadInstruction>Max size 2MB and resolution is 250x250 px</UploadInstruction>
                          {offerImgPreview && <Image src={offerImgPreview} alt="Offer Preview" />}
                        </ChooseContainer>

                      </FieldContainer>
                    </div>

                    <div>
                      <Label>Front page Button Image</Label>
                      <FieldContainer>
                        <ChooseContainer>
                          <UploadButton onClick={() => buttonImgInputRef.current.click()}>Upload</UploadButton>
                          <input
                            ref={buttonImgInputRef}
                            name="buttonImg"
                            type="file"
                            onChange={(e) =>
                              handleFileChange(e, setFieldValue, setButtonImgPreview)
                            }
                            style={{ display: "none" }}
                          />
                          <UploadInstruction>Max size 2MB and resolution is 250x250 px</UploadInstruction>
                          {buttonImgPreview && <Image src={buttonImgPreview} alt="Button Preview" />}
                        </ChooseContainer>

                      </FieldContainer>
                    </div>
                  </InputWrapper>

                  <Footer>
                    <ResetBtn type="primary" onClick={handleEditCancel}>
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
`;

const ChooseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const UploadInstruction = styled.p`
  font-weight: 400;
  line-height: 17px;
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 0.5rem;
  margin-top: 0px;
  font-size: 14px;
  text-align: start;
`;

const UploadButton = styled(Button)`
color: black;
background: white;
width: 40%;
height: 35px;
border: 1px solid black;
margin-bottom: 1rem;
`
const Image = styled.img`
width: 120px;
height: 120px;
object-fit: contain;
`
const Asterisk = styled.span`
color: red
`