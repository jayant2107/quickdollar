import React from 'react';
import { Button } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from "styled-components";
import * as yup from "yup";

const AddFrontPageOffer = () => {

    const initialValues = {
        offerTitle: '',
        offerLink: '',
        offerImg: '',
        buttonImg: ''
    };

    const validationSchema = yup.object().shape({
        offerTitle: yup.string().required('Offer title is required'),
        offerLink: yup.string().required('Offer link is required'),
        offerImg: yup.string().required('Offer image is required'),
        buttonImg: yup.string().required('Button image is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log('Form values:', values);
        resetForm();
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
                                        <InputField name="offerTitle" placeholder="Offer title" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="offerTitle" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Frontpage Offer Link</Label>
                                    <FieldContainer>
                                        <InputField name="offerLink" placeholder="Offer link" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="offerLink" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Frontpage Offer Image</Label>
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
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Frontpage Button Image</Label>
                                    <FieldContainer>
                                        <ChooseContainer>
                                            <ChooseFile
                                                name="buttonImg"
                                                type="file"
                                            />
                                            <UploadInstruction>Max size 2MB and resolution is 250x250 px <br />
                                                Add button image if you want to replace default Image</UploadInstruction>
                                        </ChooseContainer>
                                        <RequiredWrapper>
                                            <ErrorMessage name="buttonImg" />
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