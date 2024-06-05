import React from 'react'
import { Button, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from "styled-components";
import * as yup from "yup";
import { announcement } from '../../Services/Collection';
import { toast } from 'react-toastify';

const Announcement = () => {

    const initialValues = {
        application_type: '',
        title: '',
        message: ''
    };

    const validationSchema = yup.object().shape({
        application_type: yup.string().required('User is required'),
        title: yup.string().required('Title is required'),
        message: yup.string().required('Message is required')
    });

    const handleSubmit =async (values, { resetForm, setFieldValue }) => {
        try {
            let res= await announcement(values)
            console.log('Form values:', values);
    
            if (res?.status === 200) {
                console.log(res.status)
                toast.success("Notification Sent Successfully");
                resetForm();
                setFieldValue('message', '');
              }
              else {
                let message =
                  res?.response?.data?.message ||
                  res?.message ||
                  res?.error ||
                  "Something went wrong";
                toast.error(message);
              }  
        }catch (error) {
            console.log(error, "error");
            toast.error(error?.message || "Something went wrong");
        }
           };

    return (
        <div>
            <Header>Send Push Notification</Header>
            <AnnouncementWrapper>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values, setFieldTouched }) => (
                        <Form>
                            <InputWrapper>
                                <div>
                                    <Label>Select user to send notification</Label>
                                    <SelectField
                                        style={{ width: '100%', marginBottom: "3px", }}
                                        placeholder="Please select"
                                        value={values.application_type || undefined}
                                        onChange={(value) => setFieldValue('application_type', value)}
                                        options={[
                                            {
                                                value: '0',
                                                label: 'IOS',
                                            },
                                            {
                                                value: '1',
                                                label: 'Android',
                                            },
                                            { 
                                                value: '2',
                                                label: 'All Users',
                                            },
                                            {
                                                value: '3',
                                                label: 'Web',
                                            },
                                        ]}
                                        onBlur={() => setFieldTouched('application_type', true)}
                                    />
                                    <RequiredWrapper>
                                        <ErrorMessage name="application_type" />
                                    </RequiredWrapper>
                                </div>

                                <div>
                                    <Label>Title</Label>
                                    <InputField name="title" placeholder="Notification Title" />
                                    <RequiredWrapper>
                                        <ErrorMessage name="title" />
                                    </RequiredWrapper>
                                </div>

                                <div>
                                    <Label>Message</Label>
                                    <TextAreaField
                                        name="message"
                                        placeholder="Notification Message"
                                        rows={5}
                                        onChange={(e) => setFieldValue('message', e.target.value)}
                                        value={values.message}
                                        onBlur={() => setFieldTouched('message', true)}
                                    />
                                    <RequiredWrapper>
                                        <ErrorMessage name="message" />
                                    </RequiredWrapper>
                                </div>

                            </InputWrapper>

                            <Footer>
                                <SubmitBtn type="primary" htmlType="submit">Send</SubmitBtn>
                            </Footer>
                        </Form>
                    )}
                </Formik>
            </AnnouncementWrapper>
        </div>
    );
}

export default Announcement

const AnnouncementWrapper = styled.div`
background: rgb(255, 255, 255);
box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
margin-bottom: 20px;
border-radius: 5px;
overflow: hidden;
width: 100%;
height: 100%;
`

const Header = styled.p`
display: flex;
font-weight: 600;
font-size: 24px;
margin: 20px 0px;
font-family: Poppins;
color: rgb(0, 0, 0);
font-family: Poppins;
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
font-family: Poppins;
@media only screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 15px;
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
`

const InputWrapper = styled.div`
padding: 1.25rem;
`

const SelectField = styled(Select)`
  .ant-select-selector {
    height: 43px !important;
    display: flex;
    text-align: left;
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

const RequiredWrapper = styled.div`
color: red;
text-align: left;
margin-bottom: 1rem;
`


const SubmitBtn = styled(Button)`
color: ${({ theme }) => theme?.primaryColor};
background: ${({ theme }) => theme?.secondaryColor};
border: none;
`