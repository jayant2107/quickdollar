import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Select } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addOffer, getAllGeoCodes, getAllUser } from '../../../Services/Collection';
import { toast } from "react-toastify";
import Loader from '../../../Components/Loader/Loader'
const AddOffer = () => {

  const initialValues = {
    offerTitle: "",
    h1Title: "",
    offerImage: null,
    offerLink: '',
    offerPoints: "",
    offerText: "",
    offerShortDescription: '',
    offerLongDescription: '',
    offerPlatform: '',
    offerCountry: [],
    fraudUser: [],
    dailyCAPLimit: "",
    customPostbaclParams: '',
    isActive: "false",
    isHotOffer: "false",
    hotOfferFor: 'hotOfferForWeb',
    app_install: 'false',
    conversionCallback: 'false',
    isDailyOffer: 'false',
    relistOffer: false,
    StaticURL: false,
  };

  const [geoCodes, setGeoCodes] = useState([]);
  const [offerImgPreview, setOfferImgPreview] = useState(null);
  const offerImgInputRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

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
    offerTitle: yup.string().required("Title is Required"),
    h1Title: yup.string().required('H1 title is required'),
    offerImage: yup.mixed()
      .required('Offer image is required')
      .test(
        'fileType',
        'Only image files are allowed',
        (value) => {
          if (value) {
            return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
          }
          return true;
        }
      )
      .test(
        'fileSize',
        'File size must be less than 2MB',
        (value) => {
          if (value) {
            return value.size <= 2 * 1024 * 1024;
          }
          return true;
        }
      ),
    offerLink: yup.string().required('Offer Link is required'),
    offerPoints: yup.string().required('Offer amount is required').test(
      'is-number',
      'Enter number only',
      value => !isNaN(value) && Number.isInteger(parseFloat(value))
    ),
    offerText: yup.string().required('Offer Text is required'),
    offerShortDescription: yup.string().required('Offer Short Description is required'),
    offerLongDescription: yup.string().required('Offer Long Description is required'),
    offerPlatform: yup.string().required('Offer Created is required'),
    customPostbaclParams: yup.string(),
    offerCountry: yup.array().min(1, 'Countries are required').required('Countries are required'),
    dailyCAPLimit: yup.string().required('Cap Limit  is required').test(
      'is-number',
      'Enter number only',
      value => !isNaN(value) && Number.isInteger(parseFloat(value))
    ),
  });

  const handleSubmit = async (values, { resetForm, setFieldValue }) => {
    const formData = new FormData();
    formData.append("offerTitle", values?.offerTitle);
    formData.append("h1Title", values?.h1Title);
    formData.append("offerImage", values?.offerImage);
    formData.append("offerLink", values?.offerLink);
    formData.append("offerPoints", values?.offerPoints);
    formData.append("offerText", values?.offerText);
    formData.append("offerShortDescription", values?.offerShortDescription);
    formData.append("offerLongDescription", values?.offerLongDescription);
    formData.append("offerPlatform", values?.offerPlatform);
    formData.append("offerCountry", values?.offerCountry);
    // formData.append("offerCountry", values.offerCountry);
    formData.append("fraudUser", values?.fraudUser);
    formData.append("dailyCAPLimit", values?.dailyCAPLimit);
    formData.append("customPostbaclParams", values?.customPostbaclParams);
    formData.append("isActive", values?.isActive);
    formData.append("isHotOffer", values?.isHotOffer);
    formData.append("hotOfferFor", values?.hotOfferFor);
    formData.append("app_install", values?.app_install);
    formData.append("conversionCallback", values?.conversionCallback);
    formData.append("isDailyOffer", values?.isDailyOffer);
    formData.append("relistOffer", values?.relistOffer ? "true" : "false");
    formData.append("StaticURL", values?.StaticURL ? "true" : "false");
    try {
      setLoader(true)
      const res = await addOffer(formData);
      setLoader(false)
      if (res?.status === 200) {
        toast.success("Add Offer successfully");
        setFieldValue("additionalText", "");
        resetForm();
        setOfferImgPreview(null);
        setH1TitleValue("");
        setLongDescriptionValue("")
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

  // const fetchUsers = async () => {
  //   try {
  //     const res = await getAllUser();
  //     if (res?.status === 200) {
  //       setUserData(res?.data?.findUsers);
  //     } else {
  //       let message =
  //         res?.response?.data?.message ||
  //         res?.message ||
  //         res?.error ||
  //         "Something went wrong";
  //       setUserData([]);
  //       toast.error(message);
  //     }
  //   } catch (error) {
  //     console.log(error, "error");
  //     toast.error(error?.message || "Something went wrong");
  //   } 
  // };

  const [selectAll, setSelectAll] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [h1TitleValue, setH1TitleValue] = useState("");
  const [longDescriptionValue, setLongDescriptionValue] = useState("");

  const handleReset = (resetForm) => {
    resetForm();
    setH1TitleValue("");
    setLongDescriptionValue("");
    setOfferImgPreview(null);
  };

  const options = geoCodes.map(jsonData => ({
    label: `${jsonData?.country} (${jsonData?.iso_code_2})`,
    value: `${jsonData?.country} (${jsonData?.iso_code_2})`,
  }));

  // const userOptions = userData.map((data) => ({
  //   label: `${data?.firstName} ${data?.lastName}`,
  //   value: `${data?.firstName} ${data?.lastName}`,
  // }))

  useEffect(() => {
    fetchGeoCordData();
    // fetchUsers();
  }, [])

  const handleFileChange = (e, setFieldValue, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue(e.target.name, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  document.title="Add Offer - Login - quickdollarapp";

  return (
    <div>
      <Header>Add Offer</Header>
      <AnnouncementWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, touched, errors, setFieldTouched, resetForm }) => (
            <Form>
              <InputWrapper>
                <FieldWrapper>
                  <Label><Asterisk>*</Asterisk>Offer Title</Label>
                  <FieldContainer>
                    <InputField
                      name="offerTitle"
                      placeholder="Offer Title
"
                    />
                    <RequiredWrapper>
                      <ErrorMessage name="offerTitle" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label><Asterisk>*</Asterisk>Offer H1 Title</Label>
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
                  <Label><Asterisk>*</Asterisk>Offer Image</Label>
                  <FieldContainer>
                    <ChooseContainer>
                      <UploadButton onClick={() => offerImgInputRef.current.click()}>Upload</UploadButton>
                      <input
                        ref={offerImgInputRef}
                        name="offerImage"
                        type="file"
                        onChange={(e) =>
                          handleFileChange(e, setFieldValue, setOfferImgPreview)
                        }
                        style={{ display: "none" }}
                      />
                      <UploadInstruction>Max size 2MB and resolution is 150x150 px</UploadInstruction>
                      {offerImgPreview && <Image src={offerImgPreview} alt="Offer Preview" />}
                    </ChooseContainer>
                    <RequiredWrapper>
                      <ErrorMessage name="offerImage" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label><Asterisk>*</Asterisk>Offer Link</Label>
                  <FieldContainer>
                    <InputField name="offerLink" placeholder="Offer link" />
                    <RequiredWrapper>
                      <ErrorMessage name="offerLink" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label><Asterisk>*</Asterisk>Offer Amount in $</Label>
                  <FieldContainer>
                    <InputField name="offerPoints" placeholder="Offer amount" />
                    <RequiredWrapper>
                      <ErrorMessage name="offerPoints" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label><Asterisk>*</Asterisk>Offer Text</Label>
                  <FieldContainer>
                    <InputField name="offerText" placeholder="Offer text" />
                    <RequiredWrapper>
                      <ErrorMessage name="offerText" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label><Asterisk>*</Asterisk>Offer Short Description</Label>
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
                  <Label><Asterisk>*</Asterisk>Offer Long Description</Label>
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
                    <FieldWrapper >
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
                    <FieldWrapper >
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
                    <FieldWrapper >
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
                    <FieldWrapper >
                      <RdioWrapper >
                        <div>
                          <Field
                            type="radio"
                            name="app_install"
                            value="false"
                            id="app_installNo"
                          />
                          <RadioLabel htmlFor="app_installNo">No</RadioLabel>
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="app_install"
                            value="true"
                            id="app_installYes"
                          />
                          <RadioLabel htmlFor="app_installYes">
                            Yes
                          </RadioLabel>
                        </div>

                      </RdioWrapper>
                    </FieldWrapper>
                    <RequiredWrapper>
                      <ErrorMessage name="app_install" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Conversion Callback Type</Label>
                  <FieldContainer>
                    <FieldWrapper >
                      <RdioWrapper>
                        <div>
                          <Field
                            type="radio"
                            name="conversionCallback"
                            value="false"
                            id="conversionCallbackYes"
                          />
                          <RadioLabel htmlFor="conversionCallbackYes">Remove from dashboard without conversion</RadioLabel>
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="conversionCallback"
                            value="true"
                            id="conversionCallbackNo"
                          />
                          <RadioLabel htmlFor="conversionCallbackNo">Remove from dashboard with conversion</RadioLabel>
                        </div>
                      </RdioWrapper>
                    </FieldWrapper>
                    <RequiredWrapper>
                      <ErrorMessage name="conversionCallback" />
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
                          name="isDailyOffer"
                          value="false"
                          id="isDailyOfferNo"
                        />
                        <RadioLabel htmlFor="isDailyOfferNo">No</RadioLabel>
                      </div>
                      <div>
                        <Field
                          type="radio"
                          name="isDailyOffer"
                          value="true"
                          id="isDailyOfferYes"
                        />
                        <RadioLabel htmlFor="isDailyOfferYes">
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
                  <Label><Asterisk>*</Asterisk>Offer created for</Label>
                  <SelectFieldWrapper>
                    <SelectField
                      placeholder="Select users"
                      defaultValue={initialValues.offerPlatform}
                      style={{
                        width: "100%",
                        marginBottom: "3px",
                      }}
                      value={values.offerPlatform || null}
                      onChange={(value) => setFieldValue('offerPlatform', value)}
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
                      <ErrorMessage name="offerPlatform" />
                    </RequiredWrapper>
                  </SelectFieldWrapper>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Select offer url type</Label>
                  <FieldContainer style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center" }}>
                    <Checkbox
                      checked={values.StaticURL}
                      onChange={(e) => setFieldValue("StaticURL", e.target.checked)}
                    >
                      is static URL
                    </Checkbox>
                    <RequiredWrapper>
                      <ErrorMessage name="relistOffer" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                {!values.StaticURL && (<FieldWrapper>
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
                  <Label><Asterisk>*</Asterisk>Offer Country Code</Label>
                  <FieldContainer>
                    <ChooseCountry>
                      <SelectField
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Select geo code"
                        value={values.offerCountry}
                        onChange={(value) => setFieldValue("offerCountry", value)}
                        options={options}
                      />
                      <Checkbox
                        checked={selectAll}
                        onChange={(e) => {
                          const { checked } = e.target;
                          setSelectAll(checked);
                          const offerCountry = options.map(
                            (option) => option.value
                          );
                          setFieldValue(
                            "offerCountry",
                            checked ? offerCountry : []
                          );
                        }}
                      >
                        Select all country
                      </Checkbox>
                      <RequiredWrapper>
                        <ErrorMessage name="offerCountry" />
                      </RequiredWrapper>
                    </ChooseCountry>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label><Asterisk>*</Asterisk>Daily CAP limit for offer</Label>
                  <FieldContainer>
                    <InputField
                      name="dailyCAPLimit"
                      placeholder="Daily cap limit
"
                    />
                    <RequiredWrapper>
                      <ErrorMessage name="dailyCAPLimit" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Select fraud user to unlisted from offer</Label>
                  <FieldContainer>
                    <InputField
                      name="fraudUser"
                      placeholder="Fraud user
"
                    />
                    {/* <ChooseCountry>
                      <SelectField
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Search for a user"
                        value={values?.fraudUser}
                        onChange={(value) =>
                          setFieldValue("fraudUser", value)
                        }
                        options={userOptions}
                      />
                    </ChooseCountry> */}
                  </FieldContainer>
                </FieldWrapper>

              </InputWrapper>
              <Footer>
                <Button type="primary" danger onClick={() => handleReset(resetForm)}>Reset</Button>
                <SubmitBtn type="primary" htmlType="submit">
                  Submit{loader ? <Loader /> : ""}
                </SubmitBtn>
              </Footer>
            </Form>
          )}
        </Formik>
      </AnnouncementWrapper>
    </div>
  );
};

export default AddOffer;

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
  align-items: start;
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
@media only screen and (min-width: 320px) and (max-width: 480px) {
  display: flex ;
  flex-direction: inherit !important;
gap: 7px;
margin-bottom: 15px;
align-items: flex-start;
}
`

const SelectFieldWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
width: 100%;
text-align: start;
`

const UploadButton = styled(Button)`
color: black;
background: white;
width: 40%;
height: 35px;
border: 1px solid black;
margin-bottom: 1rem;
`


const Image = styled.img`
width: 120px;
height: 120px;
object-fit: contain;
`

const Asterisk = styled.span`
color: red
`