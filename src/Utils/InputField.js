import { useField } from "formik";
import styled from "styled-components";

export default function InputField(props) {
  // eslint-disable-next-line react/prop-types
  const [field, meta] = useField(props.field);

  return (
    <FormikWrap>
      <Input {...field} {...props} autocomplete="off" />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </FormikWrap>
  );
}

export const FormikWrap = styled.div`
  width: 100%;
  .error {
    margin: 0;
    font-family: "Poppins";
    color: red;
    font-size: 13px;
    font-weight: 500;
    text-align: start;
    padding: 5px 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 52px;
  background: rgb(245, 246, 247);
  border-radius: 500px;
  border-style: none;
  padding-left: 16px;
  margin: 0 !important;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: rgb(0, 0, 0);

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  [type="number"] {
    -moz-appearance: textfield;
  }

  ::placeholder {
    font-family: "Poppins" !important;
  }

  :focus {
    outline: none !important;
  }
`;
