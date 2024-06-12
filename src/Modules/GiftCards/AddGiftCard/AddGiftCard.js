import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from "styled-components";
import * as yup from "yup";
import TextArea from 'antd/es/input/TextArea';
import { addGiftCard } from '../../../Services/Collection';
import { toast } from "react-toastify";
import Loader from '../../../Components/Loader/Loader';

const AddGiftCard = () => {
    const [loader, setLoader] = useState(false);
    const [gitftImgPreview, setGiftImgPreview] = useState(null);
    const [giftImgError, setGiftImgError] = useState(null);
    const giftImgInputRef = useRef(null);

    const initialValues = {
        giftCardName: '',
        giftCardImage: '',
        giftCardPoints: '',
        giftCardNotes: '',
        isActive: "",
    };

    const validationSchema = yup.object().shape({
        giftCardName: yup.string().required('Gift Card Name is required'),
        giftCardImage: yup.string().required('Gift Card Image is required'),
        giftCardPoints: yup.string().required('Gift card price is required').test(
            'is-number',
            'Enter number only',
            value => !isNaN(value) && Number.isInteger(parseFloat(value))
        ),
        isActive: yup.string().required("Admin status is required"),
    });

    const handleSubmit = async (values, { resetForm, setFieldValue }) => {
        const formData = new FormData();
        formData.append('giftCardName', values.giftCardName);
        formData.append('giftCardImage', values.giftCardImage);
        formData.append('giftCardPoints', values.giftCardPoints);
        formData.append('giftCardNotes', values.giftCardNotes);
        formData.append('isActive', values.isActive);
        try {
            setLoader(true);
            const res = await addGiftCard(formData);
            setLoader(false);
            if (res?.status === 200) {
                toast.success("Add Offer successfully");
                resetForm();
                setFieldValue('giftCardNotes', '')
                setGiftImgPreview(null);
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
    const validateFile = (file) => {
        if (!file) return 'File is required';
        if (file.size > 2000000) return 'File too large';
        if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) return 'Unsupported format, only jpg, jpeg and png are supported';
        return null;
    };

    const handleFileChange = (e, setFieldValue, setPreview) => {
        const file = e.target.files[0];
        const error = validateFile(file);
        if (error) {
            setGiftImgError(error);
            setGiftImgPreview(null);
        } else {
            setGiftImgError(null);
            setFieldValue(e.target.name, file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        // Reset the input value to allow the same file to be selected again
        giftImgInputRef.current.value = null;
    };

    const handleReset = (resetForm) => {
        resetForm();
        setGiftImgPreview(null);
    };

    document.title = "Add Gift Card - quickdollarapp";

    return (
        <div>
            <Header>
                Add Gift Card
            </Header>
            <AnnouncementWrapper>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ resetForm, values, setFieldValue, setFieldTouched, touched, errors }) => (
                        <Form>
                            <InputWrapper>

                                <FieldWrapper>
                                    <Label><Asterisk>*</Asterisk>Gift Card Name</Label>
                                    <FieldContainer>
                                        <InputField name="giftCardName" placeholder="Gift Card Name" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="giftCardName" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>


                                <FieldWrapper>
                                    <Label><Asterisk>*</Asterisk>Gift Card Image</Label>
                                    <FieldContainer>
                                        <ChooseContainer>
                                            <UploadButton onClick={() => giftImgInputRef.current.click()}>Upload</UploadButton>
                                            <input
                                                ref={giftImgInputRef}
                                                name="giftCardImage"
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(e, setFieldValue, setGiftImgPreview)
                                                }
                                                style={{ display: "none" }}
                                            />
                                            <UploadInstruction>Max size 2MB</UploadInstruction>
                                            {gitftImgPreview && <Image src={gitftImgPreview} alt="Giftcard Preview" />}
                                            {giftImgError && <ErrorText>{giftImgError}</ErrorText>}
                                        </ChooseContainer>
                                        <RequiredWrapper>
                                            <ErrorMessage name="giftCardImage" />
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
                                    <Label>Gift Card Notes</Label>
                                    <FieldContainer>
                                        <TextAreaField
                                            name="giftCardNotes"
                                            placeholder="Gift Card Notes"
                                            rows={3}
                                            onChange={(e) => setFieldValue('giftCardNotes', e.target.value)}
                                            value={values.giftCardNotes}
                                            onBlur={() => setFieldTouched("giftCardNotes", true)}
                                        />
                                        <RequiredWrapper>
                                            {touched.giftCardNotes && errors.giftCardNotes && (
                                                <ErrorMessage name="giftCardNotes" />
                                            )}
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label><Asterisk>*</Asterisk>Is Active</Label>
                                    <FieldContainer>
                                        <FieldWrapper>
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
                                        </FieldWrapper>
                                        <RequiredWrapper>
                                            <ErrorMessage name="isActive" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>
                            </InputWrapper>

                            <Footer>
                                <SubmitBtn type="primary" htmlType="submit">Submit{loader ? <Loader /> : ""}</SubmitBtn>
                                <Button type="primary" danger onClick={() => handleReset(resetForm)}>Reset</Button>
                            </Footer>

                        </Form>
                    )}
                </Formik>
            </AnnouncementWrapper>
        </div>

    );
};

export default AddGiftCard;

const AnnouncementWrapper = styled.div`
width: 100%;
height: 100%;
background: rgb(255, 255, 255);
box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
margin-bottom: 20px;
border-radius: 5px;
overflow: hidden;
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
background: #F7F7F7;
margin:0px;
padding: .75rem 1.25rem;
display:flex;
align-items:center;
justify-content:start;
font-weight: 700;
line-height: 17px;
color: #666666;
border-top: 1px solid rgba(0, 0, 0, .125);
display:flex;
gap: 10px;
`

const Label = styled.p`
font-weight: 400;
line-height: 17px;
color: #282828;
display:flex;
justify-content:start;
margin-bottom: 0.5rem;
margin-top: 0px;
font-size: 17px;
text-align: start;
width: 210px;
padding: 15px 0px 15px 15px;
@media only screen and (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 0px;
    width: 100%;
    padding: 15px 0px 15px 0px;
    }
`
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

const ChooseFile = styled(Field)`
width: -webkit-fill-available;
padding: 15px 0px 5px 0px;
font-size: 14px;
color: #666;
border-radius: 5px;
outline: none;
`;

const InputWrapper = styled.div`
padding: 1.25rem;
`

const FieldWrapper = styled.div`
display:flex;
gap: 20px;
@media only screen and (min-width: 320px) and (max-width: 480px) {
    flex-direction:column;
    gap:0px
    }
`
const ChooseContainer = styled.div`
display:flex;
flex-direction:column;
align-items:start;
width: 100%;
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
background: ${({ theme }) => theme?.secondaryColor};
border: none;
`
const TextAreaField = styled(TextArea)`
    width: 100%;
    padding: 15px 0px 15px 15px;
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

const Image = styled.img`
width: 120px;
height: 120px;
object-fit: contain;
`

const UploadButton = styled(Button)`
color: black;
background: white;
width: 40%;
height: 35px;
border: 1px solid black;
margin-bottom: 1rem;
`

const Asterisk = styled.span`
color: red
`

const ErrorText = styled.div`
color: red;
margin-top: 5px;
`;