import { Button, Modal } from "antd";
import styled from "styled-components";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useState } from "react";

const DeleteModal = ({ handleCancel, deleteModal, id, handleDelete }) => {
  const [loader,setLoader]=useState(false);
  console.log(id, "recorddd delete");
  const handleDeletes = async () => {
    setLoader(true)
    let res = await handleDelete({ id: id });
    setLoader(false)
    if (res?.status === 200) {  
      toast.success("Delete Successfully");
      handleCancel();
    } else {
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
        maskStyle={{
          backgroundColor: " rgb(0 0 0 / 60%)",
        }}
        centered
        open={deleteModal}
        // onOk={handleCancel}
        onCancel={handleCancel}
        footer={false}
        closable=""
      >
        <ServiceModalWrapper>
          <div className="serviceModalUpperDiv">
            <div className="deleteMain">
              <h4 className="upperDivHead1">
                Are you sure you want to delete?
              </h4>
            </div>

            <div className="buttons">
              <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
              <DeleteBtn onClick={handleDeletes} disabled={loader}>Delete {loader?<Loader/>:""} </DeleteBtn>
            </div>
          </div>
        </ServiceModalWrapper>
      </Modal>
    </>
  );
};
export default DeleteModal;

const ServiceModalWrapper = styled.div`
  font-family: ${({ theme }) => theme?.fontFamily};
  .serviceModalUpperDiv {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 32px;
    .deleteMain {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .upperDivHead1 {
        font-size: 24px;
        font-weight: 600;
      }
    }
    .buttons {
      display: flex;
      justify-content: center;
    }
    .upperDivHead1 {
      font-weight: 500;
      font-size: 28px;
      line-height: 29px;
      color: #242424;
      margin: 0px;
      color: black;
    }
    .upperDivPara1 {
      font-size: 16px;
      color: #7b7f91;
      margin: 0px;
    }
  }
  @media only screen and (max-width: 426px) {
    .serviceModalUpperDiv {
      height: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 32px;
      .deleteMain {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .upperDivHead1 {
          font-size: 18px;
          font-weight: 600;
        }
      }
      .buttons {
        display: flex;
        justify-content: center;
      }
      .upperDivHead1 {
        font-weight: 500;
        font-size: 18px;
        line-height: 29px;
        color: #242424;
        margin: 0px;
        color: black;
      }
      .upperDivPara1 {
        font-size: 16px;
        color: #7b7f91;
        margin: 0px;
      }
    }
  }
`;

const CancelBtn = styled(Button)`
  width: 208px;
  color: #242424;
  display: flex;
  border-radius: 10px;
  font-style: normal;
  font-weight:600;
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
    border: 1px solid black !important;
  }
`;
const DeleteBtn = styled(Button)`
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
  background: var(--Alerts-Error-Base, #e03137);

  // Remove hover effect
  &:hover {
    background: var(--Alerts-Error-Base, #e03137) !important;
    color: white !important;
  }

  // Remove active effect
  &:active {
    background: var(--Alerts-Error-Base, #e03137) !important;
    color: white !important;
  }

  // Remove focus effect
  &:focus {
    background: var(--Alerts-Error-Base, #e03137) !important;
    color: white !important;
  }
`;
