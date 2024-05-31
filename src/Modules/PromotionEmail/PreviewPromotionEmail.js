import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { Applogo } from '../../Utils/Images';
import { Link } from 'react-router-dom';
import { ImFacebook } from "react-icons/im";
import { GrTwitter } from "react-icons/gr";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

const PreviewPromotionEmail = ({ triggerModal, setTriggerModal, previewData }) => {

    const handleCancel = () => {
        setTriggerModal(false);
    };
    console.log(previewData, "preview")
    return (
        <Modal
            visible={triggerModal}
            onCancel={handleCancel}
            footer={null}
            modalRender={(modal) => <StyledModalContent>{modal}</StyledModalContent>}
        >
            <Wrapper>
                <HeaderLogo>
                    <Logo src={Applogo} alt="" />
                </HeaderLogo>

                <DeatilWrapper>

                    <EmailDetails>
                        <PTag>{previewData?.offerText}</PTag>
                        <PTag><SpanText>Dear Mike</SpanText>(username),</PTag>
                        <SpanText>Quick Dollar invites you to share your opinions in an important <br /> new survey.</SpanText>
                        <PTag>{previewData?.offerDescription}</PTag>
                        <PTag>{previewData?.additionalText}</PTag>
                    </EmailDetails>

                    <div>
                        <SurveyBtn>
                            <button>Start Survey</button>
                        </SurveyBtn>

                        <SurveyDetail>
                            <PTag>Quickdollarapp <br />
                                5429 Lyndon B Johnson FWY, Suite 332, Dallas , TX 75240</PTag>
                            <RedirectLink to="/">Unsubscribe</RedirectLink>
                            <LogoWrapper>
                                <LogoConatiner>
                                    <ImFacebook style={{ width: "25px", height: "25px" }} />
                                </LogoConatiner>
                                <LogoConatiner>
                                    <GrTwitter style={{ width: "25px", height: "25px" }} />
                                </LogoConatiner>
                                <LogoConatiner>
                                    <FaInstagram style={{ width: "25px", height: "25px" }} />
                                </LogoConatiner>
                                <LogoConatiner>
                                    <FaPinterest style={{ width: "25px", height: "25px" }} />
                                </LogoConatiner>
                            </LogoWrapper>
                        </SurveyDetail>

                    </div>
                    <CopyRights>Copyright © 2015-2024 Quickdollarapp, All rights reserved. <br />
                        You are receiving this email because you are a registered member of <br />
                        Quickdollarapp Community.
                    </CopyRights>
                </DeatilWrapper>

            </Wrapper>

        </Modal>

    );
};

export default PreviewPromotionEmail;


const StyledModalContent = styled.div`
  .ant-modal-content {
    background-color: #F0F9FB !important;
    width: 700px !important;
    height: 100% !important;
    padding: 40px 70px !important;
  }
`;

const HeaderLogo = styled.div`
//   width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
`;

const EmailDetails = styled.div`
background-color: white;
// width: 100%;
font-size: 14px;
font-weight: 400;
color: #000;
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 20px;
padding: 30px 60px;

`

const SurveyBtn = styled.div`
background-color: #DAC418;
// width: 100%;
height: 50px;
display: flex;
justify-content: center;
align-items: center;
padding: 0px 60px;
 button{
    width: 35%;
    height: 100%;
    border: none;
    background-color: #D61360;
    color: white;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    :hover{
        background-color: #b8215c;
    }
}
`
const SurveyDetail = styled.div`
background-color: #84D8EA;
// width: 100%;
height: 100%;
text-align: center;
padding: 30px 60px;
color: white;
font-size: 14px;
font-weight: 600;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
`

const RedirectLink = styled(Link)`
color: #1A86B0;
text-decoration: underline;
font-size: 17px;
margin-bottom: 10px;
:hover{
    color: #1A86B0;
    text-decoration: underline;
}
`

const CopyRights = styled.p`
width: 100%;
text-align: center;
font-size: 12px;
`

const PTag = styled.p`
margin: 0px;
width:100%
`

const DeatilWrapper = styled.div`
width: 100%;
height: 100%;
`

const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
`

const SpanText = styled.span`
font-weight: 600;
`

const LogoConatiner = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 20px;
background-color: #1A869B;
width: 45px;
height: 45px;
border-radius: 50%;
`

const LogoWrapper = styled.div`
//   width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;