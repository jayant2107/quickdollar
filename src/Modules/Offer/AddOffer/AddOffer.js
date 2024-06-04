import React, { useState } from "react";
import { Button, Checkbox, Select } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PromotionEmail = () => {

  const initialValues = {
    title: "",
    h1Title: "",
    offerImg: "",
    offerLink: '',
    offerAmount: "",
    offerText: "",
    offerShortDescription: '',
    offerLongDescription: '',
    offerCreatedFor: '',
    countries: [],
    fraudUser: "",
    capLimit: "",
    isActive: "false",
    isHotOffer: "false",
    hotOfferFor: 'hotOfferForWeb',
    appInstallation: 'false',
    callbackType: 'false',
    repeatedOffer: 'false',
    relistOffer: false,
    urlType: false,
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
  ];

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    h1Title: yup.string().required('H1 title is required'),
    offerImg: yup.string().required('Offer Image is required'),
    offerLink: yup.string().required('Offer Link is required'),
    offerAmount: yup.string().required('Offer amount is required').test(
      'is-number',
      'Enter number only',
      value => !isNaN(value) && Number.isInteger(parseFloat(value))
    ),
    offerText: yup.string().required('Offer Text is required'),
    offerShortDescription: yup.string().required('Offer Short Description is required'),
    offerLongDescription: yup.string().required('Offer Long Description is required'),
    offerCreatedFor: yup.string().required('Offer Created is required'),
    customPostbaclParams: yup.string(),
    countries: yup.array().min(1, 'Countries are required').required('Countries are required'),
    fraudUser: yup.string().required('Fraud User is required'),
    capLimit: yup.string().required('Cap Limit is required'),
  });

  const handleSubmit = (values, { resetForm, setFieldValue }) => {
    console.log("Form values:", values);
    resetForm();
    setFieldValue("additionalText", "");
    setH1TitleValue("");
    setLongDescriptionValue('');
  };

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const [selectAll, setSelectAll] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [h1TitleValue, setH1TitleValue] = useState("");
  const [longDescriptionValue, setLongDescriptionValue] = useState("");

  return (
    <div>
      <Header>Add Offer</Header>
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
                  <Label>Offer Title</Label>
                  <FieldContainer>
                    <InputField
                      name="title"
                      placeholder="Offer Title
"
                    />
                    <RequiredWrapper>
                      <ErrorMessage name="title" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>


                <FieldWrapper>
                  <Label>Offer H1 Title</Label>
                  <QuillFieldContainer>
                    <StyledReactQuill
                      theme="snow"
                      value={h1TitleValue}
                      onChange={(content) => {
                        setH1TitleValue(content);
                        setFieldValue("h1Title", content);
                        setIsEmpty(content === "<p><br></p>");
                      }}
                      modules={{ toolbar: toolbarOptions }}
                      tooltip={true}
                      onBlur={() => {
                        setFieldTouched("h1Title", true);
                        if (isEmpty) {
                          setFieldValue("h1Title", "");
                        }
                      }}
                    />
                    <RequiredWrapper>
                      {touched.h1Title && errors.h1Title && (
                        <ErrorMessage name="h1Title" />
                      )}
                    </RequiredWrapper>
                  </QuillFieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Offer Image</Label>
                  <FieldContainer>
                    <ChooseContainer>
                      <ChooseFile name="offerImg" type="file" />
                      <UploadInstruction>
                        Max size 2MB and resolution is 150x150 px
                      </UploadInstruction>
                    </ChooseContainer>
                    <RequiredWrapper>
                      <ErrorMessage name="offerImg" />
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
                  <Label>Offer Amount in $</Label>
                  <FieldContainer>
                    <InputField name="offerAmount" placeholder="Offer amount" />
                    <RequiredWrapper>
                      <ErrorMessage name="offerAmount" />
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
                  <Label>Offer Short Description</Label>
                  <FieldContainer>
                    <TextAreaField
                      name="offerShortDescription"
                      placeholder="Offer Short Description"
                      rows={3}
                      onChange={(e) =>
                        setFieldValue("offerShortDescription", e.target.value)
                      }
                      onBlur={() => setFieldTouched("offerShortDescription", true)}
                      value={values.offerShortDescription}
                    />
                    <RequiredWrapper>
                      {touched.offerShortDescription && errors.offerShortDescription && (
                        <ErrorMessage name="offerShortDescription" />
                      )}
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Offer Long Description</Label>
                  <QuillFieldContainer>
                    <StyledReactQuill
                      theme="snow"
                      value={longDescriptionValue}
                      onChange={(content) => {
                        setLongDescriptionValue(content);
                        setFieldValue("offerLongDescription", content);
                        setIsEmpty(content === "<p><br></p>");
                      }}
                      modules={{ toolbar: toolbarOptions }}
                      tooltip={true}
                      onBlur={() => {
                        setFieldTouched("offerLongDescription", true);
                        if (isEmpty) {
                          setFieldValue("offerLongDescription", "");
                        }
                      }}
                    />
                    <RequiredWrapper>
                      {touched.offerLongDescription && errors.offerLongDescription && (
                        <ErrorMessage name="offerLongDescription" />
                      )}
                    </RequiredWrapper>
                  </QuillFieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Is Active</Label>
                  <FieldContainer>
                    <FieldWrapper style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                      <RdioWrapper>
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
                      </RdioWrapper>
                    </FieldWrapper>
                    <RequiredWrapper>
                      <ErrorMessage name="isActive" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Is Hot Offer</Label>
                  <FieldContainer>
                    <FieldWrapper style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                      <RdioWrapper>
                        <div>
                          <Field
                            type="radio"
                            name="isHotOffer"
                            value="true"
                            id="isHotOfferYes"
                          />
                          <RadioLabel htmlFor="isHotOfferYes">Yes</RadioLabel>
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="isHotOffer"
                            value="false"
                            id="isHotOfferNo"
                          />
                          <RadioLabel htmlFor="isHotOfferNo">No</RadioLabel>
                        </div>
                      </RdioWrapper>
                    </FieldWrapper>
                    <RequiredWrapper>
                      <ErrorMessage name="isHotOffer" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Hot Offer For</Label>
                  <FieldContainer>
                    <FieldWrapper style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                      <RdioWrapper>
                        <div>
                          <Field
                            type="radio"
                            name="hotOfferFor"
                            value="hotOfferForWeb"
                            id="hotOfferForWeb"
                          />
                          <RadioLabel htmlFor="hotOfferForWeb">Web</RadioLabel>
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="hotOfferFor"
                            value="hotOfferForMobile"
                            id="hotOfferForMobile"
                          />
                          <RadioLabel htmlFor="hotOfferForMobile">Mobile</RadioLabel>
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="hotOfferFor"
                            value="hotOfferForBoth"
                            id="hotOfferForBoth"
                          />
                          <RadioLabel htmlFor="hotOfferForBoth">Both</RadioLabel>
                        </div>
                      </RdioWrapper>
                    </FieldWrapper>
                    <RequiredWrapper>
                      <ErrorMessage name="hotOfferFor" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>App Installation</Label>
                  <FieldContainer>
                    <FieldWrapper style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                      <RdioWrapper >
                        <div>
                          <Field
                            type="radio"
                            name="appInstallation"
                            value="false"
                            id="appInstallationNo"
                          />
                          <RadioLabel htmlFor="appInstallationNo">No</RadioLabel>
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="appInstallation"
                            value="true"
                            id="appInstallationYes"
                          />
                          <RadioLabel htmlFor="appInstallationYes">
                            Yes
                          </RadioLabel>
                        </div>

                      </RdioWrapper>
                    </FieldWrapper>
                    <RequiredWrapper>
                      <ErrorMessage name="appInstallation" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Conversion Callback Type</Label>
                  <FieldContainer>
                    <FieldWrapper style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                      <RdioWrapper>
                        <div>
                          <Field
                            type="radio"
                            name="callbackType"
                            value="false"
                            id="callbackTypeYes"
                          />
                          <RadioLabel htmlFor="callbackTypeYes">Remove from dashboard without conversion</RadioLabel>
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="callbackType"
                            value="true"
                            id="callbackTypeNo"
                          />
                          <RadioLabel htmlFor="callbackTypeNo">Remove from dashboard with conversion</RadioLabel>
                        </div>
                      </RdioWrapper>
                    </FieldWrapper>
                    <RequiredWrapper>
                      <ErrorMessage name="callbackType" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Daily repeated offer</Label>
                  <FieldWrapper>
                    <RdioWrapper >
                      <div>
                        <Field
                          type="radio"
                          name="repeatedOffer"
                          value="false"
                          id="repeatedOfferNo"
                        />
                        <RadioLabel htmlFor="repeatedOfferNo">No</RadioLabel>
                      </div>
                      <div>
                        <Field
                          type="radio"
                          name="repeatedOffer"
                          value="true"
                          id="repeatedOfferYes"
                        />
                        <RadioLabel htmlFor="repeatedOfferYes">
                          Yes
                        </RadioLabel>
                      </div>

                    </RdioWrapper>
                  </FieldWrapper>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Relist Offer</Label>
                  <FieldContainer style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                    <Checkbox
                      name="relistOffer"
                      checked={values.relistOffer}
                      onChange={(e) => setFieldValue("relistOffer", e.target.checked)}
                    >
                      Relist Offer
                    </Checkbox>
                    <RequiredWrapper>
                      <ErrorMessage name="relistOffer" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Offer created for</Label>
                  <SelectFieldWrapper>
                    <SelectField
                      placeholder="Select user"
                      defaultValue={initialValues.offerCreatedFor}
                      style={{
                        width: "100%",
                        marginBottom: "3px",
                      }}
                      value={values.offerCreatedFor || null}
                      onChange={(value) => setFieldValue('offerCreatedFor', value)}
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
                      ]}
                    />
                    <RequiredWrapper>
                      <ErrorMessage name="offerCreatedFor" />
                    </RequiredWrapper>
                  </SelectFieldWrapper>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Select offer url type</Label>
                  <FieldContainer style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                    <Checkbox
                      checked={values.urlType}
                      onChange={(e) => setFieldValue("urlType", e.target.checked)}
                    >
                      is static URL
                    </Checkbox>
                    <RequiredWrapper>
                      <ErrorMessage name="relistOffer" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                {!values.urlType && (<FieldWrapper>
                  <Label>Custom Postback Params</Label>
                  <FieldContainer>
                    <InputField
                      name="customPostbaclParams"
                      placeholder="custom postback params
"
                    />
                    <RequiredWrapper>
                      <ErrorMessage name="customPostbaclParams" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>)}

                <FieldWrapper>
                  <Label>Offer Country Code</Label>
                  <FieldContainer>
                    <ChooseCountry>
                      <SelectField
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        value={values.countries}
                        onChange={(value) => setFieldValue("countries", value)}
                        options={options}
                      />
                      <Checkbox
                        checked={selectAll}
                        onChange={(e) => {
                          const { checked } = e.target;
                          setSelectAll(checked);
                          const allCountries = options.map(
                            (option) => option.value
                          );
                          setFieldValue(
                            "countries",
                            checked ? allCountries : []
                          );
                        }}
                      >
                        Select all country
                      </Checkbox>
                      <RequiredWrapper>
                        <ErrorMessage name="countries" />
                      </RequiredWrapper>
                    </ChooseCountry>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Daily CAP limit for offer</Label>
                  <FieldContainer>
                    <InputField
                      name="capLimit"
                      placeholder="Offer Title
