import React, { useState } from 'react';
import { Button, Checkbox, Select } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from "styled-components";
import TextArea from 'antd/es/input/TextArea';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-rte'
import * as yup from "yup";
import PreviewPromotionEmail from './PreviewPromotionEmail';

const PromotionEmail = () => {
    const [editorKey, setEditorKey] = useState(0);
    const [triggerModal, setTriggerModal] = useState(false);
    const initialValues = {
        subject: '',
        heading: '',
        additionalText: '',
        countries: [],
        offerText: '',
        offerAmount: '',
        offerId: '',
        offerLink: '',
        customPostbackParm: '',
        offerDescription: ""
    };

    const validationSchema = yup.object().shape({
        subject: yup.string().required('Subject is required'),
        heading: yup.string().required('Heading is required'),
        additionalText: yup.string().required('Additional text is required'),
        countries: yup.array().min(1, 'Countries are required').required('Countries are required'),
        offerText: yup.string().required('Offer text is required'),
        offerAmount: yup.string().required('Offer amount is required').test(
            'is-number',
            'Enter number only',
            value => !isNaN(value) && Number.isInteger(parseFloat(value))
        ),
        offerId: yup.string().required('Offer ID is required').test(
            'is-number',
            'Enter number only',
            value => !isNaN(value) && Number.isInteger(parseFloat(value))
        ),
        offerLink: yup.string().required('Offer link is required'),
        customPostbackParm: yup.string().required('Custom postback parameter is required'),
        offerDescription: yup.string().required('Offer description is required'),
    });

    const handleSubmit = (values, { resetForm, setFieldValue }) => {
        console.log('Form values:', values);
        resetForm();
        setFieldValue('additionalText', '');
        setFieldValue('offerDescription', '');
        setEditorKey(prevKey => prevKey + 1);
    };

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    };

    const [selectAll, setSelectAll] = useState(false);

    return (
        <div>
            <Header>Email Preview</Header>
            <AnnouncementWrapper>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <InputWrapper>
                                <FieldWrapper>
                                    <Label>Email Subject</Label>
                                    <FieldContainer>
                                        <InputField name="subject" placeholder="Email subject" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="subject" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Email Heading</Label>
                                    <FieldContainer>
                                        <InputField name="heading" placeholder="Email heading" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="heading" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Offer Description</Label>
                                    <FieldContainer>
                                        <ThemeProvider theme={myTheme}>
                                            <RichTextEditorWrapper>
                                                <MUIRichTextEditor
                                                    key={editorKey}
                                                    label="Start typing..."
                                                    onChange={(state) => {
                                                        const content = state.getCurrentContent();
                                                        setFieldValue('offerDescription', content.getPlainText());
                                                    }}
                                                />
                                            </RichTextEditorWrapper>
                                        </ThemeProvider>
                                        <RequiredWrapper>
                                            <ErrorMessage name="offerDescription" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Additional Text</Label>
                                    <FieldContainer>
                                        <TextAreaField
                                            name="additionalText"
                                            placeholder="Additional text"
                                            rows={3}
                                            onChange={(e) => setFieldValue('additionalText', e.target.value)}
                                            value={values.additionalText} />
                                        <RequiredWrapper>
                                            <ErrorMessage name="additionalText" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Offer Text</Label>
                                    <FieldContainer>
                                        <InputField name="offerText" placeholder="Offer text" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="offerText" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Offer Amount in $</Label>
                                    <FieldContainer>
                                        <InputField name="offerAmount" placeholder="Offer amount" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="offerAmount" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Offer ID</Label>
                                    <FieldContainer>
                                        <InputField name="offerId" placeholder="1" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="offerId" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Offer Link</Label>
                                    <FieldContainer>
                                        <InputField name="offerLink" placeholder="Offer link" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="offerLink" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Custom Postback Params</Label>
                                    <FieldContainer>
                                        <InputField name="customPostbackParm" placeholder="Custom postback params" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="customPostbackParm" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Offer Country Code</Label>
                                    <FieldContainer>
                                        <ChooseCountry>
                                            <SelectField
                                                mode="multiple"
                                                allowClear
                                                style={{ width: '100%' }}
                                                placeholder="Please select"
                                                value={values.countries}
                                                onChange={(value) => setFieldValue('countries', value)}
                                                options={options}
                                            />
                                            <Checkbox checked={selectAll} onChange={(e) => {
                                                const { checked } = e.target;
                                                setSelectAll(checked);
                                                const allCountries = options.map(option => option.value);
                                                setFieldValue('countries', checked ? allCountries : []);
                                            }}>
                                                Select all country
                                            </Checkbox>
                                            <RequiredWrapper>
                                                <ErrorMessage name="countries" />
                                            </RequiredWrapper>
                                        </ChooseCountry>
                                    </FieldContainer>
                                </FieldWrapper>
                            </InputWrapper>
                            <Footer>
                                <ResetButton type="button" onClick={() => setTriggerModal(true)}>Preview</ResetButton>
                                <SubmitBtn type="primary" htmlType="submit">Submit</SubmitBtn>
                            </Footer>
                        </Form>
                    )}
                </Formik>
            </AnnouncementWrapper>
            <PreviewPromotionEmail triggerModal={triggerModal} setTriggerModal={setTriggerModal} />
        </div>
    )
}

