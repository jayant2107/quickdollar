import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from "styled-components";
import * as yup from "yup";
import { addFrontPage } from '../../../Services/Collection';
import { toast } from "react-toastify";
import Loader from '../../../Components/Loader/Loader';

const AddFrontPageOffer = () => {
    const [loader, setLoader] = useState(false);
    const [offerImgPreview, setOfferImgPreview] = useState(null);
    const [buttonImgPreview, setButtonImgPreview] = useState(null);
    const [offerImgError, setOfferImgError] = useState(null);
    const [buttonImgError, setButtonImgError] = useState(null);
    const offerImgInputRef = useRef(null);
    const buttonImgInputRef = useRef(null);

    const initialValues = {
        frontpageofferTitle: '',
        frontpageofferLink: '',
        frontpageofferImage: '',
        frontpageofferButton: ''
    };

    const validationSchema = yup.object().shape({
        frontpageofferTitle: yup.string().required('Offer title is required'),
        frontpageofferLink: yup.string().required('Offer link is required'),
        frontpageofferImage: yup.mixed().required('Offer image is required'),
        frontpageofferButton: yup.mixed().required('Button image is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('frontpageofferTitle', values.frontpageofferTitle);
        formData.append('frontpageofferLink', values.frontpageofferLink);
        formData.append('frontpageofferImage', values.frontpageofferImage);
        formData.append('frontpageofferButton', values.frontpageofferButton);

        try {
            setLoader(true);
            const res = await addFrontPage(formData);
            setLoader(false);
            if (res?.status === 200) {
                toast.success("Add Frontpage Offer successfully");
                resetForm();
                setOfferImgPreview(null);
                setButtonImgPreview(null);
                setOfferImgError(null);
                setButtonImgError(null);
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

    const handleFileChange = (e, setFieldValue, setPreview, setError, inputRef, setImgPreview) => {
        const file = e.target.files[0];
        const error = validateFile(file);
        if (error) {
            setError(error);
            setImgPreview(null); // Clear the image preview state
        } else {
            setError(null);
            setFieldValue(e.target.name, file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        // Reset the input value to allow the same file to be selected again
        inputRef.current.value = null;
    };


    const handleReset = (resetForm) => {
        resetForm();
        setOfferImgPreview(null);
        setButtonImgPreview(null);
        setOfferImgError(null);
        setButtonImgError(null);
    };

    document.title = "Add Frontpage Offer - quickdollarapp";

    return (
        <div>
            <Header>
                Add Frontpage Offer
            </Header>
            <AnnouncementWrapper>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ resetForm, setFieldValue }) => (
                        <Form>
                            <InputWrapper>
                                <FieldWrapper>
                                    <Label><Asterisk>*</Asterisk>Frontpage Offer Title</Label>
                                    <FieldContainer>
                                        <InputField name="frontpageofferTitle" placeholder="Offer title" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="frontpageofferTitle" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label><Asterisk>*</Asterisk>Frontpage Offer Link</Label>
                                    <FieldContainer>
                                        <InputField name="frontpageofferLink" placeholder="Offer link" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="frontpageofferLink" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label><Asterisk>*</Asterisk>Frontpage Offer Image</Label>
                                    <FieldContainer>
                                        <ChooseContainer>
                                            <UploadButton onClick={() => offerImgInputRef.current.click()}>Upload</UploadButton>
                                            <input
                                                ref={offerImgInputRef}
                                                name="frontpageofferImage"
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(e, setFieldValue, setOfferImgPreview, setOfferImgError, offerImgInputRef, setOfferImgPreview)
                                                }
                                                style={{ display: "none" }}
                                            />
                                            <UploadInstruction>Max size 2MB</UploadInstruction>
                                            {offerImgPreview && <Image src={offerImgPreview} alt="Offer Preview" />}
                                            {offerImgError && <ErrorText>{offerImgError}</ErrorText>}
                                        </ChooseContainer>
                                        <RequiredWrapper>
                                            <ErrorMessage name="frontpageofferImage" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label><Asterisk>*</Asterisk>Frontpage Button Image</Label>
                                    <FieldContainer>
                                        <ChooseContainer>
                                            <UploadButton onClick={() => buttonImgInputRef.current.click()}>Upload</UploadButton>
                                            <input
                                                ref={buttonImgInputRef}
                                                name="frontpageofferButton"
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(e, setFieldValue, setButtonImgPreview, setButtonImgError, buttonImgInputRef, setButtonImgPreview)
                                                }
                                                style={{ display: "none" }}
                                            />
                                            <UploadInstruction>Max size 2MB</UploadInstruction>
                                            {buttonImgPreview && <Image src={buttonImgPreview} alt="Button Preview" />}
                                            {buttonImgError && <ErrorText>{buttonImgError}</ErrorText>}
                                        </ChooseContainer>
                                        <RequiredWrapper>
                                            <ErrorMessage name="frontpageofferButton" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>
                            </InputWrapper>

                            <Footer>
                                <SubmitBtn type="primary" htmlType="submit" disabled={loader}>Submit{loader ? <Loader /> : ""}</SubmitBtn>
                                <Button type="primary" danger onClick={() => handleReset(resetForm)}>Reset</Button>
                            </Footer>
                        </Form>
                    )}
                </Formik>
            </AnnouncementWrapper>
        </div>
    );
};

export default AddFrontPageOffer;
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
font-family: Poppins;
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
@media only screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
    }
`
const RequiredWrapper = styled.div`
color: red;
text-align: left;
margin-bottom: 1rem;
`
const FieldContainer = styled.div`
width: 100%;
`

const SubmitBtn = styled(Button)`
color: ${({ theme }) => theme?.primaryColor};
background: ${({ theme }) => theme?.secondaryColor};
border: none;
`

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

const ErrorText = styled.div`
color: red;
margin-top: 5px;
`;