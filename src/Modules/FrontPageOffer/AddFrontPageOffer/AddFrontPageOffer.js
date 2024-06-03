import React from 'react';
import { Button } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from "styled-components";
import * as yup from "yup";
import { addFrontPage } from '../../../Services/Collection';
import { toast } from "react-toastify";

const AddFrontPageOffer = () => {

    const initialValues = {
        frontpageofferTitle: '',
        frontpageofferLink: '',
        frontpageofferImage: null,
        frontpageofferButton: null
    };

    const validationSchema = yup.object().shape({
        frontpageofferTitle: yup.string().required('Offer title is required'),
        frontpageofferLink: yup.string().required('Offer link is required'),
        frontpageofferImage: yup.string().required('Offer image is required'),
        frontpageofferButton: yup.string().required('Button image is required'),
    });

   
    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('frontpageofferTitle', values.frontpageofferTitle);
        formData.append('frontpageofferLink', values.frontpageofferLink);
        formData.append('frontpageofferImage', values.frontpageofferImage);
        formData.append('frontpageofferButton', values.frontpageofferButton);

        try {
            const res = await addFrontPage(formData);
            if (res?.status === 200) {
                toast.success("Message sent successfully");
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
                    {({ resetForm }) => (
                        <Form>

                            <InputWrapper>

                                <FieldWrapper>
                                    <Label>Frontpage Offer Title</Label>
                                    <FieldContainer>
                                        <InputField name="frontpageofferTitle" placeholder="Offer title" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="frontpageofferTitle" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Frontpage Offer Link</Label>
                                    <FieldContainer>
                                        <InputField name="frontpageofferLink" placeholder="Offer link" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="frontpageofferLink" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Frontpage Offer Image</Label>
                                    <FieldContainer>
                                        <ChooseContainer>
                                            <ChooseFile
                                                name="frontpageofferImage"
                                                type="file"
                                                
                                            />
                                            <UploadInstruction>Max size 2MB and resolution is 250x250 px</UploadInstruction>
                                        </ChooseContainer>
                                        <RequiredWrapper>
                                            <ErrorMessage name="frontpageofferImage" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Frontpage Button Image</Label>
                                    <FieldContainer>
                                        <ChooseContainer>
                                            <ChooseFile
                                                name="frontpageofferButton"
                                                type="file"
                                            />
                                            <UploadInstruction>Max size 2MB and resolution is 250x250 px <br />
                                                Add button image if you want to replace default Image</UploadInstruction>
                                        </ChooseContainer>
                                        <RequiredWrapper>
                                            <ErrorMessage name="frontpageofferButton" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                            </InputWrapper>

                            <Footer>
                                <SubmitBtn type="primary" htmlType="submit">Submit</SubmitBtn>
                                <Button type="primary" danger onClick={resetForm}>Reset</Button>
                            </Footer>
                        </Form>
                    )}
                </Formik>

            </AnnouncementWrapper>
        </div>

    )
}

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
@media only screen and (min-width: 320px) and (max-width: 480px) {
    padding: 0px 0px 5px 0px;
}
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