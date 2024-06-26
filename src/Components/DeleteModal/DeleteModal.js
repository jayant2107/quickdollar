import { Modal } from "antd";
import styled from "styled-components";

const DeleteModal = ({ handleCancel,  deleteModal }) => {


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
              <button  onClick={handleCancel}>Cancel</button>
              <button onClick={handleCancel} className="delete-button">Delete</button>
            </div>
          </div>
        </ServiceModalWrapper>
      </Modal>
    </>
  );
};
export default DeleteModal;





const ServiceModalWrapper = styled.div`

  .serviceModalUpperDiv {
    height:142px;
    text-align: center;
    display: flex;
    flex-direction: column;
    // justify-content: space-evenly;
    gap:32px;
    // min-height:206px;
    .deleteMain {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .upperDivHead1{
        font-size:24px;
        font-weight:700;
      }
      
        
    }
    .buttons {
      display: flex;
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