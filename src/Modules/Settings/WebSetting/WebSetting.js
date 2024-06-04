import React, { useState } from 'react';
import { Button, Select } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from "styled-components";
import * as yup from "yup";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Checkbox } from 'antd';


const WebSetting = () => {

    const initialValues = {
        title: '',
        subTitle: '',
        headerText: '',
        currencySign: '',
        welcomeEmail: "",
        countries: [],
        redeemBtn: 'true',
        userBalance: 'true',
        bonusBtn: 'false',
        bonusBalance: 'false',
        maintananceMode: 'false',
    };

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
    ];

    const [value, setValue] = useState('');

    const validationSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        subTitle: yup.string().required('Subtitle is required'),
        headerText: yup.string().required('Header text is required'),
        currencySign: yup.string().required('Currency Sign text is required'),
        welcomeEmail: yup.string().required('Welcome email is required'),
        countries: yup.array().min(1, 'Countries are required').required('Countries are required'),
    });

    const handleSubmit = (values, { resetForm, setFieldValue }) => {
        console.log('Form values:', values);
        resetForm();
        setFieldValue('additionalText', '');
        setValue('');
    };

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    };

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const [isEmpty, setIsEmpty] = useState(false);

    return (
        <div>
            <Header>Settings</Header>
            <AnnouncementWrapper>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, touched, errors, setFieldTouched }) => (
                        <Form>
                            <InputWrapper>
                                <FieldWrapper>
                                    <Label>Application Title</Label>
                                    <FieldContainer>
                                        <InputField name="title" placeholder="Application title" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="title" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Application Sub-Title</Label>
                                    <FieldContainer>
                                        <InputField name="subTitle" placeholder="Application sub-title" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="subTitle" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Header Text</Label>
                                    <FieldContainer>
                                        <InputField name="headerText" placeholder="Header text" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="headerText" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Currency Sign</Label>
                                    <FieldContainer>
                                        <InputField name="currencySign" placeholder="Currency sign" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="currencySign" />
                                        </RequiredWrapper>
                                    </FieldContainer>

                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Show redeem button</Label>
                                    <FieldWrapper>
                                        <RdioWrapper >
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="redeemBtn"
                                                    value="false"
                                                    id="redeemBtnNo"
                                                />
                                                <RadioLabel htmlFor="redeemBtnNo">No</RadioLabel>
                                            </div>
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="redeemBtn"
                                                    value="true"
                                                    id="redeemBtnYes"
                                                />
                                                <RadioLabel htmlFor="redeemBtnYes">
                                                    Yes
                                                </RadioLabel>
                                            </div>

                                        </RdioWrapper>
                                    </FieldWrapper>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Show User balance</Label>
                                    <FieldWrapper>
                                        <RdioWrapper >
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="userBalance"
                                                    value="false"
                                                    id="userBalanceNo"
                                                />
                                                <RadioLabel htmlFor="userBalanceNo">No</RadioLabel>
                                            </div>
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="userBalance"
                                                    value="true"
                                                    id="userBalanceYes"
                                                />
                                                <RadioLabel htmlFor="userBalanceYes">
                                                    Yes
                                                </RadioLabel>
                                            </div>

                                        </RdioWrapper>
                                    </FieldWrapper>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Show Bonus Button</Label>
                                    <FieldWrapper>
                                        <RdioWrapper >
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="bonusBtn"
                                                    value="false"
                                                    id="bonusBtnNo"
                                                />
                                                <RadioLabel htmlFor="bonusBtnNo">No</RadioLabel>
                                            </div>
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="bonusBtn"
                                                    value="true"
                                                    id="bonusBtnYes"
                                                />
                                                <RadioLabel htmlFor="bonusBtnYes">
                                                    Yes
                                                </RadioLabel>
                                            </div>

                                        </RdioWrapper>
                                    </FieldWrapper>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Show Bonus Balance</Label>
                                    <FieldWrapper>
                                        <RdioWrapper >
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="bonusBalance"
                                                    value="false"
                                                    id="bonusBalanceNo"
                                                />
                                                <RadioLabel htmlFor="bonusBalanceNo">No</RadioLabel>
                                            </div>
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="bonusBalance"
                                                    value="true"
                                                    id="bonusBalanceYes"
                                                />
                                                <RadioLabel htmlFor="bonusBalanceYes">
                                                    Yes
                                                </RadioLabel>
                                            </div>

                                        </RdioWrapper>
                                    </FieldWrapper>
                                </FieldWrapper>


                                <FieldWrapper>
                                    <Label>Maintanance Mode ON ?</Label>
                                    <FieldContainer>
                                        <Field
                                            name="maintananceMode"
                                            render={({ field }) => (
                                                <Checkbox
                                                    {...field}
                                                    checked={field.value === 'true'}
                                                    onChange={e => setFieldValue('maintananceMode', e.target.checked ? 'true' : 'false')}
                                                >
                                                </Checkbox>
                                            )}
                                        />
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>welcom email</Label>
                                    <QuillFieldContainer>
                                        <StyledReactQuill
                                            theme="snow"
                                            value={value}
                                            onChange={(content) => {
                                                setValue(content);
                                                setFieldValue('welcomeEmail', content);
                                                setIsEmpty(content === '<p><br></p>');
                                            }}
                                            modules={{ toolbar: toolbarOptions }}
                                            tooltip={true}
                                            onBlur={() => {
                                                setFieldTouched('welcomeEmail', true);
                                                if (isEmpty) {
                                                    setFieldValue('welcomeEmail', '');
                                                }
                                            }}
                                        />
                                        <RequiredWrapper>
                                            {touched.welcomeEmail && errors.welcomeEmail && (
                                                <ErrorMessage name="welcomeEmail" />
                                            )}
                                        </RequiredWrapper>
                                    </QuillFieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Cube Offer Country Code</Label>
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
                                                onBlur={() => setFieldTouched('countries', true)}
                                            />
                                            <RequiredWrapper>
                                                <ErrorMessage name="countries" />
                                            </RequiredWrapper>
                                        </ChooseCountry>
                                    </FieldContainer>
                                </FieldWrapper>

                            </InputWrapper>
                            <Footer>
                                <SubmitBtn type="primary" htmlType="submit">Submit</SubmitBtn>
                            </Footer>
                        </Form>
                    )}
                </Formik>
            </AnnouncementWrapper>
        </div>
    )
}

