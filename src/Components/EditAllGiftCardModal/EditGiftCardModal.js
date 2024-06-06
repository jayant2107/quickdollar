import styled from "styled-components";
import "../../Style/global.css";
import { Modal, Button } from "antd";
import { Field, ErrorMessage, Form, Formik } from "formik";
import TextArea from 'antd/es/input/TextArea';
import * as yup from "yup";
import { useRef, useState } from "react";
import { FaGift } from "react-icons/fa";
import { editGiftCard } from "../../Services/Collection";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader';

const EditGiftCardModal = ({
  handleEditCancel,
  showEditModal,
  editModal,
  viewLoader,
  record,
  fetchData,
}) => {
  const [loader,setLoader]=useState(false);
  console.log(record, "recorddd")
  const [offerImgPreview, setOfferImgPreview] = useState(record.giftCardImage);
  const [flag,setFlag]=useState(false);
  const navigate=useNavigate()


  const initialValues = {
    giftCardName: record.giftCardName || '',
    frontpageofferImage:  '',
    giftCardPoints: record.giftCardPoints || '',
    giftCardNote: record.giftCardNote || '',
    isActive: record.isActive ? "true" : "false",
  };
  const offerImgInputRef = useRef(null);

  const validationSchema = yup.object().shape({
    giftCardName: yup.string().required('Gift Card Name is required'),
    giftCardPoints: yup.string().required('Gift card priceis required').test(
      'is-number',
      'Enter number only',
      value => !isNaN(value) && Number.isInteger(parseFloat(value))
    ),
    isActive: yup.string().required("Admin status is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('giftCardName', values.giftCardName);
    formData.append('id', record.idGiftCard);
    formData.append('giftCardPoints', values.giftCardPoints);
    formData.append('giftCardNote', values.giftCardNote);
    formData.append('isActive', values.isActive);
    if(flag){
      formData.append('frontpageofferImage', values.frontpageofferImage);
    }
    
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    try {
      setLoader(true)
        const res = await editGiftCard(formData);
        setLoader(false)
        if (res?.status === 200) {
          await fetchData()
            toast.success("Edit Gift Card successfully");
            resetForm();
            setOfferImgPreview(null);
            handleEditCancel();
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
        setFlag(true);
      };
      reader.readAsDataURL(file);
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
          <Header>Edit Gift Card</Header>
          <div>
            <AnnouncementWrapper>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ resetForm, values, setFieldValue }) => (
                  <Form>

                    <InputWrapper>
                      <FieldWrapper>

                        <Button className="offerBtn" onClick={()=>navigate("/quickdollar/giftcard/requestedgiftcard")}>
                          <FaGift />
                          Requested Gift Card
                        </Button>
                      </FieldWrapper>

                      <FieldWrapper>
                        <Label>Gift Card Name<Asterisk>*</Asterisk></Label>
                        <FieldContainer>
                          <InputField name="giftCardName" placeholder="Gift Card Name" />
                          <RequiredWrapper>
                            <ErrorMessage name="giftCardName" />
                          </RequiredWrapper>
                        </FieldContainer>
                      </FieldWrapper>


                      <FieldWrapper>
                        <Label>Gift Card Image</Label>
                        <FieldContainer>
                          <ChooseContainer>
                            <UploadButton onClick={() => offerImgInputRef.current.click()}>Upload</UploadButton>
                            <input
                              ref={offerImgInputRef}
                              name="frontpageofferImage"
                              type="file"
                              onChange={(e) =>
                                handleFileChange(e, setFieldValue, setOfferImgPreview)
                              }
                              style={{ display: "none" }}
                            />
                            <UploadInstruction>Max size 2MB and resolution is 250x250 px</UploadInstruction>
                            {offerImgPreview && <Image src={offerImgPreview} alt="Offer Preview" />}
                          </ChooseContainer>
                          <RequiredWrapper>
                            <ErrorMessage name="frontpageofferImage" />
                          </RequiredWrapper>
                        </FieldContainer>
                      </FieldWrapper>

                      <FieldWrapper>
                        <Label>Gift Card Price in $<Asterisk>*</Asterisk></Label>
                        <FieldContainer>
                          <InputField name="giftCardPoints" placeholder="Gift Card Price in $" />
                          <RequiredWrapper>
                            <ErrorMessage name="giftCardPoints" />
                          </RequiredWrapper>
                        </FieldContainer>
                      </FieldWrapper>

                      <FieldWrapper>
                        <Label>Gift Card Notes</Label>
                        <FieldContainer>
                          <TextAreaField
                            name="giftCardNote"
                            placeholder="Gift Card Notes"
                            rows={3}
                            onChange={(e) => setFieldValue('giftCardNote', e.target.value)}
                            value={values.giftCardNote}
                          />
                          <RequiredWrapper>
                            <ErrorMessage name="giftCardNote" />
                          </RequiredWrapper>
                        </FieldContainer>
                      </FieldWrapper>

                      <FieldWrapper>
                        <Label>Is Active<Asterisk>*</Asterisk></Label>
                        <FieldContainer>
                          <FieldWrapper>
                            <Radio>

                              <div>
                                <Field
                                  type="radio"
                                  name="isActive"
                                  value="true"
                                  id="isAdminYes"
                                />
                                <RadioLabel htmlFor="isAdminYes">Yes</RadioLabel>
                              </div>
                              <div>
                                <Field
                                  type="radio"
                                  name="isActive"
                                  value="false"
                                  id="isAdminNo"
                                />
                                <RadioLabel htmlFor="isAdminNo">No</RadioLabel>
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
                      <ResetBtn type="primary" danger onClick={resetForm}>Reset</ResetBtn>
                      <SubmitBtn type="primary" htmlType="submit">Submit{loader?<Loader/>:""}</SubmitBtn>
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
export default EditGiftCardModal;

const AnnouncementWrapper = styled.div`
width: calc(100% - 30px);
height: 100%;
background: rgb(255, 255, 255);
margin-bottom: 20px;
border-radius: 5px;
overflow: hidden;
padding:10px;
`

const Header = styled.p`
display: flex;
font-weight: 600;
font-size: 24px;
margin: 20px 0px;
font-family: Poppins;
color: rgb(0, 0, 0);
`

const Footer = styled.p`
background: rgb(255, 255, 255);
margin:0px;
padding: .75rem 0;
display:flex;
align-items:center;
justify-content:center;
font-weight: 700;
line-height: 17px;
color: #666666;
display:flex;
gap: 10px;
`

const Label = styled.p`
font-weight: 400;
line-height: 17px;
color: #282828;
text-align:start !important;
margin: 0;
font-size: 17px;
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
`
const Radio = styled.div`
display:flex;
gap:20px;
`
const FieldWrapper = styled.div`
// display:flex;
// gap: 20px;
text-align:left;
.offerBtn {
  text-align:center;
  width:100%;
  height:40px;
  padding: 15px;
  box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
  display:flex;
  align-items:center;
  gap:10px;
  justify-content:center;
    font-weight: 600;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme?.primaryColor};
    background: ${({ theme }) => theme?.secondaryColor};
    font-family: ${({ theme }) => theme?.fontFamily};
    &:hover{
      color: ${({ theme }) => theme?.primaryColor};
    background: ${({ theme }) => theme?.secondaryColor};
    }

`
const ChooseContainer = styled.div`
display:flex;
flex-direction:column;
align-items:start;
// width: 100%;
`

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
const RequiredWrapper = styled.div`
color: red;
text-align: left;
margin-bottom: 1rem;
`
const FieldContainer = styled.div`
width: 100%;
text-align: start;
`


const SubmitBtn = styled(Button)`
color: ${({ theme }) => theme?.primaryColor};
background-color: black !important;
border: none;
width: 100%;
height: 48px;

`;

const ResetBtn = styled(Button)`

color: black ;
  background: white!important;
  width: 100%;
  height: 48px;
  border: 1px solid black;
  &:hover {
    color: black !important;
  }
`;
const TextAreaField = styled(TextArea)`
    width: 100%;
    padding:16px 20px 16px 20px;
    border: 1px solid #e5e5e5;
    font-size: 14px;
    color: #666;
    border-radius: 5px;
    margin-bottom: 3px;
    &.ant-input:focus, &.ant-input-focused, &.ant-input:hover {
        outline: none;
        box-shadow: none;
        resize: none;
        border-color: #e5e5e5; 
    }
    ::placeholder {
        color: #666;
    }
`;
const RadioLabel = styled.label`
  margin: 0;
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