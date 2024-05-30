import React from 'react';
import { Button } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from "styled-components";
import * as yup from "yup";
import TextArea from 'antd/es/input/TextArea';

const AddGiftCard = () => {
    const initialValues = {
        giftCardName: '',
        giftImg: '',
        giftCardPrice: '',
        giftCardNote: '',
        isAdmin: "",
    };

    const validationSchema = yup.object().shape({
        giftCardName: yup.string().required('Gift Card Name is required'),
        giftImg: yup.string().required('Gift Card Image is required'),
        giftCardPrice: yup.string().required('Gift card priceis required').test(
            'is-number',
            'Enter number only',
            value => !isNaN(value) && Number.isInteger(parseFloat(value))
        ),
        giftCardNote: yup.string().required('Gift Card Note is required'),
        isAdmin: yup.string().required("Admin status is required"),
    });

    const handleSubmit = (values, { resetForm, setFieldValue }) => {
        console.log('Form values:', values);
        resetForm();
        setFieldValue('giftCardNote', '')
    };



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
                    {({ resetForm, values, setFieldValue }) => (
                        <Form>

                            <InputWrapper>

                                <FieldWrapper>
                                    <Label>Gift Card Name</Label>
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
                                            <ChooseFile
                                                name="giftImg"
                                                type="file"
                                            />
                                            <UploadInstruction>Max size 2MB and resolution is 250x250 px</UploadInstruction>
                                        </ChooseContainer>
                                        <RequiredWrapper>
                                            <ErrorMessage name="giftImg" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Gift Card Price in $</Label>
                                    <FieldContainer>
                                        <InputField name="giftCardPrice" placeholder="Gift Card Price in $" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="giftCardPrice" />
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
                                    <Label>Is Active</Label>
                                    <FieldContainer>
                                        <FieldWrapper>
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="isAdmin"
                                                    value="yes"
                                                    id="isAdminYes"
                                                />
                                                <RadioLabel htmlFor="isAdminYes">Yes</RadioLabel>
                                            </div>
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="isAdmin"
                                                    value="no"
                                                    id="isAdminNo"
                                                />
                                                <RadioLabel htmlFor="isAdminNo">No</RadioLabel>
                                            </div>
                                        </FieldWrapper>
                                        <RequiredWrapper>
                                            <ErrorMessage name="isAdmin" />
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