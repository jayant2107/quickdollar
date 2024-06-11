import styled from "styled-components";
import "../../Style/global.css";
import { Modal, Button } from "antd";
import { Field, ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import { FaGift } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { EditAllUser } from "../../Services/Collection";
import { toast } from "react-toastify";
import Loader from '../Loader/Loader';
import { useState } from "react";



const EditUserModal = ({
  handleEditCancel,
  showEditModal,
  editModal,
  record,
  viewLoader,
  fetchData,
}) => {
  const [loader,setLoader]=useState(false);
  console.log(record, "Recordddd")
  const initialValues = {
    firstName: record?.firstName||"",
    lastName: record?.lastName||"",
    email: record?.email||"",
    paypalEmail: record?.paypalEmail||"",
    address1: record?.addresslineone||"",
    address2: record?.addresslineotwo||"",
    country: record?.countryCode||"",
    city: record?.city||"",
    state: record?.state||"",
    zip: record?.zipcode,
    telephone: record?.contactNumber||"",
    userPoints: record?.Points||"",
    isAdmin: record?.userRoleID === 2 ? "2" : "3",
    suspendAccount: record?.is_suspended ? "true" : "false",
  };

  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    // paypalEmail: yup
    //   .string()
    //   .email("Invalid PayPal email")
    //   .required("PayPal email is required"),
    // address1: yup.string().required("Address 1 is required"),
    // address2: yup.string(),
    // country: yup.string().required("Country is required"),
    // city: yup.string().required("City is required"),
    // state: yup.string().required("State is required"),
    // zip: yup.string().required("Zip/Postal code is required"),
    // telephone: yup.string().required("Telephone is required"),
    // userPoints: yup.number().required("User points are required"),
    // isAdmin: yup.string().required("Admin status is required"),
    // suspendAccount: yup.string().required("Suspend Account is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { firstName, lastName, email, paypalEmail, address1, address2, country, city, state, zip, telephone, userPoints, isAdmin, suspendAccount } = values;
    const payload = {
      id: record.idUser,
      firstName: firstName,
      lastName: lastName,
      email: email,
      paypalEmail: paypalEmail,
      addresslineone: address1,
      addresslineotwo: address2,
      countryCode: country,
      city: city,
      state: state,
      zipcode: zip,
      contactNumber: telephone,
      Points: userPoints,
      userRoleID: isAdmin,
      is_suspended: suspendAccount,

    }
    console.log("Form values:", payload);
    setLoader(true)
    let res = await EditAllUser(payload)
    setLoader(false)
    if (res?.status === 200) {
      console.log(res.status)
      let fetch = fetchData()
      console.log(fetch, "fetchhhh")
      toast.success("Edit Successfully");
      resetForm();
      handleEditCancel();
    }
    else {
      let message =
        res?.response?.data?.message ||
        res?.message ||
        res?.error ||
        "Something went wrong";
      toast.error(message);
    }

  };

  return (
    <>
      <Modal
        centered
        maskStyle={{
          backgroundColor: " rgb(0 0 0 / 70%)",
        }}
        open={editModal}
        onOk={handleEditCancel}
        onCancel={handleEditCancel}
        footer=""
        closable=""
        bodyStyle={{
          maxHeight: "70vh", // Adjust the height as per your requirement
          overflowY: "auto",
        }}
      >
        <>
          <Header>Edit User</Header>
          <AnnouncementWrapper>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ resetForm }) => (
                <Form>
                  <InputWrapper>
                    <div>

                      <FieldWrapper>
                        <Button className="offerBtn" onClick={() => navigate("/quickdollar/offer/completedoffers")}>
                          <MdEmail />
                          Complete Offer</Button>
                        <Button className="offerBtn" onClick={() => navigate("/quickdollar/giftcard/requestedgiftcard")}>
                          <FaGift />
                          Requested Gift Card
                        </Button>
                      </FieldWrapper>
                      <RequiredWrapper>
                        <ErrorMessage name="suspendAccount" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label><Asterisk>*</Asterisk>First Name</Label>
                      <InputField name="firstName" placeholder="First Name" />
                      <RequiredWrapper>
                        <ErrorMessage name="firstName" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label><Asterisk>*</Asterisk>Last Name</Label>
                      <InputField name="lastName" placeholder="Last Name" />
                      <RequiredWrapper>
                        <ErrorMessage name="lastName" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label><Asterisk>*</Asterisk>Email Address</Label>
                      <InputField name="email" placeholder="Email Address" />
                      <RequiredWrapper>
                        <ErrorMessage name="email" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>PayPal Email</Label>
                      <InputField
                        name="paypalEmail"
                        placeholder="PayPal Email"
                      />
                      <RequiredWrapper>
                        <ErrorMessage name="paypalEmail" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Address 1</Label>
                      <InputField name="address1" placeholder="Address 1" />
                      <RequiredWrapper>
                        <ErrorMessage name="address1" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Address 2</Label>
                      <InputField name="address2" placeholder="Address 2" />
                      <RequiredWrapper>
                        <ErrorMessage name="address2" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Country</Label>
                      <InputField name="country" placeholder="Country" />
                      <RequiredWrapper>
                        <ErrorMessage name="country" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>City</Label>
                      <InputField name="city" placeholder="City" />
                      <RequiredWrapper>
                        <ErrorMessage name="city" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>State</Label>
                      <InputField name="state" placeholder="State" />
                      <RequiredWrapper>
                        <ErrorMessage name="state" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Zip/Postal Code</Label>
                      <InputField name="zip" placeholder="Zip/Postal Code" />
                      <RequiredWrapper>
                        <ErrorMessage name="zip" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Telephone</Label>
                      <InputField name="telephone" placeholder="Telephone" />
                      <RequiredWrapper>
                        <ErrorMessage name="telephone" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>User Points</Label>
                      <InputField name="userPoints" placeholder="User Points" />
                      <RequiredWrapper>
                        <ErrorMessage name="userPoints" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Is Admin</Label>
                      <FieldWrapper>
                        <div>
                          <Field
                            type="radio"
                            name="isAdmin"
                            value="2"
                            id="isAdminYes"
                          />
                          <RadioLabel htmlFor="isAdminYes">Yes</RadioLabel>
                        </div>

                    <div>
                      <Field
                        type="radio"
                        name="isAdmin"
                        value="3"
                        id="suspendAccountNo"
                      />
                      <RadioLabel htmlFor="suspendAccountNo">No</RadioLabel>
                    </div>
                      </FieldWrapper>
                      <RequiredWrapper>
                        <ErrorMessage name="isAdmin" />
                      </RequiredWrapper>
                    </div>
                    <div>
                      <Label>Suspend Account</Label>
                      <FieldWrapper>
                        <div>
                          <Field
                            type="radio"
                            name="suspendAccount"
                            value="true"
                            id="suspendAccountYes"
                          />
                          <RadioLabel htmlFor="suspendAccountYes">
                            Yes
                          </RadioLabel>
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="suspendAccount"
                            value="false"
                            id="suspendAccountNo"
                          />
                          <RadioLabel htmlFor="suspendAccountNo">No</RadioLabel>
                        </div>
                      </FieldWrapper>
                      <RequiredWrapper>
                        <ErrorMessage name="suspendAccount" />
                      </RequiredWrapper>
                    </div>

                  </InputWrapper>

                  <Footer>
                    <CancelBtn  onClick={handleEditCancel}>
                      Cancel
                    </CancelBtn>
                    <SubmitBtn  htmlType="submit">
                      Save{loader?<Loader/>:""}
                    </SubmitBtn>
                  </Footer>
                </Form>
              )}
            </Formik>
          </AnnouncementWrapper>
        </>
      </Modal>
    </>
  );
};
export default EditUserModal;

