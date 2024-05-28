import React, { useState } from "react";
import {
  LoginForm,
  LogoWrap,
  Logo,
  Logintext,
  OtpWrap,
  BtnWrap,
} from "./Style";
import { Button } from "@mui/material";
import { Vector } from "../Utils/Images";
// import OTPInput from "react-otp-input";
import OtpInput from "react-otp-input";
import { Background, FormWrap } from "../Layout/Style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  return (
    <Background>
      <FormWrap>
        <LoginForm>
          <LogoWrap>
            <Logo src={Vector} alt="contolio" />
          </LogoWrap>
          <Logintext>
            Two-Step Verifiction
            <br />
            <span>Kindly check your registered number for OTP</span>
          </Logintext>
          <OtpWrap>
            <OtpInput
              inputStyle="otp"
              containerStyle={"otp-wrap"}
              value={otp}
              onChange={setOtp}
              isInputNum={true}
              shouldAutoFocus={true}
              numInputs={6}
              errorStyle={"otp-error"}
              hasErrored={error}
              renderInput={(props) => <input {...props} />}
            />
          </OtpWrap>
          <BtnWrap>
            <Button
              type="submit"
              disabled={otp.length !== 6 ? true : false}
              sx={
                otp.length !== 6
                  ? {
                      fontSize: "18px",
                      background: "rgb(44 42 42 / 26%);",
                      borderRadius: "10px",
                      color: "#000",
                      fontFamily: "Poppins",
                    }
                  : {
                      fontSize: "18px",
                      background:
                        "linear-gradient(225deg, #ee722a 0%, #d51757 100%)",
                      borderRadius: "10px",
                      color: "#fff",
                      fontFamily: "Poppins",
                    }
              }
            >
              {!loader ? (
                "Verify"
              ) : (
                <i
                  style={{ padding: "7px 22px" }}
                  class="fa fa-spinner fa-spin"
                ></i>
              )}
            </Button>
          </BtnWrap>
        </LoginForm>
      </FormWrap>
    </Background>
  );
}
