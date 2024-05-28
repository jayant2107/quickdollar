import styled from "styled-components";

export const LoginForm = styled.form`
  width: 364px;
  max-width: 100%;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.25);
  background: #ffffff;
  border-radius: 16px;
  padding: 40px 50px;
  @media screen and (max-width: 575px) {
    padding: 40px 15px;
  }
  @media (max-width: 425px) {
    width: 344px;
  }
  @media (max-width: 403px) {
    width: 320px;
  }
  @media (max-width: 373px) {
    width: 300px;
  }
  @media (max-width: 352px) {
    width: 280px;
  }
  .formik-wrap {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .formik-wrap p {
    margin: 0;
    color: #f44336;
    font-size: 10px;
    font-weight: 500;
    transform: translateY(-10px);
  }
  .generate-password-text {
    font-size: 18px;
    line-height: 24px;
  }
  .otp {
    background: #ffffff;
    ${"" /* box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28); */}
    -webkit-box-shadow:0px 0px 5px rgba(0, 0, 0, .25),
                   inset 2px 2px 3px rgba(0, 0, 0, .2);
    -webkit-appearance: none;
    border-radius: 10px;
    // width: 3rem;
    height: 48px;
    margin: 0 7px;
    padding: 0px 0px;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;

    @media (max-width: 425px) {
      width: 40px !important;
      height: 40px !important;
    }
    @media (max-width: 373px) {
      width: 36px !important;
      height: 36px !important;
    }
    @media (max-width: 352px) {
      width: 35px !important;
      height: 35px !important;
      margin: 0 6px;
    }
  }
  .otp-error {
    border: 1px solid red;
  }
`;
export const LoginFormDiv = styled.div`
  width: 364px;
  max-width: 100%;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.25);
  background: #ffffff;
  border-radius: 16px;
  padding: 40px 50px;
  @media screen and (max-width: 575px) {
    padding: 40px 15px;
  }
  @media (max-width: 425px) {
    width: 344px;
  }
  @media (max-width: 395px) {
    width: 324px;
  }
  @media (max-width: 374px) {
    width: 294px;
  }
  @media (max-width: 342px) {
    width: 264px;
  }
  .formik-wrap {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .formik-wrap p {
    margin: 0;
    color: #f44336;
    font-size: 10px;
    font-weight: 500;
    transform: translateY(-10px);
  }
  .generate-password-text {
    font-size: 18px;
    line-height: 24px;
  }
  .otp {
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
    border-radius: 10px;
    // width: 3rem;
    height: 48px;
    margin: 0 7px;
    padding: 0px 0px;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;

    line-height: 20px;
  }
  .otp-error {
    border: 1px solid red;
  }
`;
export const LogoWrap = styled.div`
  width: 100%;
  text-align: center;
`;
export const Logo = styled.img`
  height: 100px;
`;
export const Logintext = styled.p`
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  margin: 0px;
  padding-top: 0px;
  padding-bottom: 10px;
  font-family: ${({ theme }) => theme?.fontFamily};
  span {
    width: 90%;
    font-weight: normal;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    font-family: ${({ theme }) => theme?.fontFamily};
    color: rgba(0, 0, 0, 0.4);
  }
`;
export const InputField = styled.input`
  background: ${({ theme }) => theme?.inputBg};
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  border: none;
  padding: 14px 44px;
  height: 48px;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  width: 76%;
  height: 35px;
  color: ${({ theme }) => theme?.inputColor};
  font-family: ${({ theme }) => theme?.fontFamily};
  &:placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;
export const FieldWrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;

  .loginField {
    background: ${({ theme }) => theme?.inputBg};
    box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
    font-family: ${({ theme }) => theme?.fontFamily};
    border-radius: 10px;
    border: none;
    padding: 14px 44px;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    width: 76%;
    height: 25px;
    color: ${({ theme }) => theme?.inputColor};
    &:placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
    @media (max-width: 425px) {
      width: 74%;
    }
    @media (max-width: 395px) {
      width: 73%;
      padding: 12px 40px;
    }
    @media (max-width: 374px) {
      width: 70%;
      padding: 12px 40px;
    }
    @media (max-width: 342px) {
      width: 66%;
      padding: 12px 40px;
    }
  }
`;
export const Icon = styled.svg`
  height: 18px;
  width: 18px;
  path {
    fill: ${({ theme }) => theme?.iconFillColor};
  }
`;
export const IconWrap = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ Direction }) => Direction === "ltr" && "0px"};
  right: ${({ Direction }) => Direction === "rtl" && "0px"};
  transform: translateY(-50%);
  height: 100%;
  width: 44px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ForgetWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  a {
    float: ${({ Direction }) => (Direction === "ltr" ? "right" : "left")};
    font-weight: 400;
    font-size: 12px;
    font-family: ${({ theme }) => theme?.fontFamily};
    line-height: 15px;
    color: rgba(0, 0, 0, 0.5);

    text-decoration: none;
  }
`;

// otp page starts here
export const OtpWrap = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-diretion: column;
  justify-content: space-around;
  align-items: center;
  input {
    width: 48px !important;
  }
`;
export const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  @media (max-width: 425px) {
    margin-top: 30px;
  }

  .submit-btn {
    font-size: 18px;
    background: ${({ theme }) => theme?.secondaryColor};
    font-family: ${({ theme }) => theme?.fontFamily};
    border-radius: 8px;
    color: ${({ theme }) => theme?.primaryColor};
    padding: 5px 15px;
    border: none;
    cursor: pointer;
  }
`;
