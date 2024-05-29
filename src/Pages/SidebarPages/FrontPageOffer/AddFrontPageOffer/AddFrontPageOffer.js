import React from 'react';
import { Button } from 'antd';
import { Field, Form, Formik } from 'formik';
import styled from "styled-components";

const AddFrontPageOffer = () => {

    const initialValues = {
        offerTitle: '',
        offerLink: '',
        offerImg: '',
        buttonImg: ''
    };

    const handleSubmit = (values) => {
        console.log('Form values:', values);
    };

    return (
        <AnnouncementWrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, resetForm }) => (
                    <Form>
                        <Header>
                            Add frontpage Offer
                        </Header>

                        <InputWrapper>

                            <FieldWrapper>
                                <Label>Frontpage Offer Title</Label>
                                <InputField name="offerTitle" placeholder="Offer title" />
                            </FieldWrapper>

                            <FieldWrapper>
                                <Label>Frontpage Offer Link</Label>
                                <InputField name="offerLink" placeholder="Offer link" />
                            </FieldWrapper>

                            <FieldWrapper>
                                <Label>Frontpage Offer Image</Label>
                                <ChooseContainer>
                                    <ChooseFile
                                        name="offerImg"
                                        type="file"
                                    />
                                    <UploadInstruction>Max size 2MB and resolution is 250x250 px</UploadInstruction>
                                </ChooseContainer>
                            </FieldWrapper>

                            <FieldWrapper>
                                <Label>Frontpage Button Image</Label>
                                <ChooseContainer>
                                    <ChooseFile
                                        name="buttonImg"
                                        type="file"
                                    />
                                    <UploadInstruction>Max size 2MB and resolution is 250x250 px <br />
                                        Add button image if you want to replace default Image</UploadInstruction>
                                </ChooseContainer>
                            </FieldWrapper>

                        </InputWrapper>

                        <Footer>
                            <Button type="primary" htmlType="submit">Submit</Button>
                            <Button type="primary" danger onClick={resetForm}>Reset</Button>
                        </Footer>
                    </Form>
                )}
            </Formik>

        </AnnouncementWrapper>
    )
}

export default AddFrontPageOffer;

const AnnouncementWrapper = styled.div`
background: #FFFFFF;
border: 1px solid #E5E5E5;
box-sizing: border-box;
border-radius: 5px;
width: 100%;
height: 100%;
margin: 1rem;
`

const Header = styled.p`
background: #F7F7F7;
margin:0px;
padding: 1.25rem;
display:flex;
align-items:center;
justify-content:start;
font-weight: 700;
line-height: 17px;
color: #666666;
font-size: 19px;
border-bottom: 1px solid rgba(0, 0, 0, .125);
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
align-items:center;
justify-content:start;
margin-bottom: 0.5rem;
margin-top: 0px;
font-size: 17px;
text-align: start;
width: 210px;
`
const InputField = styled(Field)`
width: -webkit-fill-available;
padding: 15px 0px 15px 15px;
border: 1px solid #e5e5e5;
font-size: 14px;
color: #666;
border-radius: 5px;
outline: none;
margin-bottom: 1rem;
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
