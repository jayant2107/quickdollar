import styled from "styled-components";
import "../../Style/global.css";
import { Modal, Button } from "antd";
import { Field, ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
const EditRequestGiftCard = ({
  handleEditCancel,
  showEditModal,
  editModal,
  viewLoader,
}) => {

  const initialValues = {
    giftCardName: '',
    giftCardPrice: '',
    amount: "",
    userName: "",
    isAdmin: "",
    reward: "",
  };

  const validationSchema = yup.object().shape({
    giftCardName: yup.string().required('Gift Card Name is required'),
    userName: yup.string().required('User Name is required'),
    giftCardPrice: yup.string().required('Gift card priceis required').test(
      'is-number',
      'Enter number only',
      value => !isNaN(value) && Number.isInteger(parseFloat(value))
    ),

    amount: yup.string().required('Amount required').test(
      'is-number',
      'Enter number only',
      value => !isNaN(value) && Number.isInteger(parseFloat(value))
    ),

    reward: yup.string().required('Reward required'),
    isAdmin: yup.string().required("Admin status is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log('Form values:', values);
    resetForm();
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
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <>
          <Header>Edit Gift Card</Header>
          <div>
            <AnnouncementWrapper>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ resetForm, values }) => (
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
                        <Label>Gift Card Price in $</Label>
                        <FieldContainer>
                          <InputField name="giftCardPrice" placeholder="Gift Card Price in $" />
                          <RequiredWrapper>
                            <ErrorMessage name="giftCardPrice" />
                          </RequiredWrapper>
                        </FieldContainer>
                      </FieldWrapper>

                      <FieldWrapper>
                        <Label>User Name</Label>
                        <FieldContainer>
                          <InputField name="userName" placeholder="User Name" />
                          <RequiredWrapper>
                            <ErrorMessage name="userName" />
                          </RequiredWrapper>
                        </FieldContainer>
                      </FieldWrapper>

                      <FieldWrapper>
                        <Label>User Total Amount</Label>
                        <FieldContainer>
                          <InputField name="amount" placeholder="User Total Amount" />
                          <RequiredWrapper>
                            <ErrorMessage name="amount" />
                          </RequiredWrapper>
                        </FieldContainer>
                      </FieldWrapper>

                      <FieldWrapper>
                        <Label>Is Active</Label>
                        <FieldContainer>
                          <FieldWrapper>
                            <Radio>

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
                            </Radio>
                          </FieldWrapper>
                          <RequiredWrapper>
                            <ErrorMessage name="isAdmin" />
                          </RequiredWrapper>
                        </FieldContainer>
                      </FieldWrapper>

                      <FieldWrapper>
                        <Label>Send Reward</Label>
                        <FieldContainer>
                          <InputField name="reward" placeholder="Reward" />
                          <RequiredWrapper>
                            <ErrorMessage name="reward" />
                          </RequiredWrapper>
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

            </AnnouncementWrapper>
          </div>
        </>
      </Modal>
    </>
  );
};
export default EditRequestGiftCard;

const AnnouncementWrapper = styled.div`
width: calc(100% - 30px);
height: 100%;
background: rgb(255, 255, 255);
margin-bottom: 20px;
border-radius: 5px;
overflow: hidden;
padding:10px;
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
background: rgb(255, 255, 255);
margin:0px;
padding: .75rem 0;
display:flex;
align-items:center;
justify-content:center;
font-weight: 700;
line-height: 17px;
color: #666666;
display:flex;
gap: 20px;
`

const Label = styled.p`
font-weight: 400;
line-height: 17px;
color: #282828;
// display:flex;
// justify-content:start;
text-align:start !important;
margin: 0;
font-size: 17px;
// width: 210px;
padding: 15px 0px 15px 0px;
`
const InputField = styled(Field)`
width: -webkit-fill-available;
// padding: 15px 0px 15px 15px;
padding:16px 20px;
border: 1px solid #e5e5e5;
font-size: 14px;
color: #666;
border-radius: 10px;
border: 1px solid #e5e5e5;
outline: none;
margin-bottom: 3px;
`;



const InputWrapper = styled.div`
// display: grid;
/* padding: 1.25rem; */
// grid-template-columns: repeat(2, 1fr);
// gap: 20px;
`
const Radio = styled.div`
display:flex;
gap:20px;
`
const FieldWrapper = styled.div`
// display:flex;
// gap: 20px;
text-align:left;
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
background-color: black !important;
border: none;
width: 100%;
height: 48px;

`;

const ResetBtn = styled(Button)`

color: black ;
  background: white!important;
  width: 100%;
  height: 48px;
  border: 1px solid black;
  &:hover {
    color: black !important;
  }
`;

const RadioLabel = styled.label`
  margin: 0;
`;