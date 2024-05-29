import React, { useState } from 'react';
import { Button, Checkbox, Select } from 'antd';
import { Field, Form, Formik } from 'formik';
import styled from "styled-components";
import TextArea from 'antd/es/input/TextArea';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-rte'
import { convertToRaw } from 'draft-js';

const PromotionEmail = () => {
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

    const handleSubmit = (values) => {
        console.log('Form values:', values);
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
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <InputWrapper>
                                <FieldWrapper>
                                    <Label>Email Subject</Label>
                                    <InputField name="subject" placeholder="Email subject" />
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Email Heading</Label>
                                    <InputField name="heading" placeholder="Email heading" />
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Offer Description</Label>
                                    <ThemeProvider theme={myTheme}>
                                        <RichTextEditorWrapper>
                                            <MUIRichTextEditor
                                                label="Start typing..."
                                                onSave={(data) => {
                                                    const rawContentState = convertToRaw(data.getCurrentContent());
                                                    const content = JSON.stringify(rawContentState);
                                                    setFieldValue('offerDescription', content);
                                                }}
                                                inlineToolbar={true}
                                            />
                                        </RichTextEditorWrapper>
                                    </ThemeProvider>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Additional Text</Label>
                                    <TextAreaField
                                        name="additionalText"
                                        placeholder="Additional text"
                                        rows={3}
                                        onChange={(e) => setFieldValue('additionalText', e.target.value)}
                                    />
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Offer Text</Label>
                                    <InputField name="offerText" placeholder="Offer text" />
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Offer Amount in $</Label>
                                    <InputField name="offerAmount" placeholder="Offer amount" />
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Offer ID</Label>
                                    <InputField name="offerId" placeholder="1" />
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Offer Link</Label>
                                    <InputField name="offerLink" placeholder="Offer link" />
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Custom Postback Params</Label>
                                    <InputField name="customPostbackParm" placeholder="Custom postback params" />
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Offer Country Code</Label>
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
                                    </ChooseCountry>
                                </FieldWrapper>
                            </InputWrapper>
                            <Footer>
                                <ResetButton type="primary">Preview</ResetButton>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Footer>
                        </Form>
                    )}
                </Formik>
            </AnnouncementWrapper>
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
    align-items: center;
    justify-content: start;
    margin-bottom: 0.5rem;
    margin-top: 0px;
    font-size: 17px;
    text-align: start;
    width: 210px;
`;

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
    margin-bottom: 1rem;
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
`;

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
margin-bottom: 1rem;
    &::-webkit-scrollbar {
        display: none;
    }
`;