import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Select } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from "styled-components";
import TextArea from 'antd/es/input/TextArea';
import * as yup from "yup";
import PreviewPromotionEmail from './PreviewPromotionEmail';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getAllGeoCodes } from '../../Services/Collection';
import { toast } from "react-toastify";
import Loader from '../../Components/Loader/Loader';

const PromotionEmail = () => {
    const [loader,setLoader]=useState(false);
    const [triggerModal, setTriggerModal] = useState(false);
    const [previewData, setPreviewData] = useState({});

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
    const [geoCodes, setGeoCodes] = useState([]);

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

    const handlePreview = (values) => {
        setPreviewData(values);
        setTriggerModal(true);
    };

    const handleSubmit = (values, { resetForm, setFieldValue }) => {
        console.log('Form values:', values);
        resetForm();
        setFieldValue('additionalText', '');
        setValue('');
    };

    const [selectAll, setSelectAll] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);


    const fetchGeoCordData = async () => {
        try {
            const res = await getAllGeoCodes();
            if (res?.status === 200) {
                setGeoCodes(res?.msg);
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

    const options = geoCodes.map(jsonData => ({
        label: `${jsonData?.country} (${jsonData?.iso_code_2})`,
        value: `${jsonData?.country} (${jsonData?.iso_code_2})`,
    }));

    useEffect(() => {
        fetchGeoCordData();
    }, [])


    return (
        <div>
            <Header>Email Preview</Header>
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
                                    <QuillFieldContainer>
                                        <StyledReactQuill
                                            theme="snow"
                                            value={value}
                                            onChange={(content) => {
                                                setValue(content);
                                                setFieldValue('offerDescription', content);
                                                setIsEmpty(content === '<p><br></p>');
                                            }}
                                            modules={{ toolbar: toolbarOptions }}
                                            tooltip={true}
                                            onBlur={() => {
                                                setFieldTouched('offerDescription', true);
                                                if (isEmpty) {
                                                    setFieldValue('offerDescription', '');
                                                }
                                            }}
                                        />
                                        <RequiredWrapper>
                                            {touched.offerDescription && errors.offerDescription && (
                                                <ErrorMessage name="offerDescription" />
                                            )}
                                        </RequiredWrapper>
                                    </QuillFieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label>Additional Text</Label>
                                    <FieldContainer>
                                        <TextAreaField
                                            name="additionalText"
                                            placeholder="Additional text"
                                            rows={3}
                                            onChange={(e) => setFieldValue('additionalText', e.target.value)}
                                            value={values.additionalText}
                                            onBlur={() => setFieldTouched("additionalText", true)}
                                        />
                                        <RequiredWrapper>
                                            {touched.additionalText && errors.additionalText && (
                                                <ErrorMessage name="additionalText" />
                                            )}
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
                                                onBlur={() => setFieldTouched('countries', true)}
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
                                <ResetButton type="button" onClick={() => handlePreview(values)}>Preview</ResetButton>
                                <SubmitBtn type="primary" htmlType="submit">Submit{loader?<Loader/>:""}</SubmitBtn>
                            </Footer>
                        </Form>
                    )}
                </Formik>
            </AnnouncementWrapper>
            <PreviewPromotionEmail triggerModal={triggerModal} setTriggerModal={setTriggerModal} previewData={previewData} />
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
    font-family: Poppins;
    @media only screen and (min-width: 320px) and (max-width: 480px) {
        margin-bottom: 0px;
        width: 100%;
        padding: 15px 0px 15px 0px;
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
    @media only screen and (min-width: 320px) and (max-width: 480px) {
        flex-direction:column;
        gap:0px
        }
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
    text-align:left
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