import { Modal } from "antd";
import styled from "styled-components";
import { userActiveModal } from "../../Services/Collection";
import { toast } from "react-toastify";

const ActiveModal = ({ handleCancel, record, fetchData, activeModal }) => {
  // console.log(record)

  const confirmMessage = record?.isActive === true
    ? "Are you sure you want to deactivate?"
    : "Are you sure you want to  activate?";

  const activeModals = async () => {
    const payload = {
      idUser: record.idUser,
      isActive: !record.isActive

    }
    console.log(payload)
    let res = await userActiveModal(payload);
    console.log(res)
    if (res?.status === 200) {
      console.log(res.status)
      await fetchData()
      
      toast.success(payload?.isActive === true?"Active Successfully":"Deactive Successfully");
      handleCancel();
    }
    else {
      let message =
        res?.response?.data?.message ||
        res?.message ||
        res?.error ||
        "Something went wrong";
      toast.error(message);
    }

  }
  return (
    <>
      <Modal
        maskStyle={{
          backgroundColor: " rgb(0 0 0 / 60%)",
        }}
        centered
        open={activeModal}
        onCancel={handleCancel}
        footer={false}
        closable=""
      >
        <ActiveModalWrapper>
          <div className="activeModalUpperDiv">
            <div className="deleteMain">
              <h4 className="upperDivHead1">
                {confirmMessage}
              </h4>
            </div>
            <div className="buttons">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={activeModals} className="confirm-button">
                Confirm
              </button>
            </div>
          </div>
        </ActiveModalWrapper>
      </Modal>
    </>
  );
};
export default ActiveModal;





const ActiveModalWrapper = styled.div`
font-family: ${({ theme }) => theme?.fontFamily};
  .activeModalUpperDiv {
    min-height:142px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap:32px;
    .deleteMain {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .upperDivHead1{
        font-size:24px;
        font-weight:600;
      }
      
        
    }
    .buttons {
      display: flex;
      justify-content:center;
    }
    button {
      width: 208px;
      color: black;
      height:48px !important;
      display:flex;
      align-items:center !important;
      justify-content:center !important;
      border: 1px solid var(--Greyscale/1000);
      border-radius: 10px;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 17px;
      // padding:  21px 24px;
      margin: 5px 10px;
      cursor: pointer;
      background:transparent;
    }
    .confirm-button{
      width: 208px;
      color: white;
      // box-shadow: rgba(61, 107, 192, 0.25) 0px 2px 16px;
      border-radius: 10px;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 17px;
      display:flex;
      align-items:center !important;
      justify-content:center !important;
      margin: 5px 10px;
      cursor: pointer;
      border: none;
    background: #007bff;

    }
    .upperDivHead1 {
      font-weight: 600;
      font-size: 28px;
      line-height: 29px;
      color: #242424;
      margin: 0px;
      line-height: 2;
      color:black;

    }
    .upperDivPara1 {
      font-size: 16px;
      color: #7b7f91;
      margin: 0px;
    }
  }
`;