import { Modal } from "antd";
import styled from "styled-components";
import { toast } from "react-toastify";

const DeleteModal = ({ handleCancel, deleteModal, id, handleDelete }) => {
  console.log(id, "recorddd delete")
  const handleDeletes = async () => {
    let res =await handleDelete({ id: id})
    if (res?.status === 200) {
      toast.success("Delete Successfully");
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
        open={deleteModal}
        // onOk={handleCancel}
        onCancel={handleCancel}
        footer={false}
        closable=""

      >
        <ServiceModalWrapper  >
          <div className="serviceModalUpperDiv">
            <div className="deleteMain">

              <h4 className="upperDivHead1">
                Are you sure you want to delete?
              </h4>
            </div>
            <div className="buttons">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleDeletes} className="delete-button">Delete</button>
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
    height:142px;
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
    .delete-button{
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
    background: var(--Alerts-Error-Base, #E03137);

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