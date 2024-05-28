import { Modal } from "antd";
import styled from "styled-components";
import "../../Style/global.css";
import { MdDelete } from "react-icons/md";
import IntlMassage from "../../Utils/IntlMassage";

const DeleteModal = ({ handleCancel, showModal, deleteModal }) => {
  return (
    <>
      <Modal
        maskStyle={{
          backgroundColor: " rgb(0 0 0 / 60%)",
        }}
        width={320}
        centered
        open={deleteModal}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={false}
        closable={true}
      >
        <ServiceModalWrapper>
          <div className="serviceModalUpperDiv">
            <div className="deleteMain">
              <div className="deleteDiv">
                <MdDelete className="deleteIcon" />
              </div>
            </div>
            <h1 className="upperDivHead1">
              <IntlMassage id="delete.areyousure" />
            </h1>
            <button>
              <IntlMassage id="button.delete" />
            </button>
          </div>
        </ServiceModalWrapper>
      </Modal>
    </>
  );
};
export default DeleteModal;

const ServiceModalWrapper = styled.div`
  .serviceModalUpperDiv {
    text-align: center;
    .deleteMain {
      display: flex;
      justify-content: center;
      .deleteDiv {
        background: rgb(255, 255, 255);
        box-shadow: rgba(0, 0, 0, 0.18) 0px 14px 28px;
        border-radius: 50%;
        padding: 15px 15px 11px 15px;
        width: max-content;

        .deleteIcon {
          font-size: 30px;
          color: ${({ theme }) => theme?.iconFillColor};
        }
      }
    }

    button {
      background: rgb(0, 0, 0);
      box-shadow: rgba(61, 107, 192, 0.25) 0px 2px 16px;
      border-radius: 10px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 17px;
      color: rgb(255, 255, 255);
      padding: 10px 20px;
      margin: 5px 10px;
      cursor: pointer;
      border: none;
    }
    .upperDivHead1 {
      font-weight: 600;
      font-size: 28px;
      line-height: 29px;
      color: #242424;
      margin: 0px;
      line-height: 2;
    }
    .upperDivPara1 {
      font-size: 16px;
      color: #7b7f91;
      margin: 0px;
    }
  }
`;
