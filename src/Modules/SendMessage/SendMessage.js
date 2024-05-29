import React from 'react'
import { Button, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-rte'
import * as yup from "yup";

const SendMessage = () => {

    const initialValues = {
        user: '',
        subject: '',
        message: ''
    };

    const validationSchema = yup.object().shape({
        user: yup.string().required('User is required'),
        subject: yup.string().required('Subject is required'),
        message: yup.string().required('Message is required')
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log('Form values:', values);
    };

    return (
        <div>
            <Header>
                Send message to all user
            </Header>
            <AnnouncementWrapper>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <InputWrapper>
                                <div>
                                    <Label>Select user to send notification</Label>
                                    <SelectField
                                        defaultValue={initialValues.user}
                                        style={{
                                            width: "100%",
                                            marginBottom: "3px",
                                        }}
                                        onChange={(value) => setFieldValue('user', value)}
                                        options={[
                                            {
                                                value: 'jack',
                                                label: 'Jack',
                                            },
                                            {
                                                value: 'lucy',
                                                label: 'Lucy',
                                            },
                                            {
                                                value: 'Yiminghe',
                                                label: 'Yiminghe',
                                            },
                                            {
                                                value: 'disabled',
                                                label: 'Disabled',
                                                disabled: true,
                                            },
                                        ]}
                                    />
                                    <RequiredWrapper>
                                        <ErrorMessage name="user" />
                                    </RequiredWrapper>
                                </div>

                                <div>
                                    <Label>Your Subject</Label>
                                    <InputField name="subject" placeholder="Message subject" />
                                    <RequiredWrapper>
                                        <ErrorMessage name="subject" />
                                    </RequiredWrapper>
                                </div>

                                <div>
                                    <Label>Your Message</Label>
                                    <ThemeProvider theme={myTheme}>
                                        <RichTextEditorWrapper>
                                            <MUIRichTextEditor label="Start typing..." />
                                        </RichTextEditorWrapper>
                                    </ThemeProvider>
                                </div>

                            </InputWrapper>

                            <Footer>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Footer>
                        </Form>
                    )}
                </Formik>

            </AnnouncementWrapper>
        </div>

    )
}

export default SendMessage

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

const InputWrapper = styled.div`
padding: 1.25rem;
`

const SelectField = styled(Select)`
  .ant-select-selector {
    height: 43px !important;
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
height: 200px;
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

const RequiredWrapper = styled.div`
color: red;
text-align: left;
margin-bottom: 1rem;
`