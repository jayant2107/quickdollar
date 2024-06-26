import React from 'react';
import { Button, Checkbox } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from "styled-components";
import * as yup from "yup";

const AddAdminUser = () => {

  const initialValues = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: true
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    userName: yup.string().required('User name is required'),
    email: yup.string().required('Email Address is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().required('Confirm Password is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log('Form values:', values);
    resetForm();
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div>
      <Header>
        Add Admin User
      </Header>
      <AddAdminUserWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ resetForm }) => (
            <Form>

              <InputWrapper>

                <FieldWrapper>
                  <Label>First Name</Label>
                  <FieldContainer>
                    <InputField name="firstName" placeholder="First Name" />
                    <RequiredWrapper>
                      <ErrorMessage name="firstName" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Last Name</Label>
                  <FieldContainer>
                    <InputField name="lastName" placeholder="Last Name" />
                    <RequiredWrapper>
                      <ErrorMessage name="lastName" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Username</Label>
                  <FieldContainer>
                    <InputField name="userName" placeholder="User Name" />
                    <RequiredWrapper>
                      <ErrorMessage name="userName" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Email Address</Label>
                  <FieldContainer>
                    <InputField name="email" placeholder="Email Address" />
                    <RequiredWrapper>
                      <ErrorMessage name="email" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Password</Label>
                  <FieldContainer>
                    <InputField name="password" placeholder="Password" />
                    <RequiredWrapper>
                      <ErrorMessage name="password" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Confirm Password</Label>
                  <FieldContainer>
                    <InputField name="confirmPassword" placeholder="Confirm Password" />
                    <RequiredWrapper>
                      <ErrorMessage name="confirmPassword" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Is Admin</Label>
                  <FieldContainer>
                    <CheckboxWrapper>
                      <Checkbox onChange={onChange} name="isAdmin" checked>Checkbox</Checkbox>
                    </CheckboxWrapper>
                  </FieldContainer>
                </FieldWrapper>

              </InputWrapper>

              <Footer>
                <SubmitBtn type="primary" htmlType="submit">Submit</SubmitBtn>
                <ResetBtn type="primary" danger onClick={resetForm}>Reset</ResetBtn>
              </Footer>
            </Form>
          )}
        </Formik>
      </AddAdminUserWrapper>
    </div>
  )
}

export default AddAdminUser;

const AddAdminUserWrapper = styled.div`
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

const Footer = styled.div`
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
padding:15px 0px 15px 15px;
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

const FieldWrapper = styled.div`
display:flex;
gap: 20px;
`
const RequiredWrapper = styled.div`
color: red;
text-align: left;
margin-bottom: 1rem;
`
const FieldContainer = styled.div`
width: 100%;
`

const CheckboxWrapper = styled.div`
padding: 15px 0px 15px 15px;
text-align: start;
display:flex;
align-items:center;


.ant-checkbox-inner {
    width: 20px;
    height: 20px;
}

.ant-checkbox-checked .ant-checkbox-inner {
    background-color: #1890ff;
    border-color: #1890ff;
}

.ant-checkbox-checked .ant-checkbox-inner::after {
    left: 22%;
}

.ant-checkbox-input {
    width: 20px;
    height: 20px;
}
`

const SubmitBtn = styled(Button)`
color: ${({ theme }) => theme?.primaryColor};
background: ${({ theme }) => theme?.secondaryColor};
border: none;
`

const ResetBtn = styled(Button)`
color: ${({ theme }) => theme?.primaryColor};
background: red;
border: none;
`