export default WebSetting;


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
    font-family: Poppins;
    @media only screen and (min-width: 320px) and (max-width: 480px) {
        margin-bottom: 0px;
        }
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
    width: 100%;
    @media only screen and (min-width: 320px) and (max-width: 480px) {
        flex-direction:column;
        gap:0px
        }
`;

const SelectField = styled(Select)`
    .ant-select-selector {
        min-height: 43px !important;
        display: flex;
        align-items: center;
        border-color: #e5e5e5 !important; 
        box-shadow: none !important;
        .ant-select-selection-placeholder{
            color:rgb(102, 102, 102) !important;
          }
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
const RequiredWrapper = styled.div`
color: red;
text-align: left;
margin-bottom: 1rem;
`

const FieldContainer = styled.div`
width: 100%;
text-align: start;
`
const StyledReactQuill = styled(ReactQuill)`
    .ql-container {
        height: 180px; 
        margin-bottom: 3px;
        overflow-y: auto; 
    }
    .ql-toolbar.ql-snow + .ql-container.ql-snow {
        border-radius: 0px 0px 5px 5px;
        width: 100% !important; 
        @media only screen and (min-width: 320px) and (max-width: 480px) {
            width: 100% !important;
        }
    }
    .ql-toolbar.ql-snow {
        border-radius: 5px 5px 0px 0px;
        width: 100% !important; // Make width responsive
    }
`;

const QuillFieldContainer = styled.div`
    width: 100%;
    margin-bottom: 7px;
    overflow: hidden; // Ensure overflow is handled
`;

const RadioLabel = styled.label`
  margin: 0;
`;

const RdioWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 7px;
margin-bottom: 15px;
`