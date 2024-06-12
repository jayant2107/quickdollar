import React, { useEffect, useState } from 'react';
import { Button, Select } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from "styled-components";
import * as yup from "yup";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Checkbox } from 'antd';
import { toast } from "react-toastify";
import { getAllGeoCodes } from '../../../Services/Collection';
import { addWebSetting } from '../../../Services/Collection';
import Loader from '../../../Components/Loader/Loader';

const WebSetting = () => {
    const [loader, setLoader] = useState(false);

    const initialValues = {
        appTitle: 'Make up to $500 a month',
        appSubTitle: 'High paying surveys and many more',
        headerText: 'QD',
        currencySign: '$',
        emailcontent: "",
        cubeOfferCountryCode: ['US'],
        showRedeembutton: 'true',
        showUserBalance: 'true',
        showBonusButton: 'false',
        showBonusBalance: 'false',
        maintanancemodeon: 'false',
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

    const [value, setValue] = useState(`Welcome to Quick Dollar,
    The easy money making site that gives you Cash
    We have added best handpicked offers from trusted sources for our customers, so explore
    them and start making up to  $450 a month by just investing your free time.
    Thanks again  for joining Quick Dollar; and may God bless you bountifully
    Best,
    Quick Dollar`);

    const [geoCodes, setGeoCodes] = useState([]);

    const validationSchema = yup.object().shape({
        appTitle: yup.string().required('Title is required'),
        appSubTitle: yup.string().required('Subtitle is required'),
        headerText: yup.string().required('Header text is required'),
        currencySign: yup.string().required('Currency Sign text is required'),
        // emailcontent: yup.string().required('Welcome email is required'),
        cubeOfferCountryCode: yup.array().min(1, 'Countries are required').required('Countries are required'),
    });

    const handleSubmit = async (values, { resetForm, setFieldValue }) => {
        try {
            let payload = {
                ...values,
                cubeOfferCountryCode: values.cubeOfferCountryCode.join(','),
              }
              setLoader(true)
            let res = await addWebSetting(payload);
            setLoader(false)
            if (res?.status === 200) {
                toast.success("Web Setting added Successfully");
                resetForm()
                setFieldValue('additionalText', '');
                setValue('');
            }
            else {
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
        value: `${jsonData?.iso_code_2}`,
    }));


    useEffect(() => {
        fetchGeoCordData();
    }, [])

    document.title = "Web Settings - quickdollarapp";

    return (
        <div>
            <Header>Web Settings</Header>
            <AnnouncementWrapper>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, touched, errors, setFieldTouched ,resetForm}) => (
                        <Form>
                            <InputWrapper>
                                <FieldWrapper>
                                    <Label><Asterisk>*</Asterisk>Application Title</Label>
                                    <FieldContainer>
                                        <InputField name="appTitle" placeholder="Application title" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="appTitle" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label><Asterisk>*</Asterisk>Application Sub-Title</Label>
                                    <FieldContainer>
                                        <InputField name="appSubTitle" placeholder="Application sub-title" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="appSubTitle" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label><Asterisk>*</Asterisk>Header Text</Label>
                                    <FieldContainer>
                                        <InputField name="headerText" placeholder="Header text like QD" />
                                        <RequiredWrapper>
                                            <ErrorMessage name="headerText" />
                                        </RequiredWrapper>
                                    </FieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label><Asterisk>*</Asterisk>Currency Sign</Label>
                                    <FieldContainer>
                                        <InputField name="currencySign" placeholder="Currency sign like $" />
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
                                                    name="showRedeembutton"
                                                    value="false"
                                                    id="showRedeembuttonNo"
                                                />
                                                <RadioLabel htmlFor="showRedeembuttonNo">No</RadioLabel>
                                            </div>
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="showRedeembutton"
                                                    value="true"
                                                    id="showRedeembuttonYes"
                                                />
                                                <RadioLabel htmlFor="showRedeembuttonYes">
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
                                                    name="showUserBalance"
                                                    value="false"
                                                    id="showUserBalanceNo"
                                                />
                                                <RadioLabel htmlFor="showUserBalanceNo">No</RadioLabel>
                                            </div>
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="showUserBalance"
                                                    value="true"
                                                    id="showUserBalanceYes"
                                                />
                                                <RadioLabel htmlFor="showUserBalanceYes">
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
                                                    name="showBonusButton"
                                                    value="false"
                                                    id="showBonusButtonNo"
                                                />
                                                <RadioLabel htmlFor="showBonusButtonNo">No</RadioLabel>
                                            </div>
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="showBonusButton"
                                                    value="true"
                                                    id="showBonusButtonYes"
                                                />
                                                <RadioLabel htmlFor="showBonusButtonYes">
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
                                                    name="showBonusBalance"
                                                    value="false"
                                                    id="showBonusBalanceNo"
                                                />
                                                <RadioLabel htmlFor="showBonusBalanceNo">No</RadioLabel>
                                            </div>
                                            <div>
                                                <Field
                                                    type="radio"
                                                    name="showBonusBalance"
                                                    value="true"
                                                    id="showBonusBalanceYes"
                                                />
                                                <RadioLabel htmlFor="showBonusBalanceYes">
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
                                            name="maintanancemodeon"
                                            render={({ field }) => (
                                                <Checkbox
                                                    {...field}
                                                    checked={field.value === 'true'}
                                                    onChange={e => setFieldValue('maintanancemodeon', e.target.checked ? 'true' : 'false')}
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
                                                setFieldValue('emailcontent', content);
                                                setIsEmpty(content === '<p><br></p>');
                                            }}
                                            modules={{ toolbar: toolbarOptions }}
                                            tooltip={true}
                                            onBlur={() => {
                                                setFieldTouched('emailcontent', true);
                                                if (isEmpty) {
                                                    setFieldValue('emailcontent', '');
                                                }
                                            }}
                                        />
                                        <RequiredWrapper>
                                            {touched.emailcontent && errors.emailcontent && (
                                                <ErrorMessage name="emailcontent" />
                                            )}
                                        </RequiredWrapper>
                                    </QuillFieldContainer>
                                </FieldWrapper>

                                <FieldWrapper>
                                    <Label><Asterisk>*</Asterisk>Cube Offer Country Code</Label>
                                    <FieldContainer>
                                        <ChooseCountry>
                                            <SelectField
                                                mode="multiple"
                                                allowClear
                                                style={{ width: '100%' }}
                                                placeholder="Please select"
                                                value={values.cubeOfferCountryCode}
                                                onChange={(value) => setFieldValue('cubeOfferCountryCode', value)}
                                                options={options}
                                                onBlur={() => setFieldTouched('cubeOfferCountryCode', true)}
                                            />
                                            <RequiredWrapper>
                                                <ErrorMessage name="cubeOfferCountryCode" />
                                            </RequiredWrapper>
                                        </ChooseCountry>
                                    </FieldContainer>
                                </FieldWrapper>

                            </InputWrapper>
                            <Footer>
                                <SubmitBtn type="primary" htmlType="submit"disabled={loader}>Submit {loader ? <Loader /> : ""}</SubmitBtn>
                                <Button type="primary" danger onClick={resetForm}>Reset</Button>
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
        width: 100%;
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
    display: flex;
    align-items: center;
    @media only screen and (min-width: 320px) and (max-width: 480px) {
        flex-direction:column;
        gap:0px;
        align-items:flex-start;

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
const Asterisk = styled.span`
color: red
`