export default PromotionEmail;


const AnnouncementWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: rgb(255, 255, 255);
    box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
    margin-bottom: 20px;
    border-radius: 5px;
    overflow: hidden;
`;

const Header = styled.p`
    display: flex;
    font-weight: 600;
    font-size: 24px;
    margin: 20px 0px;
    font-family: Poppins;
    color: rgb(0, 0, 0);
`;

const Footer = styled.p`
    background: #F7F7F7;
    margin: 0px;
    padding: .75rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: start;
    font-weight: 700;
    line-height: 17px;
    color: #666666;
    border-top: 1px solid rgba(0, 0, 0, .125);
    gap: 10px;
`;

const Label = styled.p`
    font-weight: 400;
    line-height: 17px;
    color: #282828;
    display: flex;
    justify-content: start;
    margin-bottom: 0.5rem;
    margin-top: 0px;
    font-size: 17px;
    text-align: start;
    width: 210px;
    padding: 15px 0px 15px 15px;
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
    padding: 1.25rem;
`;

const FieldWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

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

const SelectField = styled(Select)`
    .ant-select-selector {
        min-height: 43px !important;
        display: flex;
        align-items: center;
        border-color: #e5e5e5 !important; 
        box-shadow: none !important;

        &:hover, &:focus {
            outline: none !important;
            box-shadow: none !important;
            border-color: #e5e5e5 !important; 
        }
    }
    .ant-select-selection-item {
        display: flex;
        align-items: center;
        justify-content: flex-start; 
    }
    .ant-select-arrow {
        color: #666 !important;  
    }
    &.ant-select-focused .ant-select-selector,
    &.ant-select-open .ant-select-selector,
    &.ant-select:hover .ant-select-selector {
        outline: none;
        box-shadow: none;
        border-color: #e5e5e5 !important;
    }
`;

const ChooseCountry = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ResetButton = styled(Button)`
    background-color: #17A2B8;
    border-color: #17A2B8;
    color: white;
`;

const SubmitBtn = styled(Button)`
color: ${({ theme }) => theme?.primaryColor};
background: ${({ theme }) => theme?.secondaryColor};
border: none;
`
const myTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
});

const RichTextEditorWrapper = styled.div`
height: 300px;
width: 100%;
overflow-y: scroll;
background: white;
border: 1px solid #e5e5e5;
border-radius: 5px;
margin-bottom: 3px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const RequiredWrapper = styled.div`
color: red;
text-align: left;
margin-bottom: 1rem;
`

const FieldContainer = styled.div`
width: 100%;
`