"
                    />
                    <RequiredWrapper>
                      <ErrorMessage name="capLimit" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Slect fraud user to unlisted from offer</Label>
                  <SelectFieldWrapper>
                    <SelectField
                      placeholder="Select user"
                      defaultValue={initialValues.fraudUser}
                      style={{
                        width: "100%",
                        marginBottom: "3px",
                      }}
                      value={values.fraudUser || null}
                      onChange={(value) => setFieldValue('fraudUser', value)}
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
                      ]}
                    />
                    <RequiredWrapper>
                      <ErrorMessage name="fraudUser" />
                    </RequiredWrapper>
                  </SelectFieldWrapper>
                </FieldWrapper>

              </InputWrapper>
              <Footer>
                <Button type="primary" danger >Reset</Button>
                <SubmitBtn type="primary" htmlType="submit">
                  Submit
                </SubmitBtn>
              </Footer>
            </Form>
          )}
        </Formik>
      </AnnouncementWrapper>
    </div>
  );
};

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
  background: #f7f7f7;
  margin: 0px;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: start;
  font-weight: 700;
  line-height: 17px;
  color: #666666;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
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
  gap: 10px;
  width: 100%;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
    gap: 0px;
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
  &.ant-input:focus,
  &.ant-input-focused,
  &.ant-input:hover {
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

    &:hover,
    &:focus {
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
  text-align:left;
`;

const ChooseFile = styled(Field)`
  width: -webkit-fill-available;
  padding: 15px 0px 5px 0px;
  font-size: 14px;
  color: #666;
  border-radius: 5px;
  outline: none;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    padding: 0px 0px 5px 0px;
  }
`;
const UploadInstruction = styled.p`
  font-weight: 400;
  line-height: 17px;
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 0.5rem;
  margin-top: 0px;
  font-size: 14px;
  text-align: start;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`;

const ChooseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const ResetButton = styled(Button)`
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
`;

const SubmitBtn = styled(Button)`
  color: ${({ theme }) => theme?.primaryColor};
  background: ${({ theme }) => theme?.secondaryColor};
  border: none;
`;
const RequiredWrapper = styled.div`
  color: red;
  text-align: left;
  margin-bottom: 1rem;
`;

const FieldContainer = styled.div`
  width: 100%;
`;
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
align-items: flex-start;
`

const SelectFieldWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
width: 100%;
text-align: start;
`