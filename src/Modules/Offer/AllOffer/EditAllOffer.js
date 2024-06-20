import React, { useEffect, useState, useRef } from "react";
import { Button, Checkbox, Select } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  editOffers,
  getAllDropdownUsers,
  getAllGeoCodes,
  getUserAndLink,
} from "../../../Services/Collection";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
import { debounce } from "../../../Utils/CommonFunctions";

const offerLocationOptions = [
  {
    label: "preHomeScreen",
    value: "1",
  },
  {
    label: "offerWall",
    value: "2",
  },
  {
    label: "homeScreen",
    value: "3",
  },
  {
    label: "monthlySubscription",
    value: "4",
  },
  {
    label: "dailySurvey",
    value: "5",
  },
  {
    label: "download",
    value: "6",
  },
  {
    label: "coupons",
    value: "7",
  },
  {
    label: "shops",
    value: "8",
  },
];

const EditOffer = () => {
  const record = useSelector((state) => state.offerRecord.record);
  const { idOffer } = useParams();
  const navigate = useNavigate();

  const [geoCodes, setGeoCodes] = useState([]);
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionPage, setOptionsPage] = useState(1);
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState([]);
  const offerImgInputRef = useRef(null);
  const [selectAll, setSelectAll] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [userAndLink, setUserAndLink] = useState([]);
  const [h1TitleValue, setH1TitleValue] = useState("");
  const [longDescriptionValue, setLongDescriptionValue] =
    useState("long description");
  const [flag, setFlag] = useState(false);
  const [offerImgPreview, setOfferImgPreview] = useState(record?.offerImage);
  const [offerImgError, setOfferImgError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allDropdownUsers, setAllDropdownUsers] = useState([]);
  const [optionsLoader, setOptionsLoader] = useState(false);
  const [allUserCount, setAllUserCount] = useState(0);

  const initialValues = {
    offerTitle: record?.offerTitle,
    offerLink: record?.offerLink,
    offerPoints: record?.offerPoints,
    offerImage: record?.offerImage,
    offerText: record?.offerText,
    offerShortDescription: record?.offerShortDescription,
    offerLongDescription: record?.offerLongDescription,
    offerCountry: record?.offerCountry?.split(","),
    fraudUser: record?.fraudUser?.split(","),
    dailyCAPLimit: record?.dailyCAPLimit,
    isActive: record?.isActive?.toString(),
    app_install: record?.app_install?.toString(),
    conversionCallback: record?.conversionCallback.toString(),
    isDailyOffer: record?.isDailyOffer?.toString(),
    relistOffer: record?.relistOffer?.toString(),
    StaticURL: record?.StaticURL?.toString(),
    displaylocation: record?.displaylocation?.split(","),
    offerPlatform: record?.offerPlatform?.toString(),
    OfferCreatedFor: record?.OfferCreatedFor,
    offerH1Title: record?.offerH1Title,
    SelectPlatFormForOffer: record?.SelectPlatFormForOffer?.split(","),
    customPostbackParams: record?.customPostbackParams,
    isHotOffer: record?.isHotOffer?.toString(),
    HotOfFerFor: record?.HotOfFerFor?.toString(),
    user: "",
    userOfferUrl: "",
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
    offerTitle: yup.string().required("Title is Required"),
    offerH1Title: yup.string().required("H1 title is required"),
    offerLink: yup.string().required("Offer Link is required"),
    offerPoints: yup.number().nullable(),
    offerText: yup.string().nullable(),
    offerShortDescription: yup
      .string()
      .required("Offer Short Description is required"),
    offerLongDescription: yup
      .string()
      .required("Offer Long Description is required"),
    OfferCreatedFor: yup.string().required("Offer Created is required"),
    offerCountry: yup
      .array()
      .of(yup.string())
      .min(1, "Select at least one country"),
  });

  const handleSubmit = async (
    values,
    { resetForm, setFieldValue, setErrors }
  ) => {
    try {
      if (!values?.offerPoints && !values?.offerText) {
        setErrors({ offerText: "Offer Text is required" });
      } else {
        const formData = new FormData();
        formData.append("idOffer", idOffer);
        formData.append("offerTitle", values?.offerTitle);
        formData.append("offerLink", values?.offerLink);
        formData.append("offerPoints", values?.offerPoints);
        formData.append("offerShortDescription", values?.offerShortDescription);
        formData.append("isActive", values?.isActive);
        formData.append("app_install", values?.app_install);
        formData.append("dailyCAPLimit", values?.dailyCAPLimit);
        formData.append("conversionCallback", values?.conversionCallback);
        formData.append("offerCountry", values?.offerCountry);
        formData.append("isDailyOffer", values?.isDailyOffer);
        formData.append("StaticURL", values?.StaticURL);
        formData.append("displaylocation", values?.displaylocation);
        formData.append("offerPlatform", values?.offerPlatform);
        formData.append("offerLongDescription", values?.offerLongDescription);
        formData.append("offerH1Title", values?.offerH1Title);
        formData.append("OfferCreatedFor", values?.OfferCreatedFor);
        formData.append("user", values?.user);
        formData.append("userOfferUrl", values?.userOfferUrl);
        formData.append(
          "SelectPlatFormForOffer",
          values?.SelectPlatFormForOffer
        );
        formData.append("customPostbackParams", values?.customPostbackParams);
        formData.append("fraudUser", values?.fraudUser);
        formData.append("isHotOffer", values?.isHotOffer);
        formData.append("HotOfFerFor", values?.HotOfFerFor);
        formData.append("offerText", values?.offerText);
        if (flag) {
          formData.append("offerImage", values?.offerImage);
        }

        setLoader(true);
        const res = await editOffers(formData);
        setLoader(false);
        if (res?.status === 200) {
          toast.success("Edited Offer successfully");
          navigate("/quickdollar/offer/alloffers");
          setFieldValue("additionalText", "");
          resetForm();
          setH1TitleValue("");
          setLongDescriptionValue("");
        } else {
          let message =
            res?.response?.data?.message ||
            res?.message ||
            res?.error ||
            "Something went wrong";
          toast.error(message);
        }
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const fetchGeoCordData = async () => {
    try {
      const res = await getAllGeoCodes();
      if (res?.status === 200) {
        setGeoCodes(res?.data);
      } else {
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
        toast.error(message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const fetchdropDownUsers = async (page, search) => {
    try {
      setOptionsLoader(true);
      let params = new URLSearchParams();
      params.append("page", page ?? optionPage);
      params.append("limit", 50);
      search && params.append("search", search);
      const res = await getAllDropdownUsers(params);
      if (res?.status === 200) {
        setOptionsLoader(false);
        setAllUserCount(res?.data?.count);
        let filteredArray = [];
        res?.data?.users?.map((data) => {
          filteredArray.push({
            label: `${data?.firstName} ${data?.lastName}`,
            value: `${data?.idUser}`,
          });
        });
        if (optionPage === 1 || page === 1) {
          setAllDropdownUsers(filteredArray);
        } else {
          setAllDropdownUsers([...allDropdownUsers, ...filteredArray]);
        }
      } else {
        setOptionsLoader(false);
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
        toast.error(message);
      }
    } catch (error) {
      setOptionsLoader(false);
      toast.error(error?.message || "Something went wrong");
    }
  };

  const fetchUsersandLinks = async () => {
    const params = new URLSearchParams();
    params.append("id", selectedUser);
    try {
      const res = await getUserAndLink(params);
      if (res?.status === 200) {
        setUserAndLink(res?.data);
      } else {
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
        toast.error(message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - Math.round(scrollTop) === clientHeight) {
      if (allUserCount > allDropdownUsers?.length) {
        setOptionsPage(optionPage + 1);
      }
    }
  };

  const handleSearchDebounced = debounce(async (value) => {
    setSearch(value);
    fetchdropDownUsers(1, value);
    // fetchUsersandLinks(value)
  });

  const handleReset = (resetForm) => {
    resetForm();
    setH1TitleValue("");
    setLongDescriptionValue("");
    setOfferImgPreview(null);
  };

  const validateFile = (file) => {
    if (!file) return "File is required";
    if (file.size > 2000000) return "File too large";
    if (
      ![
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ].includes(file.type)
    )
      return "Unsupported format, only jpg, jpeg, png and gif are supported";
    return null;
  };

  const handleFileChange = (e, setFieldValue, setPreview) => {
    const file = e.target.files[0];
    const error = validateFile(file);
    if (error) {
      setOfferImgError(error);
      setOfferImgPreview(null);
    } else {
      setOfferImgError(null);
      setFieldValue(e.target.name, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFlag(true);
      };
      reader.readAsDataURL(file);
    }
    // Reset the input value to allow the same file to be selected again
    offerImgInputRef.current.value = null;
  };

  const optionsGeo = geoCodes?.map((jsonData) => ({
    label: `${jsonData?.country}- ${jsonData?.iso_code_2}`,
    value: `${jsonData?.iso_code_2}`,
  }));

  useEffect(() => {
    fetchGeoCordData();
  }, []);

  useEffect(() => {
    fetchdropDownUsers();
  }, [optionPage]);

  useEffect(() => {
    if (selectedUser) {
      fetchUsersandLinks();
    }
  }, [selectedUser]);

  document.title = "Edit Offer - quickdollarapp";

  return (
    <div>
      <Header>Edit Offer</Header>
      <AnnouncementWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            setFieldValue,
            touched,
            errors,
            setFieldTouched,
            resetForm,
          }) => (
            <Form>
              <InputWrapper>
                <FieldWrapper>
                  <Label>
                    {" "}
                    <Asterisk>*</Asterisk>Offer Title
                  </Label>
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
                  <Label>
                    {" "}
                    <Asterisk>*</Asterisk>Offer H1 Title
                  </Label>
                  <QuillFieldContainer>
                    <StyledReactQuill
                      theme="snow"
                      value={values.offerH1Title}
                      onChange={(content) => {
                        setH1TitleValue(content);
                        setFieldValue("offerH1Title", content);
                        setIsEmpty(content === "<p><br></p>");
                      }}
                      modules={{ toolbar: toolbarOptions }}
                      tooltip={true}
                      onBlur={() => {
                        setFieldTouched("offerH1Title", true);
                        if (isEmpty) {
                          setFieldValue("offerH1Title", "");
                        }
                      }}
                    />
                    <RequiredWrapper>
                      {touched.offerH1Title && errors.offerH1Title && (
                        <ErrorMessage name="offerH1Title" />
                      )}
                    </RequiredWrapper>
                  </QuillFieldContainer>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Offer Image</Label>
                  <FieldContainer>
                    <ChooseContainer>
                      <UploadButton
                        onClick={() => offerImgInputRef.current.click()}
                      >
                        Upload
                      </UploadButton>
                      <input
                        ref={offerImgInputRef}
                        name="offerImage"
                        type="file"
                        onChange={(e) =>
                          handleFileChange(e, setFieldValue, setOfferImgPreview)
                        }
                        style={{ display: "none" }}
                      />
                      <UploadInstruction>
                        Max size 2MB and resolution is 150x150 px
                      </UploadInstruction>
                      {offerImgPreview && (
                        <Image src={offerImgPreview} alt="Offer Preview" />
                      )}
                      {offerImgError && <ErrorText>{offerImgError}</ErrorText>}
                    </ChooseContainer>
                  </FieldContainer>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>
                    <Asterisk>*</Asterisk>Offer Link
                  </Label>
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
                    <InputField name="offerPoints" placeholder="Offer amount" />
                    <RequiredWrapper>
                      <ErrorMessage name="offerPoints" />
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
                  <Label>
                    <Asterisk>*</Asterisk>Offer Short Description
                  </Label>
                  <FieldContainer>
                    <TextAreaField
                      name="offerShortDescription"
                      placeholder="Offer Short Description"
                      rows={3}
                      onChange={(e) =>
                        setFieldValue("offerShortDescription", e.target.value)
                      }
                      onBlur={() =>
                        setFieldTouched("offerShortDescription", true)
                      }
                      value={values.offerShortDescription}
                    />
                    <RequiredWrapper>
                      {touched.offerShortDescription &&
                        errors.offerShortDescription && (
                          <ErrorMessage name="offerShortDescription" />
                        )}
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>
                    <Asterisk>*</Asterisk>Offer Long Description
                  </Label>
                  <QuillFieldContainer>
                    <StyledReactQuill
                      theme="snow"
                      value={values.offerLongDescription}
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
                      {touched.offerLongDescription &&
                        errors.offerLongDescription && (
                          <ErrorMessage name="offerLongDescription" />
                        )}
                    </RequiredWrapper>
                  </QuillFieldContainer>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Is Active</Label>
                  <FieldContainer>
                    <FieldWrapper
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <RdioWrapper>
                        <RadioWrapper>
                          <Field
                            type="radio"
                            name="isActive"
                            value="true"
                            id="isActiveYes"
                          />
                          <RadioLabel htmlFor="isActiveYes">Yes</RadioLabel>
                        </RadioWrapper>
                        <RadioWrapper>
                          <Field
                            type="radio"
                            name="isActive"
                            value="false"
                            id="isActiveNo"
                          />
                          <RadioLabel htmlFor="isActiveNo">No</RadioLabel>
                        </RadioWrapper>
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
                    <FieldWrapper
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <RdioWrapper>
                        <RadioWrapper>
                          <Field
                            type="radio"
                            name="isHotOffer"
                            value="1"
                            id="isHotOfferYes"
                          />
                          <RadioLabel htmlFor="isHotOfferYes">Yes</RadioLabel>
                        </RadioWrapper>
                        <RadioWrapper>
                          <Field
                            type="radio"
                            name="isHotOffer"
                            value="0"
                            id="isHotOfferNo"
                          />
                          <RadioLabel htmlFor="isHotOfferNo">No</RadioLabel>
                        </RadioWrapper>
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
                    <FieldWrapper
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <RdioWrapper>
                        <RadioWrapper>
                          <Field
                            type="radio"
                            name="HotOfFerFor"
                            value="1"
                            id="1"
                          />
                          <RadioLabel htmlFor="hotOfferForWeb">Web</RadioLabel>
                        </RadioWrapper>
                        <RadioWrapper>
                          <Field
                            type="radio"
                            name="HotOfFerFor"
                            value="2"
                            id="2"
                          />
                          <RadioLabel htmlFor="hotOfferForMobile">
                            Mobile
                          </RadioLabel>
                        </RadioWrapper>
                        <RadioWrapper>
                          <Field
                            type="radio"
                            name="HotOfFerFor"
                            value="3"
                            id="3"
                          />
                          <RadioLabel htmlFor="hotOfferForBoth">
                            Both
                          </RadioLabel>
                        </RadioWrapper>
                      </RdioWrapper>
                    </FieldWrapper>
                    <RequiredWrapper>
                      <ErrorMessage name="HotOfFerFor" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>App Installation</Label>
                  <FieldContainer>
                    <FieldWrapper
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <RdioWrapper>
                        <RadioWrapper>
                          <Field
                            type="radio"
                            name="app_install"
                            value="true"
                            id="app_installYes"
                          />
                          <RadioLabel htmlFor="app_installYes">Yes</RadioLabel>
                        </RadioWrapper>
                        <RadioWrapper>
                          <Field
                            type="radio"
                            name="app_install"
                            value="false"
                            id="app_installNo"
                          />
                          <RadioLabel htmlFor="app_installNo">No</RadioLabel>
                        </RadioWrapper>
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
                    <FieldWrapper
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <RdioWrapper>
                        <RadioWrapper>
                          <RadioStyle
                            type="radio"
                            name="conversionCallback"
                            value="true"
                            id="conversionCallbackNo"
                          />
                          <RadioLabel htmlFor="conversionCallbackNo">
                            Remove from dashboard with conversion
                          </RadioLabel>
                        </RadioWrapper>
                        <RadioWrapper>
                          <RadioStyle
                            type="radio"
                            name="conversionCallback"
                            value="false"
                            id="conversionCallbackYes"
                          />
                          <RadioLabel htmlFor="conversionCallbackYes">
                            Remove from dashboard without conversion
                          </RadioLabel>
                        </RadioWrapper>
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
                    <RdioWrapper>
                      <RadioWrapper>
                        <Field
                          type="radio"
                          name="isDailyOffer"
                          value="true"
                          id="isDailyOfferYes"
                        />
                        <RadioLabel htmlFor="isDailyOfferYes">Yes</RadioLabel>
                      </RadioWrapper>
                      <RadioWrapper>
                        <Field
                          type="radio"
                          name="isDailyOffer"
                          value="false"
                          id="isDailyOfferNo"
                        />
                        <RadioLabel htmlFor="isDailyOfferNo">No</RadioLabel>
                      </RadioWrapper>
                    </RdioWrapper>
                  </FieldWrapper>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Relist Offer</Label>
                  <FieldContainer
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <Checkbox
                      name="relistOffer"
                      checked={values.relistOffer}
                      onChange={(e) =>
                        setFieldValue("relistOffer", e.target.checked)
                      }
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
                      defaultValue={initialValues.OfferCreatedFor}
                      style={{
                        width: "100%",
                        marginBottom: "3px",
                      }}
                      value={values.OfferCreatedFor || null}
                      onChange={(value) =>
                        setFieldValue("OfferCreatedFor", value)
                      }
                      options={[
                        {
                          value: "0",
                          label: "IOS",
                        },
                        {
                          value: "1",
                          label: "Android",
                        },
                        {
                          value: "2",
                          label: "All Users",
                        },
                      ]}
                    />
                    <RequiredWrapper>
                      <ErrorMessage name="OfferCreatedFor" />
                    </RequiredWrapper>
                  </SelectFieldWrapper>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Offer Platform</Label>
                  <FieldWrapper>
                    <RdioWrapper>
                      <RadioWrapper>
                        <Field
                          type="radio"
                          name="offerPlatform"
                          value="true"
                          id="shopOffer"
                        />
                        <RadioLabel htmlFor="shopOffer">shopOffer</RadioLabel>
                      </RadioWrapper>
                      <RadioWrapper>
                        <Field
                          type="radio"
                          name="offerPlatform"
                          value="false"
                          id="quickThoughts"
                        />
                        <RadioLabel htmlFor="quickThoughts">
                          quickThoughts
                        </RadioLabel>
                      </RadioWrapper>
                    </RdioWrapper>
                  </FieldWrapper>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Offer location to display</Label>
                  <Field name="displaylocation">
                    {({ field, form: { setFieldValue } }) => (
                      <FieldContainer style={{ display: "flex" }}>
                        <Checkbox.Group
                          className="checkboxGroup"
                          value={field.value}
                          options={offerLocationOptions}
                          onChange={(selectedValues) =>
                            setFieldValue("displaylocation", selectedValues)
                          }
                        />

                        <RequiredWrapper>
                          <ErrorMessage name="displaylocation" />
                        </RequiredWrapper>
                      </FieldContainer>
                    )}
                  </Field>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Select platform for offer</Label>
                  <Field name="SelectPlatFormForOffer">
                    {({ field, form: { setFieldValue } }) => (
                      <FieldContainer style={{ display: "flex" }}>
                        <Checkbox.Group
                          className="checkboxGroup"
                          value={field.value}
                          options={[
                            {
                              label: "Android-Application Group 1",
                              value: "1",
                            },
                            { label: "ios-Application Group 1", value: "2" },
                          ]}
                          onChange={(selectedValues) =>
                            setFieldValue(
                              "SelectPlatFormForOffer",
                              selectedValues
                            )
                          }
                        />

                        <RequiredWrapper>
                          <ErrorMessage name="SelectPlatFormForOffer" />
                        </RequiredWrapper>
                      </FieldContainer>
                    )}
                  </Field>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Select offer url type</Label>
                  <FieldContainer
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "center",
                    }}
                  >
                    <Checkbox
                      checked={values.StaticURL}
                      onChange={(e) =>
                        setFieldValue("StaticURL", e.target.checked)
                      }
                    >
                      is static URL
                    </Checkbox>
                    <RequiredWrapper>
                      <ErrorMessage name="StaticURL" />
                    </RequiredWrapper>
                  </FieldContainer>
                </FieldWrapper>
                {!values.StaticURL && (
                  <FieldWrapper>
                    <Label>Custom Postback Params</Label>
                    <FieldContainer>
                      <InputField
                        name="customPostbackParams"
                        placeholder="custom postback params
"
                      />
                      <RequiredWrapper>
                        <ErrorMessage name="customPostbackParams" />
                      </RequiredWrapper>
                    </FieldContainer>
                  </FieldWrapper>
                )}
                <FieldWrapper>
                  <Label>
                    <Asterisk>*</Asterisk>Offer Country Code
                  </Label>
                  <FieldContainer>
                    <ChooseCountry>
                      <SelectField
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Select geo code"
                        value={values.offerCountry}
                        onChange={(value) =>
                          setFieldValue("offerCountry", value)
                        }
                        options={optionsGeo}
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      />
                      <Checkbox
                        checked={selectAll}
                        onChange={(e) => {
                          const { checked } = e.target;
                          setSelectAll(checked);
                          const offerCountry = optionsGeo?.map(
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
                  <Label>Daily CAP limit for offer</Label>
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
                  <Label>Users</Label>
                  <SelectFieldWrapper>
                    <SelectField
                      showSearch
                      placeholder="Search for a user"
                      defaultValue={values.user}
                      style={{
                        width: "100%",
                        marginBottom: "3px",
                      }}
                      value={
                        allDropdownUsers.find(
                          (option) => allDropdownUsers.value === values.user
                        ) || null
                      }
                      onChange={(value) => {
                        setFieldValue("user", value);
                        setSelectedUser(value || null);
                      }}
                      onSearch={(value) => handleSearchDebounced(value)}
                      onBlur={(e) =>
                        optionPage === 1
                          ? fetchUsersandLinks()
                          : setOptionsPage(1)
                      }
                      filterOption={(input, option) =>
                        option?.label
                          ?.toLowerCase()
                          ?.indexOf(input?.toLowerCase()) >= 0
                      }
                      options={allDropdownUsers}
                      onPopupScroll={handleScroll}
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          {loading && (
                            <div
                              style={{ textAlign: "center", padding: "5px 0" }}
                            >
                              <Loader />
                            </div>
                          )}
                        </>
                      )}
                    />
                    <RequiredWrapper>
                      <ErrorMessage name="user" />
                    </RequiredWrapper>
                  </SelectFieldWrapper>
                </FieldWrapper>
                <FieldWrapper>
                  <Label>User Offer URL</Label>
                  <SelectFieldWrapper>
                    {values?.user == userAndLink?.findUsers?.idUser
                      ? userAndLink?.findlink?.offerLink
                      : `NA`}
                    <RequiredWrapper>
                      <ErrorMessage name="userOfferURL" />
                    </RequiredWrapper>
                  </SelectFieldWrapper>
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Select fraud user to unlisted from offer</Label>
                  <FieldContainer>
                    <ChooseCountry>
                      <SelectField
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Search for a user"
                        onPopupScroll={handleScroll}
                        onBlur={(e) =>
                          optionPage === 1
                            ? fetchdropDownUsers()
                            : setOptionsPage(1)
                        }
                        filterOption={(input, option) =>
                          option?.label
                            ?.toLowerCase()
                            ?.indexOf(input?.toLowerCase()) >= 0
                        }
                        onSearch={(value) => handleSearchDebounced(value)}
                        value={values.fraudUser}
                        onChange={(value) => setFieldValue("fraudUser", value)}
                        options={allDropdownUsers}
                      />
                      <RequiredWrapper>
                        <ErrorMessage name="fraudUser" />
                      </RequiredWrapper>
                    </ChooseCountry>
                  </FieldContainer>
                </FieldWrapper>
              </InputWrapper>
              <Footer>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleReset(resetForm)}
                >
                  Reset
                </Button>
                <SubmitBtn type="primary" htmlType="submit" disabled={loader}>
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

export default EditOffer;

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

const TableImageWrapper = styled.div`
  img {
    width: 100px;
    object-fit: contain;
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

  .checkboxGroup {
    flex-direction: column;
    align-self: start;
    label {
      margin-inline-start: 0;
    }
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

    .ant-select-selection-placeholder {
      color: rgb(102, 102, 102) !important;
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
  text-align: left;
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
  font-family: Poppins;
`;

const FieldContainer = styled.div`
  width: 100%;
`;

// Checkbox = styled.div`
//   width: 100%;
//   margin-left: 0px;
// `;

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
  width: 100%;
  text-align: left;
`;

const RdioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 15px;
  align-items: flex-start;
`;

const SelectFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  text-align: start;
`;

const UploadButton = styled(Button)`
  color: black;
  background: white;
  width: 40%;
  height: 35px;
  border: 1px solid black;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 5px;
`;

const ErrorText = styled.div`
  color: red;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
`;
const RadioStyle = styled(Field)`
  width: 4% !important;
`;

const Asterisk = styled.span`
  color: red;
`;