const AnnouncementWrapper = styled.div`
font-family: ${({ theme }) => theme?.fontFamily};`;

const Header = styled.p`
  display: flex;
  font-weight: 600;
  font-size: 24px;
  margin: 0px 0px 20px 0px;
  font-family: Poppins;
  color: rgb(0, 0, 0);
`;

const Footer = styled.div`
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: start;
  font-weight: 700;
  line-height: 17px;
  color: #666666;
  gap: 10px;
  padding-right: 1.25rem;
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
`;

const InputField = styled(Field)`
  width: -webkit-fill-available;
  padding: 15px 0px 15px 15px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
  color: #666;
  border-radius: 10px;
  outline: none;
  margin-bottom: 3px;
`;

const InputWrapper = styled.div`
  padding-right: 1.25rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 15px 0px 15px 0px;
@media only screen and (min-width: 320px) and (max-width: 480px){
  flex-direction: column;
  align-items: start;
  }
    
    

  .offerBtn {
    text-align:center;
    width:100%;
    height:40px;
    padding: 15px;
    box-shadow: rgba(61, 107, 192, 0.28) 0px 2px 8px;
    display:flex;
    align-items:center;
    gap:10px;
    justify-content:center;
      font-weight: 600;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      color: ${({ theme }) => theme?.primaryColor};
      background: ${({ theme }) => theme?.secondaryColor};
      font-family: ${({ theme }) => theme?.fontFamily};
      &:hover{
        color: ${({ theme }) => theme?.primaryColor};
      background: ${({ theme }) => theme?.secondaryColor};
      }
  }
`;

const RadioLabel = styled.label`
  margin: 0;
`;

const RequiredWrapper = styled.div`
  color: red;
  text-align: left;
  margin-bottom: 1rem;
`;

const CancelBtn = styled(Button)`
  width: 208px;
  color: black;
  display: flex;
  border-radius: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 17px;
  margin: 5px 10px;
  cursor: pointer;
  background: transparent;
  height: 48px !important;
  align-items: center !important;
  justify-content: center !important;
  border: 1px solid black !important;
  
  &:hover {
    background: transparent;
    color: black !important;
    border: 1px solid black  !important;
  }

  // Remove active effect
  &:active {
    background: transparent;
    color: black !important;
    border: 1px solid black !important;
  }

  // Remove focus effect
  &:focus {
    background: transparent;
    color: black !important;
    border: 1px solid var(--Greyscale-1000) !important;
  }
`;


const SubmitBtn = styled(Button)`
  width: 208px;
  color: white;
  border-radius: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 17px;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
  margin: 5px 10px;
  cursor: pointer;
  border: none;
  height: 48px !important;
   background-color: black !important;

  // Remove hover effect
  &:hover {
    background-color: black !important;
    color: white !important;
  }

  // Remove active effect
  &:active {
   background-color: black !important;
    color: white !important;
  }

  // Remove focus effect
  &:focus {
    background-color: black !important;
    color: white !important;
  }
`;
    
    const Asterisk = styled.span`
    color: red
  `
  
  