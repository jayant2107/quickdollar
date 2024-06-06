import styled from "styled-components";
import "../../Style/global.css";
import { Modal, Button } from "antd";
import { Field, ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import { editRequestedGiftCard } from "../../Services/Collection";
import { toast } from "react-toastify";

const EditRequestGiftCard = ({
  handleEditCancel,
  showEditModal,
  editModal,
  viewLoader,
  record,
  fetchData,
}) => {
  console.log(record)

  const initialValues = {
    giftCardName: record.giftcard.giftCardName || '',
    giftCardPoints: record.giftcard.giftCardPoints||"",
    isActive: record.giftcard.isActive ? "true" : "false",
    sendRewards: ""
  };
 

  const validationSchema = yup.object().shape({
    giftCardName: yup.string().required('Gift Card Name is required'),
    giftCardPoints
: yup.string().required('Gift card priceis required').test(
      'is-number',
      'Enter number only',
      value => !isNaN(value) && Number.isInteger(parseFloat(value))
    ),
    isActive: yup.string().required("Admin status is required"),
  });

  const handleSubmit =async (values, { resetForm }) => {
    console.log('Form values:', values);
   

    const {  isActive , giftCardName,giftCardPoints, sendRewards} = values;
    const payload = {
      id: record.idRequestedGiftCard,
      giftCardName:giftCardName,
      giftCardPoints:giftCardPoints,
      isActive:isActive,
    sendRewards:sendRewards


    }
    console.log("Form values:", payload);
    // setLoader(true)
    let res = await editRequestedGiftCard(payload)
    // setLoader(false)
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
                          <InputField name="giftCardPoints" placeholder="Gift Card Price in $" />
                          <RequiredWrapper>
                            <ErrorMessage name="giftCardPoints" />
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
                                  name="isActive"
                                  value="true"
                                  id="isActiveYes"
                                />
                                <RadioLabel htmlFor="isActiveYes">Yes</RadioLabel>
                              </div>
                              <div>
                                <Field
                                  type="radio"
                                  name="isActive"
                                  value="false"
                                  id="isActiveNo"
                                />
                                <RadioLabel htmlFor="isActiveNo">No</RadioLabel>
                              </div>
                            </Radio>
                          </FieldWrapper>
                          <RequiredWrapper>
                            <ErrorMessage name="isActive" />
                          </RequiredWrapper>
                        </FieldContainer>
                      </FieldWrapper>

                      <FieldWrapper>
                        <Label>Send Reward</Label>
                        <FieldContainer>
                          <InputField name="sendRewards" placeholder="Reward"  />
                         
                        </FieldContainer>
                      </FieldWrapper>

                    </InputWrapper>

                    <Footer>
                      <ResetBtn type="primary" danger onClick={resetForm}>Reset</ResetBtn>
                      <SubmitBtn type="primary" htmlType="submit">Submit</SubmitBtn>
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