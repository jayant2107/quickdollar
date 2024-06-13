import styled from "styled-components";
import "../../Style/global.css";
import { Modal, Button } from "antd";
import { Field, ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import { editRequestedGiftCard } from "../../Services/Collection";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useState } from "react";

const EditRequestGiftCard = ({
  handleEditCancel,
  showEditModal,
  editModal,
  viewLoader,
  record,
  fetchData,
}) => {
  // console.log(record)
  const [loader, setLoader] = useState(false);

  const initialValues = {
    giftCardName: record?.Giftcard?.giftCardName || '',
    giftCardPoints: record?.Giftcard?.giftCardPoints||"",
    isActive: record?.Giftcard?.isActive ? "true" : "false",
  };
 

  const validationSchema = yup.object().shape({
    giftCardName: yup.string().required('Gift Card Name is required'),
    giftCardPoints
: yup.string().required('Gift card priceis required').test(
      'is-number',
      'Enter number only',
      value => !isNaN(value) && Number.isInteger(parseFloat(value))
    ),
    isActive: yup.string().required("Admin status is required"),
  });

  const handleSubmit =async (values, { resetForm }) => {
    // console.log('Form values:', values);
   

    const {  isActive , giftCardName,giftCardPoints} = values;
    const payload = {
      id: record.idRequestedGiftCard,
      giftCardName:giftCardName,
      giftCardPoints:giftCardPoints,
      isActive:isActive,


    }
    // console.log("Form values:", payload);
    setLoader(true)
    let res = await editRequestedGiftCard(payload)
    setLoader(false)
    if (res?.status === 200) {
      // console.log(res.status)
       fetchData()
      // console.log(fetch, "fetchhhh")
      toast.success("Edit Successfully");
      resetForm();
      handleEditCancel();
    }
    else {
      let message =
        res?.response?.data?.message ||
        res?.message ||
        res?.error ||
        "Something went wrong";
      toast.error(message);
    }

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
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <>
          <Header>Edit Requested Gift Card</Header>
          <div>
            <AnnouncementWrapper>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ resetForm, values }) => (
                  <Form>

                    <InputWrapper>

                      <FieldWrapper>
                        <Label ><Asterisk>*</Asterisk>Gift Card Name</Label>
                        <FieldContainer>
                          <InputField name="giftCardName" placeholder="Gift Card Name" />
                          <RequiredWrapper>
                            <ErrorMessage name="giftCardName" />
                          </RequiredWrapper>
                        </FieldContainer>
                      </FieldWrapper>

                      <FieldWrapper>
                        <Label><Asterisk>*</Asterisk>Gift Card Price in $</Label>
                        <FieldContainer>
                          <InputField name="giftCardPoints" placeholder="Gift Card Price in $" />
                          <RequiredWrapper>
                            <ErrorMessage name="giftCardPoints" />
                          </RequiredWrapper>
                        </FieldContainer>
                      </FieldWrapper>

                      <FieldWrapper>
                        <Label>Is Active</Label>
                        <FieldContainer>
                          <FieldWrapper>
                            <Radio>

                              <div>
                                <Field
                                  type="radio"
                                  name="isActive"
                                  value="true"
                                  id="isActiveYes"
                                />
                                <RadioLabel htmlFor="isActiveYes">Yes</RadioLabel>
                              </div>
                              <div>
                                <Field
                                  type="radio"
                                  name="isActive"
                                  value="false"
                                  id="isActiveNo"
                                />
                                <RadioLabel htmlFor="isActiveNo">No</RadioLabel>
                              </div>
                            </Radio>
                          </FieldWrapper>
                          <RequiredWrapper>
                            <ErrorMessage name="isActive" />
                          </RequiredWrapper>
                        </FieldContainer>
                      </FieldWrapper>

                    

                    </InputWrapper>

                    <Footer>
                      <ResetBtn onClick={resetForm}>Reset</ResetBtn>
                      <SubmitBtn htmlType="submit" disabled={loader} >Submit{loader ? <Loader /> : ""}</SubmitBtn>
                    </Footer>
                  </Form>
                )}
              </Formik>

            </AnnouncementWrapper>
          </div>
        </>
      </Modal>
    </>
  );
};
export default EditRequestGiftCard;

const AnnouncementWrapper = styled.div`

height: 100%;
background: rgb(255, 255, 255);
border-radius: 5px;
overflow: hidden;
`

const Header = styled.p`
display: flex;
font-weight: 600;
font-size: 24px;
margin: 0px 0px 20px;
font-family: Poppins;
color: rgb(0, 0, 0);
`

const Footer = styled.p`
background: rgb(255, 255, 255);
margin:0px;
display:flex;
align-items:center;
justify-content:center;
font-weight: 700;
line-height: 17px;
color: #666666;
display:flex;
gap: 20px;
`

const Label = styled.p`
font-weight: 400;
line-height: 17px;
color: #282828;
// display:flex;
// justify-content:start;
text-align:start !important;
margin: 0;
font-size: 17px;
// width: 210px;
padding: 15px 0px 15px 0px;
`
const InputField = styled(Field)`
width: -webkit-fill-available;
// padding: 15px 0px 15px 15px;
padding:16px 20px;
border: 1px solid #e5e5e5;
font-size: 14px;
color: #666;
border-radius: 10px;
border: 1px solid #e5e5e5;
outline: none;
margin-bottom: 3px;
`;



const InputWrapper = styled.div`
// display: grid;
/* padding: 1.25rem; */
// grid-template-columns: repeat(2, 1fr);
// gap: 20px;
`
const Radio = styled.div`
display:flex;
gap:20px;
`
const FieldWrapper = styled.div`
// display:flex;
// gap: 20px;
text-align:left;
`
const RequiredWrapper = styled.div`
color: red;
text-align: left;
margin-bottom: 1rem;
`
const FieldContainer = styled.div`
width: 100%;
text-align: start;
`
const ResetBtn = styled(Button)`
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
  outline:none !important;
  
  &:hover {
    background: transparent;
    color: black !important;
    border: 1px solid black  !important;
    outline:none !important;
  }

  // Remove active effect
  &:active {
    background: transparent;
    color: black !important;
    border: 1px solid black !important;
    outline:none !important;
  }

  // Remove focus effect
  &:focus {
    background: transparent;
    color: black !important;
    border: 1px solid black !important;
    outline:none !important;
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
const RadioLabel = styled.label`
  margin: 0;
`;


const Asterisk = styled.span`
color: red
`